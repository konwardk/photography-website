import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { useState, useEffect } from 'react';

const IMAGES = [
    '/images/bird1.jpg',
    '/images/3face.jpg',
    '/images/bird2.jpg',
    '/images/elephant.jpg',
    '/images/flower.jpg',
    '/images/rhino1.jpg',
];

export default function Contact() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % IMAGES.length,
            );
        }, 3000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <PortfolioLayout>
            <Head title="Contact | K K Dwivedi" />
            <section className="flex min-h-[100dvh] flex-col items-center bg-black py-24 pt-26">
                <div className="w-full max-w-5xl px-6 lg:px-12">
                    <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Contact
                    </h1>

                    <div className="grid w-full grid-cols-1 gap-8 rounded-[2rem] bg-zinc-900 p-8 md:min-h-[520px] md:grid-cols-2 md:gap-12 md:p-12 lg:min-h-[600px]">
                        {/* Contact Info Side */}
                        <div className="flex flex-col justify-center">
                            <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                                Let's connect
                            </h2>

                            <p className="mb-6 text-sm leading-relaxed text-neutral-400 md:text-base">
                                Whether you have a project in mind, want to
                                collaborate, or simply wish to get in touch,
                                feel free to reach out. I’m always open to
                                meaningful conversations and creative
                                opportunities.
                            </p>

                            {/* Email */}
                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                                <p className="mb-2 text-xs tracking-widest text-neutral-500 uppercase">
                                    Email
                                </p>

                                <a
                                    href="mailto:your@email.com"
                                    className="text-lg font-semibold break-all text-white transition-colors hover:text-neutral-300 md:text-xl"
                                >
                                    your@email.com
                                </a>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-auto md:min-h-[520px] lg:min-h-[600px]">
                            {' '}
                            {IMAGES.map((src, index) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                                        index === currentImageIndex
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            ))}
                            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80"></div>
                        </div>
                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}

{
    /* <div className="flex flex-col justify-center">
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
                        </div> */
}
