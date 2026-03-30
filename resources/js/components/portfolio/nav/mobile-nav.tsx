import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Book Reviews', href: '/reviews' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { isCurrentUrl } = useCurrentUrl();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="hover:bg-white/10 text-white"
            >
                <Menu className="size-6" />
            </Button>

            {mounted && createPortal(
                <div className="md:hidden">
                    {/* Backdrop Overlay */}
                    <div 
                        className={cn(
                            'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300',
                            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                        )}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Slide-out Sidebar (Full Width, Dark Base) */}
                    <div
                        className={cn(
                            'fixed top-0 left-0 h-[100dvh] z-[70] w-full bg-[#0a0a0a] transition-transform duration-300 ease-in-out flex flex-col text-white',
                            isOpen ? 'translate-x-0' : '-translate-x-full'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 shrink-0">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight leading-none text-white uppercase mt-0.5">
                                    K K Dwivedi
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-neutral-400 mt-1">
                                    Photography
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 text-white -mr-2 cursor-pointer"
                            >
                                <X className="size-6" />
                            </Button>
                        </div>

                        {/* Nav Links (Scrollable area) */}
                        <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col space-y-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'text-3xl font-bold tracking-tight transition-colors',
                                        isCurrentUrl(item.href)
                                            ? 'text-white underline decoration-2 decoration-white/20 underline-offset-8'
                                            : 'text-neutral-500 hover:text-white'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Footer pinned to bottom */}
                        <div className="shrink-0 border-t border-white/10 p-6 pb-12">
                            <div className="flex flex-col space-y-4">
                                <p className="text-sm text-neutral-500 font-medium">
                                    &copy; 2026 Crafted By <span className="text-white font-semibold">Indigi Consulting pvt ltd</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
