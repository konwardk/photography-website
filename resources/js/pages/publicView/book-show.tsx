import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Download, ExternalLink, Newspaper, Calendar } from 'lucide-react';

export default function BookShow({ book }: { book: any }) {

    return (
        <PortfolioLayout>
            <Head title={`${book.book_name} | Reviews`} />

            <article className="pt-16 pb-32 px-5 md:px-12 w-full max-w-6xl mx-auto min-h-screen">

                <div className="mb-12 mt-12 md:mt-20">
                    <Link href="/reviews" className="text-neutral-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold mb-8 inline-block">
                        &larr; Back to Books
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-20 mb-24">

                    {/* Cover Column */}
                    <div className="w-full md:w-2/5 lg:w-1/4 shrink-0">
                        {book.cover_image ? (
                            <div className="rounded-2xl overflow-hidden shadow-2xl sticky top-32 group border border-white/10">
                                <img
                                    src={`/storage/${book.cover_image}`}
                                    alt={book.book_name}
                                    className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-105"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                            </div>
                        ) : (
                            <div className="w-full aspect-[3/4] bg-neutral-900 rounded-2xl flex items-center justify-center border border-white/5 sticky top-32">
                                <span className="text-neutral-700 font-medium tracking-widest uppercase text-sm">No Cover Provided</span>
                            </div>
                        )}
                    </div>

                    {/* Meta Column */}
                    <div className="w-full md:w-3/5 lg:w-3/4 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                            {book.book_name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className="text-sm uppercase tracking-widest text-neutral-300 font-bold bg-white/10 px-4 py-1.5 rounded-full">{book.publisher_name}</span>
                            <span className="text-sm uppercase tracking-widest text-neutral-500 font-semibold">{book.published_date}</span>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">
                            {book.description || <span className="italic opacity-50">No comprehensive description provided for this specific title.</span>}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-white/10 pt-20 mt-12">
                    <div className="mb-12 flex items-center gap-4">
                        <Newspaper className="w-8 h-8 text-neutral-400" />
                        <h3 className="text-3xl font-bold text-white tracking-tight">Press & Reviews</h3>
                        <span className="bg-white/10 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full">{book.reviews?.length || 0}</span>
                    </div>

                    {!book.reviews || book.reviews.length === 0 ? (
                        <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-12 text-center text-neutral-500">
                            No press articles or reviews have been attached to this book yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {book.reviews.map((review: any) => (
                                <div key={review.id} className="bg-neutral-900/80 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between h-full group">
                                    <div>
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <span className="text-xs uppercase tracking-widest text-[#D1D1D1] font-semibold flex items-center gap-1.5">
                                                {review.magazine_name}
                                            </span>
                                            <span className="text-xs text-neutral-600 font-medium flex-shrink-0 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {review.date}
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors mb-6 leading-snug">
                                            {review.title}
                                        </h4>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 mt-auto">
                                        {review.path ? (
                                            <>
                                                {review.path.endsWith('.pdf') ? (
                                                    <a href={`/storage/${review.path}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full gap-2 text-xs font-bold text-black uppercase tracking-widest bg-white hover:bg-neutral-200 transition-colors px-4 py-3 rounded-xl shadow-lg">
                                                        <Download className="w-4 h-4" /> Download PDF Review
                                                    </a>
                                                ) : (
                                                    <a href={`/storage/${review.path}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full gap-2 text-xs font-bold text-white uppercase tracking-widest bg-neutral-800 hover:bg-neutral-700 transition-colors px-4 py-3 rounded-xl border border-white/10">
                                                        <ExternalLink className="w-4 h-4" /> View Cutout
                                                    </a>
                                                )}
                                            </>
                                        ) : (
                                            <div className="bg-neutral-800/50 text-neutral-500 text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl text-center border border-white/5">
                                                No Attachment Provided
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </article>

        </PortfolioLayout>
    );
}
