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
                'fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 transition-all duration-300 rounded-full border border-white/10 backdrop-blur-md',
                isScrolled
                    ? 'bg-black/90 py-1.5 shadow-2xl'
                    : 'bg-black/60 py-2.5 shadow-xl'
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
