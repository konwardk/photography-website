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
                <img src="/images/logo.png" alt="Logo" className="h-10 object-contain m-2"/>
            </div>
        </Link>
    );
}
