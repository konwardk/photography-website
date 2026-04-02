import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function BlogShow({ blog }: { blog: any }) {
    // Automatically unpack the database payload to strictly isolate the primary hero shot from any subsequent structural images
    const heroImage =
        blog.images && blog.images.length > 0 ? blog.images[0] : null;
    const galleryImages =
        blog.images && blog.images.length > 1 ? blog.images.slice(1) : [];

    return (
        <PortfolioLayout>
            <Head title={`${blog.blog_title} | Journal`} />

            <article className="mx-auto min-h-screen w-full max-w-5xl px-5 pt-24 pb-32 md:px-12">
                {/* Header */}
                <div className="mt-12 mb-12 md:mt-20">
                    <Link
                        href="/blog"
                        className="mb-8 inline-block text-sm font-semibold tracking-widest text-neutral-500 uppercase transition-colors hover:text-white"
                    >
                        &larr; Back to Journal
                    </Link>

                    <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        {blog.blog_title}
                    </h1>
                </div>

                {/* Hero Image (Reduced Width) */}
                {heroImage && (
                    <div className="mb-16 flex justify-center">
                        <div className="w-full max-w-3xl overflow-hidden rounded-2xl">
                            <img
                                src={`/storage/${heroImage}`}
                                alt={blog.blog_title}
                                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="mx-auto max-w-3xl">
                    <div className="prose prose-invert prose-lg max-w-none text-2xl md:text-3xl leading-relaxed font-light whitespace-pre-wrap text-neutral-300">
                        {blog.blog_content}
                    </div>
                </div>

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <div className="mt-32 border-t border-white/10 pt-16">
                        <h3 className="mb-10 text-center text-2xl font-bold tracking-tight text-white">
                            Gallery
                        </h3>

                        <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
                            {galleryImages.map((img: string, idx: number) => (
                                <div
                                    key={idx}
                                    className="break-inside-avoid overflow-hidden rounded-2xl border border-white/5 bg-neutral-900 transition-colors hover:border-white/20"
                                >
                                    <img
                                        src={`/storage/${img}`}
                                        alt={`Gallery image ${idx}`}
                                        className="block h-auto w-full transition-transform duration-700 ease-out hover:scale-105"
                                        loading="lazy"
                                        draggable={false}
                                        onContextMenu={(e) => e.preventDefault()}
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
