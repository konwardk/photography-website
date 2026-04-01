import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Trash2, ImagePlus } from 'lucide-react';

export default function BlogsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        blog_title: '',
        blog_content: '',
        images: [] as File[],
    });

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        
        const filesArray = Array.from(e.target.files);
        // Map native local object URLs so we can render instant previews
        const newUrls = filesArray.map(file => URL.createObjectURL(file));

        setData('images', [...data.images, ...filesArray]);
        setPreviewUrls([...previewUrls, ...newUrls]);
    };

    const removeImage = (indexToRemove: number) => {
        const updatedImages = data.images.filter((_, idx) => idx !== indexToRemove);
        const updatedUrls = previewUrls.filter((_, idx) => idx !== indexToRemove);
        
        setData('images', updatedImages);
        setPreviewUrls(updatedUrls);
    };

    const submitBlog = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/blogs', {
            forceFormData: true, // Forces multipart encoding payload heavily required for massive binary file uploads
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <Head title="Create Blog" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Publish New Blog
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Draft a new article, story, or project case study natively bundling unlimited high-res images.
                    </p>
                </div>
                <Link href="/admin/blogs">
                    <Button variant="outline" className="border-neutral-200 text-neutral-700 shadow-sm cursor-pointer hover:bg-neutral-100">
                        &larr; Back to Blogs
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden p-6 md:p-8">
                <form onSubmit={submitBlog} className="space-y-8">
                    <div className="space-y-3">
                        <Label htmlFor="blog_title" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Blog Title
                        </Label>
                        <Input 
                            id="blog_title"
                            type="text"
                            placeholder="e.g. A Weekend in the Wild"
                            value={data.blog_title}
                            onChange={(e) => setData('blog_title', e.target.value)}
                            className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12"
                            required
                        />
                        <InputError message={errors.blog_title} />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-neutral-700 font-medium text-xs uppercase tracking-widest flex items-center justify-between">
                            <span>Featured Images (Multiple Supported)</span>
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">Optional</span>
                        </Label>
                        
                        <div className="relative border-2 border-dashed border-neutral-300 rounded-xl p-6 bg-neutral-50 hover:bg-neutral-100 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px]">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="pointer-events-none flex flex-col items-center gap-2 text-neutral-500">
                                <ImagePlus className="size-8 text-neutral-400 mb-1" />
                                <span className="font-semibold text-sm">Click or Drag images here to upload</span>
                                <span className="text-xs text-neutral-400">Support for highly sized JPG, PNG, or WEBP</span>
                            </div>
                        </div>

                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {previewUrls.map((url, idx) => (
                                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-neutral-200 shadow-sm aspect-square bg-neutral-100">
                                        <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <button 
                                                type="button" 
                                                onClick={() => removeImage(idx)}
                                                className="bg-red-500 text-white p-2 rounded-full pointer-events-auto hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <InputError message={errors.images} />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="blog_content" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Blog Content
                        </Label>
                        <textarea
                            id="blog_content"
                            rows={18}
                            placeholder="Write your story here..."
                            value={data.blog_content}
                            onChange={(e) => setData('blog_content', e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-base text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-900 outline-none custom-scrollbar resize-y leading-relaxed font-sans transition-all"
                            required
                        />
                        <p className="text-[11px] text-neutral-400 font-medium uppercase tracking-widest">
                            Basic HTML wrappers like &lt;b&gt; and &lt;i&gt; are organically supported if you need to bold or format text manually inline.
                        </p>
                        <InputError message={errors.blog_content} />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-4">
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
                            {processing ? 'Publishing...' : 'Publish Blog'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

BlogsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Blogs', href: '/admin/blogs' },
        { title: 'Create Blog', href: '/admin/blogs/create' },
    ],
};
