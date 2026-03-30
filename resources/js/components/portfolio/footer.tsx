export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-8 bg-black">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start group cursor-pointer">
                        <span className="text-xl font-bold tracking-tight leading-none text-white uppercase mt-0.5 group-hover:text-neutral-300 transition-colors">
                            K K Dwivedi
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-neutral-500 mt-1">
                            Photography
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-sm font-medium text-neutral-500">
                        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">LinkedIn</a>
                    </div>
                    <p className="text-sm text-neutral-500 font-medium">
                        &copy; 2026 Crafted By <span className="text-white font-semibold">Indigi Consulting pvt ltd</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
