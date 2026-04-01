import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { index as adminCategoriesIndex } from '@/routes/admin/categories/index';
import { index as adminPhotosIndex } from '@/routes/admin/photos/index';
import { index as adminBlogsIndex } from '@/routes/admin/blogs/index';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Folder, Image, MessageSquare } from 'lucide-react';

interface Stats {
    categories: number;
    photos: number;
    blogs: number;
    book_reviews: number;
}

interface Props {
    stats: Stats;
}

export default function Dashboard({ stats }: Props) {
    const cards = [
        {
            title: 'Categories',
            description: 'Manage photo categories',
            icon: Folder,
            count: stats.categories,
            href: adminCategoriesIndex(),
            color: 'text-blue-600 dark:text-blue-400',
        },
        {
            title: 'Photos',
            description: 'Manage your photography collection',
            icon: Image,
            count: stats.photos,
            href: adminPhotosIndex(),
            color: 'text-indigo-600 dark:text-indigo-400',
        },
        {
            title: 'Blogs',
            description: 'Write and manage blog posts',
            icon: MessageSquare,
            count: stats.blogs,
            href: adminBlogsIndex(),
            color: 'text-emerald-600 dark:text-emerald-400',
        },
        {
            title: 'Book Reviews',
            description: 'Share your thoughts on books',
            icon: BookOpen,
            count: stats.book_reviews,
            href: '#',
            color: 'text-orange-600 dark:text-orange-400',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <Link key={card.title} href={card.href as any}>
                            <Card className="transition-all hover:border-sidebar-border/100 hover:shadow-md dark:hover:border-sidebar-border/100">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className={`h-4 w-4 ${card.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.count}</div>
                                    <p className="text-muted-foreground mt-1 text-xs">{card.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-xl bg-white shadow-sm border border-sidebar-border/70 dark:bg-sidebar dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground text-sm font-medium">Coming Soon: Dashboard Analytics & Charts</p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
