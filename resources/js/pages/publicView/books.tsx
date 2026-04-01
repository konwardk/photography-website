import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function Books({ books }: { books: any }) {
    return (
        <PortfolioLayout>
            <Head title="Book Reviews" />

            <div className="pt-16 pb-16 px-5 md:px-12 w-full max-w-[100rem] mx-auto min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Book Reviews
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl font-light">
                        My curated collection of photography book reviews and recommendations.
                    </p>
                </div>

                {books.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center border border-white/10 rounded-3xl bg-white/5">
                        <p className="text-neutral-400 text-lg">No book reviews published yet. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {books.data.map((book: any) => (
                            <Link href={`/reviews/${book.id}`} key={book.id} className="group flex flex-col gap-5 h-full hover:-translate-y-2 transition-transform duration-500 ease-in-out cursor-pointer">
                                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative flex items-center justify-center bg-white/5 p-6 border border-white/5">
                                    {book.cover_image ? (
                                        <img
                                            src={`/storage/${book.cover_image}`}
                                            alt={book.book_name}
                                            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-neutral-600 font-medium tracking-widest uppercase text-xs">No Cover</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2 px-1">
                                    <h2 className="text-2xl font-bold text-white group-hover:text-neutral-300 transition-colors">
                                        {book.book_name}
                                    </h2>
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                        <span className="text-xs uppercase tracking-widest text-[#D1D1D1] font-semibold">{book.publisher_name}</span>
                                        <span className="text-neutral-600 text-xs">•</span>
                                        <span className="text-xs uppercase tracking-widest text-neutral-500">{book.published_date}</span>
                                    </div>
                                    <p className="text-neutral-400 font-light leading-relaxed line-clamp-4">
                                        {book.description || "An intuitive and deep dive studying photography techniques and uncovering spectacular imagery mirroring the history of lens craft."}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {books.links && books.links.length > 3 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {books.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${link.active ? 'bg-white text-black border-white pointer-events-none' : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white'} ${!link.url && 'opacity-30 cursor-not-allowed pointer-events-none'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ))}
                    </div>
                )}
            </div>
        </PortfolioLayout>
    );
}
