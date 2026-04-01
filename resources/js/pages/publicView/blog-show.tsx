import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function BlogShow({ blog }: { blog: any }) {

    // Automatically unpack the database payload to strictly isolate the primary hero shot from any subsequent structural images
    const heroImage = blog.images && blog.images.length > 0 ? blog.images[0] : null;
    const galleryImages = blog.images && blog.images.length > 1 ? blog.images.slice(1) : [];

    return (
        <PortfolioLayout>
            <Head title={`${blog.blog_title} | Journal`} />

            <article className="pt-24 pb-32 px-5 md:px-12 w-full max-w-5xl mx-auto min-h-screen">

                <div className="mb-12 mt-12 md:mt-20">
                    <Link href="/blog" className="text-neutral-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold mb-8 inline-block">
                        &larr; Back to Journal
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                        {blog.blog_title}
                    </h1>
                </div>

                {heroImage && (
                    <div className="w-full rounded-3xl overflow-hidden mb-16 flex justify-center">
                        <img
                            src={`/storage/${heroImage}`}
                            alt={blog.blog_title}
                            className="w-full h-auto max-h-[85vh] object-contain block"
                        />
                    </div>
                )}

                <div className="max-w-3xl mx-auto">
                    <div className="prose text-2xl prose-invert prose-lg max-w-none text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">
                        {blog.blog_content}
                    </div>
                </div>

                {/* Securely unmount the gallery block completely if no secondary attachments exist */}
                {galleryImages.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-10 text-center tracking-tight">Gallery</h3>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {galleryImages.map((img: string, idx: number) => (
                                <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/20 transition-colors">
                                    <img
                                        src={`/storage/${img}`}
                                        alt={`Gallery image ${idx}`}
                                        className="w-full h-auto block hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </article>

        </PortfolioLayout>
    );
}
