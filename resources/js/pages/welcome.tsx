import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Hero } from '@/components/portfolio/hero';
import FavouritePhotos from '@/components/portfolio/favourite-photos';

export default function Welcome({ carouselPhotos, favouritePhotos }: { carouselPhotos: any[], favouritePhotos: any[] }) {
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

            <Hero photos={carouselPhotos} />

            {/* Intro Quote Section */}
            <section className="py-24 bg-black text-center flex flex-col items-center justify-center border-b border-[#1a1a1a]">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                    <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed italic mb-12">
                        "While the eye believes it has seen everything before it, the photograph quietly reveals how much was left unnoticed — the fleeting expressions, the silent emotions, the unnoticed details that only time and stillness allow us to truly understand."
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Few Captured Moments, Timeless Stories</h2>
                </div>
            </section>

            {/* Favourite Photos Section */}
            <FavouritePhotos photos={favouritePhotos} />
        </PortfolioLayout>
    );
}
