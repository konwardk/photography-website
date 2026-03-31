export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-8">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                    <div className="group flex cursor-pointer flex-col items-center md:items-start">
                        <span className="mt-0.5 text-xl leading-none font-bold tracking-tight text-white uppercase transition-colors group-hover:text-neutral-300">
                            K K Dwivedi
                        </span>
                        <span className="mt-1 text-[9px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
                            Photography
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-sm font-medium text-neutral-500">
                        <a
                            href="https://www.instagram.com/drkkdwivedi/"
                            target="__blank"
                            className="border-b border-transparent pb-0.5 transition-colors hover:border-white hover:text-white"
                        >
                            Instagram
                        </a>
                        <a
                            href="#"
                            className="border-b border-transparent pb-0.5 transition-colors hover:border-white hover:text-white"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://in.linkedin.com/in/dr-k-k-dwivedi-7b4112146"
                            target="__blank"
                            className="border-b border-transparent pb-0.5 transition-colors hover:border-white hover:text-white"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <p className="text-sm font-medium text-neutral-500">
                        &copy; 2026 Crafted By{' '}
                        <a
                            href="http://indigiconsulting.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-white hover:underline"
                        >
                            Indigi Consulting & Solutions pvt ltd
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
