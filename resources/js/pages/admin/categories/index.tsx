import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import InputError from '@/components/input-error';

export default function CategoriesIndex({ categories }: { categories: any[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null);

    const createForm = useForm({
        category_name: '',
    });

    const editForm = useForm({
        category_name: '',
    });

    const openCreate = () => {
        createForm.reset();
        createForm.clearErrors();
        setIsCreateModalOpen(true);
    };

    const openEdit = (cat: any) => {
        setEditCategory(cat);
        editForm.setData('category_name', cat.category_name);
        editForm.clearErrors();
    };

    const closeCreate = () => setIsCreateModalOpen(false);
    const closeEdit = () => setEditCategory(null);

    const storeCategory = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/categories', {
            onSuccess: () => closeCreate(),
        });
    };

    const updateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editCategory) return;
        editForm.put(`/admin/categories/${editCategory.id}`, {
            onSuccess: () => closeEdit(),
        });
    };

    const deleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category? All related photo database entries will also be deleted.')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto w-full">
            <Head title="Manage Photo Categories" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Photo Categories</h1>
                    <p className="text-sm text-neutral-500 mt-1">Manage all categories that organize your portfolio.</p>
                </div>
                <Button onClick={openCreate} className="bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm transition-colors">
                    + Add Category
                </Button>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-neutral-50 border-b border-neutral-200 text-neutral-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Category Name</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Photos Count</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-10 text-center text-neutral-500 font-medium">
                                    No categories found. Create your incredibly first category to get started.
                                </td>
                            </tr>
                        ) : categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-neutral-900 text-base">
                                    {cat.category_name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-neutral-100 border border-neutral-200 text-neutral-700 py-1 px-3 rounded-full text-xs font-semibold">
                                        {cat.photos_count} photos
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link 
                                        href={`/admin/photos/category/${cat.id}`}
                                        className="text-blue-500 hover:text-blue-700 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        View Photos
                                    </Link>
                                    <button 
                                        onClick={() => openEdit(cat)}
                                        className="text-neutral-500 hover:text-neutral-900 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteCategory(cat.id)}
                                        className="text-red-500 hover:text-red-700 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="bg-white text-neutral-900 border-none shadow-2xl rounded-2xl w-full max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Add New Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={storeCategory} className="space-y-6 mt-2">
                        <div className="space-y-3">
                            <Label htmlFor="create_name" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">Category Name</Label>
                            <Input 
                                id="create_name"
                                value={createForm.data.category_name}
                                onChange={(e) => createForm.setData('category_name', e.target.value)}
                                placeholder="e.g. Weddings, Portrets"
                                className="bg-white border-neutral-300 focus-visible:ring-neutral-900 rounded-lg h-12 shadow-inner text-sm"
                                autoFocus
                            />
                            <InputError message={createForm.errors.category_name} />
                        </div>
                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={closeCreate} className="h-11 rounded-lg border-neutral-200">Cancel</Button>
                            <Button type="submit" disabled={createForm.processing} className="bg-neutral-900 text-white hover:bg-neutral-800 h-11 rounded-lg shadow-sm">
                                {createForm.processing ? 'Saving...' : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            {editCategory && (
                <Dialog open={true} onOpenChange={(open) => !open && closeEdit()}>
                    <DialogContent className="bg-white text-neutral-900 border-none shadow-2xl rounded-2xl w-full max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">Edit Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={updateCategory} className="space-y-6 mt-2">
                            <div className="space-y-3">
                                <Label htmlFor="edit_name" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">Category Name</Label>
                                <Input 
                                    id="edit_name"
                                    value={editForm.data.category_name}
                                    onChange={(e) => editForm.setData('category_name', e.target.value)}
                                    className="bg-white border-neutral-300 focus-visible:ring-neutral-900 rounded-lg h-12 shadow-inner text-sm"
                                    autoFocus
                                />
                                <InputError message={editForm.errors.category_name} />
                            </div>
                            <DialogFooter className="gap-2">
                                <Button type="button" variant="outline" onClick={closeEdit} className="h-11 rounded-lg border-neutral-200">Cancel</Button>
                                <Button type="submit" disabled={editForm.processing} className="bg-neutral-900 text-white hover:bg-neutral-800 h-11 rounded-lg shadow-sm">
                                    {editForm.processing ? 'Saving...' : 'Update Category'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

CategoriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
    ],
};
