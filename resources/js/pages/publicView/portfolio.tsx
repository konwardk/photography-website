import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function Portfolio({ categories, photos }: { categories: any[]; photos: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    // Filter photos natively based on selection button
    const displayedPhotos = selectedCategory === 'All'
        ? photos
        : photos.filter(p => p.category_id === selectedCategory);

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

    // Handle ESC and Arrow keys for keyboard navigation directly referencing `displayedPhotos`
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') setSelectedIndex(null);

            // Recompute boundary logic directly in effect to guarantee fresh state mapping.
            if (e.key === 'ArrowLeft') {
                setSelectedIndex((prev) => (prev === 0 ? displayedPhotos.length - 1 : prev! - 1));
            }
            if (e.key === 'ArrowRight') {
                setSelectedIndex((prev) => (prev! + 1) % displayedPhotos.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, displayedPhotos]);

    const showPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev === 0 ? displayedPhotos.length - 1 : prev! - 1));
        }
    };

    const showNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! + 1) % displayedPhotos.length);
        }
    };

    const closeModal = () => setSelectedIndex(null);

    return (
        <PortfolioLayout>
            <Head title="Portfolio | K K Dwivedi" />

            {/* Portfolio Grid Section */}
            <section className="pt-16 px-5 md:px-12 w-full max-w-[100rem] mx-auto min-h-screen">
                <div className="container mx-auto px-6 lg:px-12">
                    <h2 className="text-4xl m-3 md:text-5xl font-bold text-center tracking-tight text-white shrink-0">Portfolio</h2>
                    <div className="flex flex-col md:flex-row justify-center items-baseline md:items-center mb-16 gap-8">

                        {/* Dropdown Filters mapped dynamically from database */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto custom-scrollbar">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-colors border ${selectedCategory === 'All' ? 'bg-[#E0E0E0] text-black border-[#E0E0E0]' : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-500'}`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-colors border ${selectedCategory === cat.id ? 'bg-[#E0E0E0] text-black border-[#E0E0E0]' : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-500'}`}
                                >
                                    {cat.category_name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid loading natively from `storage/` directory */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedPhotos.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-neutral-500 font-medium">
                                No photos exist in this category yet. Check back soon.
                            </div>
                        ) : displayedPhotos.map((photo, index) => (
                            <div
                                key={photo.id}
                                onClick={() => setSelectedIndex(index)}
                                className="group relative aspect-square bg-neutral-900 overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={`/storage/${photo.path}`}
                                    alt={`Portfolio Image ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
                                    <span className="text-white font-bold tracking-widest uppercase text-sm border-b border-white pb-1">View Image</span>
                                    <span className="text-white/60 text-xs tracking-wider uppercase">{photo.category?.category_name || 'Uncategorized'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal strictly tracking array boundaries */}
            {mounted && selectedIndex !== null && displayedPhotos[selectedIndex] && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md">
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 cursor-pointer bg-black/20 rounded-full"
                    >
                        <X className="size-8" />
                    </button>

                    {displayedPhotos.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 p-4 cursor-pointer focus:outline-none"
                        >
                            <ChevronLeft className="size-10 md:size-14" />
                        </button>
                    )}

                    <div
                        className="relative w-full h-[100dvh] flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={closeModal}
                    >
                        <img
                            src={`/storage/${displayedPhotos[selectedIndex].path}`}
                            alt={`Gallery Modal Full View`}
                            className="max-w-full max-h-full object-contain select-none shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {displayedPhotos.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-4 cursor-pointer focus:outline-none"
                        >
                            <ChevronRight className="size-10 md:size-14" />
                        </button>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest font-mono select-none">
                        {selectedIndex + 1} / {displayedPhotos.length}
                    </div>
                </div>,
                document.body
            )}
        </PortfolioLayout>
    );
}
