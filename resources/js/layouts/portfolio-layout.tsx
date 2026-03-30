import { NavBar } from '@/components/portfolio/nav';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <NavBar />
            <main className="pt-32 pb-16 min-h-screen flex flex-col">
                {children}
            </main>
            <footer className="border-t border-[#1a1a1a] py-8 bg-black">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tighter leading-none">
                                LENS<span className="text-neutral-500">&</span>LIGHT
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500 mt-1">
                                Photography Portfolio
                            </span>
                        </div>
                        <div className="flex items-center gap-8 text-sm font-medium text-neutral-500">
                            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">LinkedIn</a>
                        </div>
                        <p className="text-sm text-neutral-400">
                            © 2026 LENS & LIGHT. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
