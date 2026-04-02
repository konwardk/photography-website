import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function FavouritePhotos({ photos }: { photos: any[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedIndex]);

    const showPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev! - 1));
        }
    };

    const showNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! + 1) % photos.length);
        }
    };

    const closeModal = () => setSelectedIndex(null);

    if (!photos || photos.length === 0) return null;

    return (
        <section className="py-3 bg-black">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center mb-16">
                    <div className="h-1 w-12 bg-[#E0E0E0]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => setSelectedIndex(index)}
                            className="group relative aspect-square bg-neutral-900 overflow-hidden cursor-pointer rounded-sm"
                        >
                            <img
                                src={`/storage/${photo.path}`}
                                alt={`Favourite photo ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
                                <span className="text-white font-bold tracking-widest uppercase text-sm border-b border-white pb-1">View Piece</span>
                                <span className="text-white/60 text-xs tracking-wider uppercase">{photo.category?.category_name || 'Uncategorized'}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/portfolio"
                        className="group flex items-center gap-2 text-white font-semibold uppercase tracking-widest text-sm border border-neutral-800 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
                    >
                        View Portfolio
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Lightbox Modal */}
            {mounted && selectedIndex !== null && photos[selectedIndex] && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md" onClick={closeModal}>
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 cursor-pointer bg-black/20 rounded-full"
                    >
                        <X className="size-8" />
                    </button>

                    {photos.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors z-50 p-4 cursor-pointer focus:outline-none"
                        >
                            <ChevronLeft className="size-10 md:size-14" />
                        </button>
                    )}

                    <div className="relative w-full h-[100dvh] flex items-center justify-center p-4 md:p-12 cursor-zoom-out">
                        <img
                            src={`/storage/${photos[selectedIndex].path}`}
                            alt={`Gallery Modal Full View`}
                            className="max-w-full max-h-full object-contain select-none shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </div>

                    {photos.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors z-50 p-4 cursor-pointer focus:outline-none"
                        >
                            <ChevronRight className="size-10 md:size-14" />
                        </button>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest font-mono select-none">
                        {selectedIndex + 1} / {photos.length}
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
