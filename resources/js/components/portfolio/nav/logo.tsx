import { Link } from '@inertiajs/react';
import { Camera } from 'lucide-react';

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
            <div className="flex size-9 items-center justify-center">
                {/* <Camera className="size-5" /> */}
                <img src="/images/camera.png" alt="Logo" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none text-white uppercase mt-0.5">
                    K K Dwivedi
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-neutral-400 mt-1">
                    Photography
                </span>
            </div>
        </Link>
    );
}
