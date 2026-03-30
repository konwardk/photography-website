import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { useCurrentUrl } from '@/hooks/use-current-url';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
    const { isCurrentUrl } = useCurrentUrl();
    const isActive = isCurrentUrl(href);

    return (
        <Link
            href={href}
            className={cn(
                'relative flex items-center gap-1 text-sm font-medium transition-all duration-200',
                isActive
                    ? 'text-white underline underline-offset-8 decoration-2 decoration-white/20'
                    : 'text-neutral-400 hover:text-white',
                className
            )}
        >
            {children}
            {isActive && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-white animate-in slide-in-from-left-0 duration-300" />
            )}
        </Link>
    );
}
