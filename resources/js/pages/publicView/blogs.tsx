import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function Blogs({ blogs }: { blogs: any }) {
    return (
        <PortfolioLayout>
            <Head title="Journal & Blog" />

            <div className="mx-auto min-h-screen w-full max-w-[100rem] px-5 pt-16 md:px-12">
                <div className="mb-20 flex flex-col items-center justify-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Blogs
                    </h1>
                    <p className="max-w-2xl text-lg font-light text-neutral-400">
                        Stories, articles, and behind-the-scenes thoughts on my
                        photography journey.
                    </p>
                </div>

                {blogs.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-32 text-center">
                        <p className="text-lg text-neutral-400">
                            No entries published yet. Check back soon.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
                        {blogs.data.map((blog: any) => (
                            <Link
                                href={`/blog/${blog.id}`}
                                key={blog.id}
                                className="group block overflow-hidden bg-neutral-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Image Wrapper (Fixed Size) */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    {blog.images && blog.images.length > 0 ? (
                                        <img
                                            src={`/storage/${blog.images[0]}`}
                                            alt={blog.blog_title}
                                            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                            draggable={false}
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                                            <span className="text-xs font-medium tracking-widest text-neutral-600 uppercase">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-between space-y-3 p-4">
                                    {/* Title */}
                                    <h2 className="line-clamp-2 text-lg leading-snug font-semibold text-white transition-colors duration-300 group-hover:text-neutral-300 md:text-xl">
                                        {blog.blog_title}
                                    </h2>

                                    {/* Date */}
                                    <span className="text-xs text-neutral-500">
                                        {new Date(
                                            blog.created_at,
                                        ).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </span>

                                    {/* Content */}
                                    <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400">
                                        {blog.blog_content}
                                    </p>

                                    {/* Read More */}
                                    <span className="mt-2 inline-block text-xs font-semibold tracking-wide text-neutral-500 uppercase transition-colors duration-300 group-hover:text-white">
                                        Read Article →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Minimalist Pagination logic isolated natively */}
                {blogs.links && blogs.links.length > 3 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {blogs.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`rounded-full border px-4 py-2 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${link.active ? 'pointer-events-none border-white bg-white text-black' : 'border-white/10 bg-transparent text-neutral-400 hover:border-white/40 hover:text-white'} ${!link.url && 'pointer-events-none cursor-not-allowed opacity-30'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ))}
                    </div>
                )}
            </div>
        </PortfolioLayout>
    );
}
