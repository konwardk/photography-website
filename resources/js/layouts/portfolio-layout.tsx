import { NavBar } from '@/components/portfolio/nav';
import Footer from '@/components/portfolio/footer';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <NavBar />
            <main className="pt-10 pb-16 min-h-screen flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
}
