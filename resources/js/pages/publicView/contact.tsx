import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { useState, useEffect } from 'react';

const IMAGES = [
    '/images/bird1.jpg',
    '/images/3face.jpg',
    '/images/bird2.jpg',
    '/images/elephant.jpg',
    '/images/flower.jpg',
    '/images/rhino1.jpg'
];

export default function Contact() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
        }, 3000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <PortfolioLayout>
            <Head title="Contact | K K Dwivedi" />
            <section className="py-24 pt-44 bg-black min-h-[100dvh] flex flex-col items-center">
                <div className="w-full max-w-5xl px-6 lg:px-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-12 text-center">Contact</h1>

                    <div className="bg-zinc-900 rounded-[2rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">

                        {/* Form Side */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Let's connect</h2>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full bg-black/20 border border-zinc-800 rounded-lg p-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full bg-black/20 border border-zinc-800 rounded-lg p-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-black/20 border border-zinc-800 rounded-lg p-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full bg-black/20 border border-zinc-800 rounded-lg p-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                                />

                                <textarea
                                    placeholder="Message"
                                    rows={5}
                                    className="w-full bg-black/20 border border-zinc-800 rounded-lg p-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-gradient-to-r from-[#D1D1D1] to-[#8E8E8E] text-black font-semibold py-3.5 rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Send
                                </button>
                            </form>
                        </div>

                        {/* Image Side */}
                        <div className="h-full w-full min-h-[400px] md:min-h-full rounded-2xl overflow-hidden relative">
                            {IMAGES.map((src, index) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
                        </div>

                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}
