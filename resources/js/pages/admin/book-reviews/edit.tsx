import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Trash2, FileUp } from 'lucide-react';

export default function BookReviewsEdit({ review, books }: { review: any, books: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        book_id: review.book_id || '',
        title: review.title || '',
        magazine_name: review.magazine_name || '',
        date: review.date || '',
        path: null as File | null,
    });

    const existingUrl = review.path ? `/storage/${review.path}` : null;
    const isExistingPdf = review.path ? review.path.endsWith('.pdf') : false;

    const [previewUrl, setPreviewUrl] = useState<string | null>(existingUrl);
    const [isPdf, setIsPdf] = useState(isExistingPdf);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        setData('path', file);
        setPreviewUrl(URL.createObjectURL(file));
        setIsPdf(file.type === 'application/pdf');
    };

    const removeFile = () => {
        setData('path', null);
        setPreviewUrl(null);
        setIsPdf(false);
    };

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/book-reviews/${review.id}`, {
            forceFormData: true,
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <Head title="Edit Review" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Edit Book Review
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Update press cuttings, articles, or reviews for a book.
                    </p>
                </div>
                <Link href="/admin/book-reviews">
                    <Button variant="outline" className="border-neutral-200 text-neutral-700 shadow-sm cursor-pointer hover:bg-neutral-100">
                        &larr; Back to Reviews
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden p-6 md:p-8">
                <form onSubmit={submitReview} className="space-y-8">
                    
                    <div className="space-y-3">
                        <Label htmlFor="book_id" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Select Book
                        </Label>
                        <select
                            id="book_id"
                            value={data.book_id}
                            onChange={(e) => setData('book_id', e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 h-12 text-base text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                            required
                        >
                            <option value="" disabled>-- Select a book --</option>
                            {books.map(book => (
                                <option key={book.id} value={book.id}>{book.book_name}</option>
                            ))}
                        </select>
                        <InputError message={errors.book_id} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="title" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                                Review Title
                            </Label>
                            <Input 
                                id="title"
                                type="text"
                                placeholder="e.g. Masterful Wildlife Capture"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12"
                                required
                            />
                            <InputError message={errors.title} />
                        </div>
                        
                        <div className="space-y-3">
                            <Label htmlFor="magazine_name" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                                Magazine / Source
                            </Label>
                            <Input 
                                id="magazine_name"
                                type="text"
                                placeholder="e.g. National Geographic"
                                value={data.magazine_name}
                                onChange={(e) => setData('magazine_name', e.target.value)}
                                className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12"
                                required
                            />
                            <InputError message={errors.magazine_name} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="date" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">
                            Publication Date
                        </Label>
                        <Input 
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-base h-12 max-w-xs"
                            required
                        />
                        <InputError message={errors.date} />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-neutral-700 font-medium text-xs uppercase tracking-widest flex items-center justify-between">
                            <span>Attachment (PDF or Image)</span>
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">Optional</span>
                        </Label>
                        
                        {previewUrl ? (
                            <div className="relative group rounded-lg overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100 max-w-xs cursor-default flex items-center justify-center p-4">
                                {isPdf ? (
                                    <div className="flex flex-col items-center gap-2 p-8 text-neutral-600">
                                        <FileUp className="w-12 h-12 text-blue-500" />
                                        <span className="font-semibold text-sm">PDF Attached</span>
                                    </div>
                                ) : (
                                    <img src={previewUrl} alt="File Preview" className="w-full max-h-[300px] object-contain" />
                                )}
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        type="button" 
                                        onClick={removeFile}
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
                                    accept=".pdf,image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="pointer-events-none flex flex-col items-center gap-2 text-neutral-500">
                                    <FileUp className="size-8 text-neutral-400 mb-1" />
                                    <span className="font-semibold text-sm">Click or Drag file here to replace</span>
                                    <span className="text-xs text-neutral-400">Supported formats: PDF, JPG, PNG, WEBP</span>
                                </div>
                            </div>
                        )}
                        <InputError message={errors.path} />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-4">
                        <Link href="/admin/book-reviews">
                            <Button type="button" variant="outline" className="h-12 px-6 rounded-lg border-neutral-200 hover:bg-neutral-100 cursor-pointer text-neutral-700">
                                Cancel
                            </Button>
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-neutral-900 text-white hover:bg-neutral-800 h-12 px-8 rounded-lg shadow-sm font-semibold tracking-wide cursor-pointer transition-all"
                        >
                            {processing ? 'Saving...' : 'Update Review'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

BookReviewsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Press & Reviews', href: '/admin/book-reviews' },
        { title: 'Edit Review', href: '#' },
    ],
};
