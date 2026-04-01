import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function BlogsIndex({ blogs }: { blogs: any }) {

    const deleteBlog = (id: number) => {
        if (confirm('Are you definitely sure you want to permanently delete this blog?')) {
            router.delete(`/admin/blogs/${id}`);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-8xl mx-auto w-full">
            <Head title="Manage Blogs" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Manage Blogs
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Write and publish your photography stories or articles.
                    </p>
                </div>
                <Link href="/admin/blogs/create">
                    <Button className="bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm transition-colors">
                        + Create Blog
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden min-h-[50vh] flex flex-col justify-between">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-neutral-50 border-b border-neutral-200 text-neutral-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider w-16">ID</th>
                            <th className="px-6 py-4 font-semibold tracking-wider w-1/6">Title</th>
                            <th className="px-6 py-4 font-semibold tracking-wider w-1/2">Content Snippet</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right w-32">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {!blogs || !blogs.data || blogs.data.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-neutral-500 font-medium">
                                    No blogs found. Let's write your first photography story!
                                </td>
                            </tr>
                        ) : blogs.data.map((blog: any) => (
                            <tr key={blog.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-neutral-500">
                                    #{blog.id}
                                </td>
                                <td className="px-6 py-4 font-bold text-neutral-900 text-base">
                                    {blog.blog_title}
                                </td>
                                <td className="px-6 py-4 text-neutral-500 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                    {blog.blog_content}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link
                                        href={`/admin/blogs/${blog.id}/edit`}
                                        className="text-neutral-500 hover:text-blue-600 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Edit Properties
                                    </Link>
                                    <button
                                        onClick={() => deleteBlog(blog.id)}
                                        className="text-red-500 hover:text-red-700 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {blogs && blogs.links && blogs.links.length > 3 && (
                    <div className="p-4 border-t border-neutral-200 flex justify-center gap-1 bg-neutral-50">
                        {blogs.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 border rounded-md text-sm font-medium transition-colors ${link.active ? 'bg-neutral-900 text-white border-neutral-900 pointer-events-none' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'} ${!link.url && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

BlogsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Blogs', href: '/admin/blogs' },
    ],
};
