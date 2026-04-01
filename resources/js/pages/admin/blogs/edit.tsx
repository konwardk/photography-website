import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Trash2, ImagePlus, Globe } from 'lucide-react';

export default function BlogsEdit({ blog }: { blog: any }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // Spoofs standard PUT command mapping perfectly natively over massive POST FormData structures. Allows file attachments seamlessly.
        blog_title: blog.blog_title || '',
        blog_content: blog.blog_content || '',
        retained_images: blog.images && Array.isArray(blog.images) ? blog.images : [] as string[],
        new_images: [] as File[],
    });

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        
        const filesArray = Array.from(e.target.files);
        const newUrls = filesArray.map(file => URL.createObjectURL(file));

        setData('new_images', [...data.new_images, ...filesArray]);
        setPreviewUrls([...previewUrls, ...newUrls]);
    };

    const removeNewImage = (indexToRemove: number) => {
        const updatedImages = data.new_images.filter((_, idx) => idx !== indexToRemove);
        const updatedUrls = previewUrls.filter((_, idx) => idx !== indexToRemove);
        
        setData('new_images', updatedImages);
        setPreviewUrls(updatedUrls);
    };

    const removeRetainedImage = (indexToRemove: number) => {
        const updatedRetained = data.retained_images.filter((_: string, idx: number) => idx !== indexToRemove);
        setData('retained_images', updatedRetained);
    };

    const submitBlog = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/blogs/${blog.id}`, {
            forceFormData: true,
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <Head title={`Edit: ${data.blog_title}`} />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Editing Article
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Select and prune existing photos natively, or drop completely fresh images below.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/blogs`}>
                        <Button variant="outline" className="text-neutral-700 shadow-sm cursor-pointer border-neutral-200">
                            &larr; Back
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden p-6 md:p-8">
                <form onSubmit={submitBlog} className="space-y-8">
                    
                    {/* Basic Meta Data Blocks */}
                    <div className="space-y-3">
                        <Label htmlFor="blog_title" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Blog Title
                        </Label>
                        <Input 
                            id="blog_title"
                            type="text"
                            value={data.blog_title}
                            onChange={(e) => setData('blog_title', e.target.value)}
                            className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12"
                            required
                        />
                        <InputError message={errors.blog_title} />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="blog_content" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Blog Content
                        </Label>
                        <textarea
                            id="blog_content"
                            rows={15}
                            value={data.blog_content}
                            onChange={(e) => setData('blog_content', e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-base text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-900 outline-none custom-scrollbar resize-y leading-relaxed font-sans transition-all"
                            required
                        />
                        <InputError message={errors.blog_content} />
                    </div>

                    <hr className="border-neutral-100" />

                    {/* Highly dynamic legacy image array manipulation module */}
                    {data.retained_images.length > 0 && (
                        <div className="space-y-4">
                            <Label className="text-neutral-700 font-medium text-xs uppercase tracking-widest flex items-center justify-between">
                                <span>Persisted Heritage Images</span>
                                <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-500 font-bold border border-neutral-200">{data.retained_images.length} Count</span>
                            </Label>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {data.retained_images.map((path: string, idx: number) => (
                                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-neutral-200 shadow-sm aspect-square bg-neutral-100">
                                        <img src={`/storage/${path}`} alt="persisted" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                                            <button 
                                                type="button" 
                                                onClick={() => removeRetainedImage(idx)}
                                                className="bg-red-500 text-white p-2.5 rounded-full pointer-events-auto hover:bg-red-600 transition-colors shadow-2xl shrink-0"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                            <span className="text-[10px] uppercase font-bold text-red-300 mt-2 tracking-widest drop-shadow-lg">Trash</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Standard fresh Dropzone Upload mapping logic */}
                    <div className="space-y-4">
                        <Label className="text-neutral-700 font-medium text-xs uppercase tracking-widest flex items-center justify-between">
                            <span>Append New Fresh Images</span>
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">Optional</span>
                        </Label>
                        
                        <div className="relative border-2 border-dashed border-neutral-300 rounded-xl p-6 bg-neutral-50 hover:bg-neutral-100 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px]">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleNewImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="pointer-events-none flex flex-col items-center gap-2 text-neutral-500">
                                <ImagePlus className="size-8 text-neutral-400 mb-1" />
                                <span className="font-semibold text-sm">Drag fresh shots here to append them naturally</span>
                                <span className="text-xs text-neutral-400">JPG, PNG, or WEBP supported format mappings.</span>
                            </div>
                        </div>

                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 p-4 border border-dashed border-green-200 bg-green-50/50 rounded-xl">
                                {previewUrls.map((url, idx) => (
                                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-neutral-200 shadow-sm aspect-square bg-neutral-100">
                                        <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 left-2 bg-green-500 text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">New</div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <button 
                                                type="button" 
                                                onClick={() => removeNewImage(idx)}
                                                className="bg-red-500 text-white p-2 rounded-full pointer-events-auto hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <InputError message={errors.new_images} />
                    </div>

                    <div className="pt-6 flex justify-end gap-4">
                        <Link href="/admin/blogs">
                            <Button type="button" variant="outline" className="h-12 px-6 rounded-lg border-neutral-200 hover:bg-neutral-100 cursor-pointer text-neutral-700">
                                Cancel
                            </Button>
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-neutral-900 text-white hover:bg-neutral-800 h-12 px-8 rounded-lg shadow-sm font-semibold tracking-wide cursor-pointer transition-all"
                        >
                            {processing ? 'Saving...' : 'Secure Appended Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

BlogsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Blogs', href: '/admin/blogs' },
        { title: 'Edit Blog Database', href: '#' },
    ],
};
