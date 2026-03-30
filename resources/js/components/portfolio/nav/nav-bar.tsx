import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Logo from './logo';
import NavLink from './nav-link';
import MobileNav from './mobile-nav';

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed z-50 transition-all duration-500 ease-in-out backdrop-blur-md',
                isScrolled
                    ? 'top-0 inset-x-0 mx-auto w-full max-w-full bg-neutral-700/95 py-1.5 shadow-2xl rounded-none border border-transparent border-b-white/10'
                    : 'top-4 inset-x-0 mx-auto w-[85%] max-w-3xl bg-black/60 py-1.5 shadow-xl rounded-full border border-white/10'
            )}
        >
            <div className="px-5 md:px-6 flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="md:hidden flex items-center">
                        <MobileNav />
                    </div>
                    <Logo />
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/portfolio">Portfolio</NavLink>
                    <NavLink href="/reviews">Book Reviews</NavLink>
                    <NavLink href="/blog">Blog</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </nav>
            </div>
        </header>
    );
}
