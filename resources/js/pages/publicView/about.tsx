import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function About() {
    return (
        <PortfolioLayout>
            <Head title="About | K K Dwivedi" />
            <section className="py-24 pt-40 bg-black min-h-[100dvh]">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-neutral-300">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">About The Photographer</h1>
                    
                    <div className="space-y-6 text-lg leading-relaxed font-light">
                        <p>
                            Photography is the art of observation. It has little to do with the things you see and everything to do with the way you see them. I am constantly searching for the extraordinary in the mundane, looking for the quiet moments that often pass us by. My journey with photography started not as a profession, but as a deeply personal way to document the world around me.
                        </p>
                        <p>
                            With every click of the shutter, I attempt to distill the essence of a fleeting moment. From the striking silhouettes of the natural world to the intricate, delicate details of a moth resting on a leaf, my work explores the delicate balance of light, shadow, and texture. I believe that an image is a poem without words, inviting the viewer to pause, reflect, and discover their own meaning.
                        </p>
                        <p>
                            When I'm not behind the lens, I spend my time exploring trails, reading classic literature, and honing my creative vision. I'm always looking for the next adventure, the next challenge, and the next story waiting to be told through my camera.
                        </p>
                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}
