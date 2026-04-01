import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';

export default function BookReviewsIndex({ reviews }: { reviews: any }) {

    const deleteReview = (id: number) => {
        if (confirm('Are you definitely sure you want to permanently delete this review?')) {
            router.delete(`/admin/book-reviews/${id}`);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-8xl mx-auto w-full">
            <Head title="Manage Reviews" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Manage Book Reviews
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Track press cuttings, articles, and reviews for your books.
                    </p>
                </div>
                <Link href="/admin/book-reviews/create">
                    <Button className="bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm transition-colors">
                        + Add Review
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden min-h-[50vh] flex flex-col justify-between">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-neutral-50 border-b border-neutral-200 text-neutral-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Title</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Book Name</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Magazine / Source</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-center">Attachment</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right w-32">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {!reviews || !reviews.data || reviews.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-neutral-500 font-medium">
                                    No reviews uploaded yet. Let's add your first press feature!
                                </td>
                            </tr>
                        ) : reviews.data.map((review: any) => (
                            <tr key={review.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-neutral-900">
                                    {review.title}
                                </td>
                                <td className="px-6 py-4 text-neutral-600 font-medium">
                                    {review.book?.book_name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {review.magazine_name}
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {review.date}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {review.path ? (
                                        <div className="flex justify-center flex-col gap-2 items-center">
                                            {review.path.endsWith('.pdf') ? (
                                                <a href={`/storage/${review.path}`} target="_blank" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
                                                    <Download className="w-3 h-3" /> PDF
                                                </a>
                                            ) : (
                                                <a href={`/storage/${review.path}`} target="_blank" className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors group">
                                                    <img src={`/storage/${review.path}`} alt="Review Preview" className="w-10 h-10 object-cover rounded shadow-sm group-hover:ring-2 ring-neutral-300" />
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest">None</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link
                                        href={`/admin/book-reviews/${review.id}/edit`}
                                        className="text-neutral-500 hover:text-blue-600 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="text-red-500 hover:text-red-700 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {reviews && reviews.links && reviews.links.length > 3 && (
                    <div className="p-4 border-t border-neutral-200 flex justify-center gap-1 bg-neutral-50">
                        {reviews.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 border rounded-md text-sm font-medium transition-colors ${link.active ? 'bg-neutral-900 text-white border-neutral-900 pointer-events-none' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'} ${!link.url && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

BookReviewsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Press & Reviews', href: '/admin/book-reviews' },
    ],
};
