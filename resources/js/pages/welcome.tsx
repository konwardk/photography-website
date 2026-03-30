import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Hero } from '@/components/portfolio/hero';

const GALLERY_IMAGES = [
    '/images/3face.jpg',
    '/images/bird1.jpg',
    '/images/bird2.jpg',
    '/images/bird3.jpeg',
    '/images/elephant.jpg',
    '/images/flower.jpg',
    '/images/rhino1.jpg'
];

export default function Welcome() {
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

    // Handle ESC and Arrow keys for keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);

    const showPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev! - 1));
        }
    };

    const showNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! + 1) % GALLERY_IMAGES.length);
        }
    };

    const closeModal = () => setSelectedIndex(null);

    return (
        <PortfolioLayout>
            <Head title="K K Dwivedi | Photography Portfolio">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            
            <Hero />
            
            {/* Intro Quote Section */}
            <section className="py-24 bg-black text-center flex flex-col items-center justify-center border-b border-[#1a1a1a]">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                    <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed italic mb-12">
                        "While the eye believes it has seen everything before it, the photograph quietly reveals how much was left unnoticed — the fleeting expressions, the silent emotions, the unnoticed details that only time and stillness allow us to truly understand."
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Few Captured Moments, Timeless Stories</h2>
                </div>
            </section>

            {/* Portfolio Grid Section */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Portfolio</h2>
                        
                        {/* Filters */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto custom-scrollbar">
                            {['All', 'Birds', 'Wild animals', 'Insect', 'Moth & Butterfly', 'Flora', 'Reptile & Amphibian', 'Landscape'].map((filter, index) => (
                                <button 
                                    key={filter}
                                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-colors border ${index === 0 ? 'bg-[#E0E0E0] text-black border-[#E0E0E0]' : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-500'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {GALLERY_IMAGES.map((src, index) => (
                            <div 
                                key={src} 
                                onClick={() => setSelectedIndex(index)}
                                className="group relative aspect-[4/5] bg-neutral-900 overflow-hidden cursor-pointer"
                            >
                                <img 
                                    src={src} 
                                    alt={`Gallery Item ${index + 1}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white font-bold tracking-widest uppercase text-sm border-b border-white pb-1">View Image</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {mounted && selectedIndex !== null && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
                    <button 
                        onClick={closeModal}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 cursor-pointer bg-black/20 rounded-full"
                    >
                        <X className="size-8" />
                    </button>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); showPrev(); }}
                        className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors z-50 p-4 cursor-pointer focus:outline-none"
                    >
                        <ChevronLeft className="size-10 md:size-14" />
                    </button>

                    <div 
                        className="relative w-full h-[100dvh] flex items-center justify-center p-4 md:p-12 cursor-zoom-out" 
                        onClick={closeModal}
                    >
                        <img 
                            src={GALLERY_IMAGES[selectedIndex]} 
                            alt={`Gallery Modal Image`} 
                            className="max-w-full max-h-full object-contain select-none shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                        className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors z-50 p-4 cursor-pointer focus:outline-none"
                    >
                        <ChevronRight className="size-10 md:size-14" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest font-mono select-none">
                        {selectedIndex + 1} / {GALLERY_IMAGES.length}
                    </div>
                </div>,
                document.body
            )}
        </PortfolioLayout>
    );
}
