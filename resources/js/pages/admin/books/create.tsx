import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Trash2, ImagePlus } from 'lucide-react';

export default function BooksCreate() {
    const { data, setData, post, processing, errors } = useForm({
        book_name: '',
        published_date: '',
        publisher_name: '',
        description: '',
        cover_image: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        setData('cover_image', file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setData('cover_image', null);
        setPreviewUrl(null);
    };

    const submitBook = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/books', {
            forceFormData: true,
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <Head title="Add Book" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Add New Book
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Add a photography book to your collection.
                    </p>
                </div>
                <Link href="/admin/books">
                    <Button variant="outline" className="border-neutral-200 text-neutral-700 shadow-sm cursor-pointer hover:bg-neutral-100">
                        &larr; Back to Books
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden p-6 md:p-8">
                <form onSubmit={submitBook} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="book_name" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                                Book Name
                            </Label>
                            <Input 
                                id="book_name"
                                type="text"
                                placeholder="e.g. Wildlife Photography Masterclass"
                                value={data.book_name}
                                onChange={(e) => setData('book_name', e.target.value)}
                                className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12"
                                required
                            />
                            <InputError message={errors.book_name} />
                        </div>
                        
                        <div className="space-y-3">
                            <Label htmlFor="publisher_name" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                                Publisher Name
                            </Label>
                            <Input 
                                id="publisher_name"
                                type="text"
                                placeholder="e.g. Penguin Random House"
                                value={data.publisher_name}
                                onChange={(e) => setData('publisher_name', e.target.value)}
                                className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12"
                                required
                            />
                            <InputError message={errors.publisher_name} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="published_date" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Published Date
                        </Label>
                        <Input 
                            id="published_date"
                            type="date"
                            value={data.published_date}
                            onChange={(e) => setData('published_date', e.target.value)}
                            className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12 max-w-xs"
                            required
                        />
                        <InputError message={errors.published_date} />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-neutral-700 font-medium text-xs uppercase tracking-widest flex items-center justify-between">
                            <span>Cover Image</span>
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">Optional</span>
                        </Label>
                        
                        {previewUrl ? (
                            <div className="relative group rounded-lg overflow-hidden border border-neutral-200 shadow-sm aspect-[3/4] bg-neutral-100 max-w-xs cursor-default">
                                <img src={previewUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        type="button" 
                                        onClick={removeImage}
                                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
                                    >
                                        <Trash2 className="size-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative border-2 border-dashed border-neutral-300 rounded-xl p-6 bg-neutral-50 hover:bg-neutral-100 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] max-w-sm">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="pointer-events-none flex flex-col items-center gap-2 text-neutral-500">
                                    <ImagePlus className="size-8 text-neutral-400 mb-1" />
                                    <span className="font-semibold text-sm">Click or Drag cover image here</span>
                                    <span className="text-xs text-neutral-400">Supported formats: JPG, PNG, WEBP</span>
                                </div>
                            </div>
                        )}
                        <InputError message={errors.cover_image} />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-neutral-700 font-medium text-xs uppercase tracking-widest flex justify-between">
                            <span>Book Description</span>
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">Optional</span>
                        </Label>
                        <textarea
                            id="description"
                            rows={6}
                            placeholder="Write a brief overview of the book..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-base text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-900 outline-none custom-scrollbar resize-y leading-relaxed font-sans transition-all"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-4">
                        <Link href="/admin/books">
                            <Button type="button" variant="outline" className="h-12 px-6 rounded-lg border-neutral-200 hover:bg-neutral-100 cursor-pointer text-neutral-700">
                                Cancel
                            </Button>
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-neutral-900 text-white hover:bg-neutral-800 h-12 px-8 rounded-lg shadow-sm font-semibold tracking-wide cursor-pointer transition-all"
                        >
                            {processing ? 'Saving...' : 'Add Book'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

BooksCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Books', href: '/admin/books' },
        { title: 'Add Book', href: '/admin/books/create' },
    ],
};
