import { useState, useEffect } from 'react';

const IMAGES = [
    {
        src: "/images/3face.jpg",
        thumb: "/images/3face.jpg",
        alt: "Featured Work 1"
    },
    {
        src: "/images/elephant.jpg",
        thumb: "/images/elephant.jpg",
        alt: "Featured Work 2"
    },
    {
        src: "/images/flower.jpg",
        thumb: "/images/flower.jpg",
        alt: "Featured Work 3"
    },
    {
        src: "/images/rhino1.jpg",
        thumb: "/images/rhino1.jpg",
        alt: "Featured Work 4"
    },
    {
        src: "/images/bird1.jpg",
        thumb: "/images/bird1.jpg",
        alt: "Featured Work 5"
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
        }, 2500);

        return () => clearInterval(timer);
    }, []);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    };

    return (
        <section className="relative h-[100dvh] -mt-32 w-full flex flex-col justify-end overflow-hidden bg-black text-white">
            {/* Background Image Carousel */}
            <div className="absolute inset-0 z-0 w-full h-full">
                {IMAGES.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    />
                ))}
            </div>

            {/* Thumbnail Controls Strip */}
            <div className="relative z-20 w-full flex items-center justify-between bg-[#111111]/80 backdrop-blur-md border-t border-white/5 py-0 px-4 mt-auto">
                <button
                    onClick={prevImage}
                    className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors uppercase text-sm font-medium px-6 py-6 border-r border-white/5 h-full cursor-pointer hover:bg-white/5"
                >
                    &larr; Previous
                </button>

                {/* Thumbnails */}
                <div className="hidden md:flex items-center h-full flex-1 overflow-hidden">
                    <div className="flex w-full">
                        {IMAGES.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-24 flex-1 transition-all duration-500 border-r border-white/5 relative bg-black cursor-pointer overflow-hidden group ${index === currentIndex
                                    ? 'opacity-100 flex-[1.5]'
                                    : 'opacity-50 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={image.thumb}
                                    alt={`Thumb ${index + 1}`}
                                    className={`w-full h-full object-cover transition-all duration-700 ${index === currentIndex ? 'scale-105 filter-none' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
                                        }`}
                                />
                                {index === currentIndex && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextImage}
                    className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors uppercase text-sm font-medium px-6 py-6 border-l border-white/5 h-full cursor-pointer hover:bg-white/5"
                >
                    Next &rarr;
                </button>
            </div>
        </section>
    );
}
