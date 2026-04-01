import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function BooksIndex({ books }: { books: any }) {

    const deleteBook = (id: number) => {
        if (confirm('Are you definitely sure you want to permanently delete this book?')) {
            router.delete(`/admin/books/${id}`);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-8xl mx-auto w-full">
            <Head title="Manage Books" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Manage Books
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Add and track your featured photography books.
                    </p>
                </div>
                <Link href="/admin/books/create">
                    <Button className="bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm transition-colors">
                        + Add Book
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden min-h-[50vh] flex flex-col justify-between">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-neutral-50 border-b border-neutral-200 text-neutral-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider w-16">ID</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Book Name</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Publisher</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Published Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right w-32">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {!books || !books.data || books.data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-neutral-500 font-medium">
                                    No books found. Let's add your first book!
                                </td>
                            </tr>
                        ) : books.data.map((book: any) => (
                            <tr key={book.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-neutral-500">
                                    #{book.id}
                                </td>
                                <td className="px-6 py-4 font-bold text-neutral-900 text-base">
                                    <div className="flex items-center gap-3">
                                        {book.cover_image && (
                                            <img src={`/storage/${book.cover_image}`} alt={book.book_name} className="w-10 h-10 object-cover rounded shadow-sm shrink-0" />
                                        )}
                                        {book.book_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {book.publisher_name}
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {book.published_date}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link
                                        href={`/admin/books/${book.id}/edit`}
                                        className="text-neutral-500 hover:text-blue-600 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteBook(book.id)}
                                        className="text-red-500 hover:text-red-700 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {books && books.links && books.links.length > 3 && (
                    <div className="p-4 border-t border-neutral-200 flex justify-center gap-1 bg-neutral-50">
                        {books.links.map((link: any, idx: number) => (
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

BooksIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Books', href: '/admin/books' },
    ],
};
