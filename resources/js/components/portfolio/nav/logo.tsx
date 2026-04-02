import { Link } from '@inertiajs/react';
import { Camera } from 'lucide-react';

interface LogoProps {
    href?: string;
    className?: string;
}

export default function Logo({ href = '/', className = '' }: LogoProps) {
    return (
        <Link href={href} className={`flex items-center gap-1 md:gap-2 group transition-all duration-300 ${className}`}>
            <div className="flex items-center justify-center">
                <img src="/images/logo.svg" alt="Logo" className="w-full h-full object-contain size-22 m-2"/>
            </div>
        </Link>
    );
}
