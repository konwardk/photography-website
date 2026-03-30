import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-[100dvh] flex-col items-center justify-center p-6 md:p-10 overflow-hidden font-sans text-neutral-800">
            {/* Background Image / Blur */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/bird1.jpg" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl" />
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-center gap-5">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-4 transition-transform hover:scale-105"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 border border-black/10 shadow-xl backdrop-blur-md text-neutral-900">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-aperture"><circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94"/><path d="m9.69 8-5.74 9.94"/><path d="m7.38 12l5.74-9.94"/><path d="m16.62 12-5.74-9.94"/><path d="M12 17.27L6.26 7.33"/><path d="m12 17.27 5.74-9.94"/></svg>
                            </div>
                            <span className="sr-only">Home</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{title}</h1>
                            <p className="text-sm font-light text-neutral-600">
                                {description}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white/60 border border-black/5 rounded-2xl p-8 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                        {children}
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-6 text-center text-[11px] text-neutral-500 uppercase tracking-widest z-10 font-bold">
                Secure Administrator Portal &copy; {new Date().getFullYear()} K K Dwivedi
            </div>
        </div>
    );
}
