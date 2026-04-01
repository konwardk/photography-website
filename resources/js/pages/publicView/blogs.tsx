import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function Blogs({ blogs }: { blogs: any }) {
    return (
        <PortfolioLayout>
            <Head title="Journal & Blog" />

            <div className="pt-16 px-5 md:px-12 w-full max-w-[100rem] mx-auto min-h-screen">
                <div className="flex flex-col items-center justify-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Journal
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl font-light">
                        Stories, articles, and behind-the-scenes thoughts on my photography journey.
                    </p>
                </div>

                {blogs.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-white/10 rounded-3xl bg-white/5">
                        <p className="text-neutral-400 text-lg">No entries published yet. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {blogs.data.map((blog: any) => (
                            <Link href={`/blog/${blog.id}`} key={blog.id} className="group flex flex-col gap-5 block hover:-translate-y-2 transition-transform duration-500 ease-in-out cursor-pointer">
                                <div className="w-full rounded-2xl overflow-hidden relative flex justify-center">
                                    {blog.images && blog.images.length > 0 ? (
                                        <img
                                            src={`/storage/${blog.images[0]}`}
                                            alt={blog.blog_title}
                                            className="w-full h-auto max-h-[600px] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 block"
                                        />
                                    ) : (
                                        <div className="w-full aspect-[4/3] flex items-center justify-center bg-neutral-800 rounded-2xl">
                                            <span className="text-neutral-600 font-medium tracking-widest uppercase text-xs">No Image Provided</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2 px-1">
                                    <h2 className="text-2xl font-bold text-white group-hover:text-neutral-300 transition-colors">
                                        {blog.blog_title}
                                    </h2>
                                    <p className="text-neutral-400 font-light leading-relaxed line-clamp-3">
                                        {blog.blog_content}
                                    </p>
                                    <span className="inline-block mt-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 group-hover:text-white transition-colors">Read Article &rarr;</span>
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
