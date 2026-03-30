import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import InputError from '@/components/input-error';

export default function PhotosIndex({ photos, categories }: { photos: any[], categories: any[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editPhoto, setEditPhoto] = useState<any>(null);

    const createForm = useForm({
        category_id: '',
        photo: null as File | null,
        is_favourite: false,
        is_carousal: false,
    });

    const editForm = useForm({
        category_id: '',
        is_favourite: false,
        is_carousal: false,
    });

    const openCreate = () => {
        createForm.reset();
        createForm.clearErrors();
        setIsCreateModalOpen(true);
    };

    const openEdit = (photo: any) => {
        setEditPhoto(photo);
        editForm.setData({
            category_id: photo.category_id,
            is_favourite: photo.is_favourite,
            is_carousal: photo.is_carousal,
        });
        editForm.clearErrors();
    };

    const closeCreate = () => setIsCreateModalOpen(false);
    const closeEdit = () => setEditPhoto(null);

    const storePhoto = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia implicitly covers multipart/form-data for files!
        createForm.post('/admin/photos', {
            onSuccess: () => closeCreate(),
            forceFormData: true,
        });
    };

    const updatePhoto = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editPhoto) return;
        editForm.put(`/admin/photos/${editPhoto.id}`, {
            onSuccess: () => closeEdit(),
        });
    };

    const deletePhoto = (id: number) => {
        if (confirm('Are you absolutely sure you want to completely delete this physical photo? This action cannot be undone.')) {
            router.delete(`/admin/photos/${id}`);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-6xl mx-auto w-full">
            <Head title="Manage Photos" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Manage Photos</h1>
                    <p className="text-sm text-neutral-500 mt-1">Upload and strictly organize images across your portfolio.</p>
                </div>
                {categories.length === 0 ? (
                    <Button disabled className="bg-neutral-400 text-white cursor-not-allowed shadow-sm">
                        Create a Category First
                    </Button>
                ) : (
                    <Button onClick={openCreate} className="bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm transition-colors">
                        + Upload Photo
                    </Button>
                )}
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden min-h-[50vh]">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-neutral-50 border-b border-neutral-200 text-neutral-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Image</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Category</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Features</th>
                            <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {photos.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-neutral-500 font-medium">
                                    No photos found. Upload your first photograph to get started.
                                </td>
                            </tr>
                        ) : photos.map((photo) => (
                            <tr key={photo.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-16 h-16 rounded overflow-hidden shadow-sm border border-neutral-200 bg-neutral-100">
                                        <img src={`/storage/${photo.path}`} alt="thumbnail" className="object-cover w-full h-full" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-neutral-900 text-base">
                                    {photo.category?.category_name || 'Uncategorized'}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    {photo.is_favourite && (
                                        <span className="bg-yellow-100 border border-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs font-semibold">
                                            Favourite
                                        </span>
                                    )}
                                    {photo.is_carousal && (
                                        <span className="bg-blue-100 border border-blue-200 text-blue-800 py-1 px-3 rounded-full text-xs font-semibold">
                                            Carousel Hero
                                        </span>
                                    )}
                                    {!photo.is_favourite && !photo.is_carousal && (
                                        <span className="text-neutral-400 text-xs font-medium">Standard</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <button 
                                        onClick={() => openEdit(photo)}
                                        className="text-neutral-500 hover:text-neutral-900 font-semibold transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Edit Properties
                                    </button>
                                    <button 
                                        onClick={() => deletePhoto(photo.id)}
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
                        <DialogTitle className="text-xl font-bold">Upload New Photo</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={storePhoto} className="space-y-6 mt-2">
                        
                        <div className="space-y-3">
                            <Label htmlFor="create_category" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">Select Category</Label>
                            <select
                                id="create_category"
                                value={createForm.data.category_id}
                                onChange={(e) => createForm.setData('category_id', e.target.value)}
                                className="block w-full rounded-lg border border-neutral-300 bg-white px-3 h-12 text-sm text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                required
                            >
                                <option value="" disabled>-- Choose a category --</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                ))}
                            </select>
                            <InputError message={createForm.errors.category_id} />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="create_photo" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">Image File</Label>
                            <Input 
                                id="create_photo"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={(e) => createForm.setData('photo', e.target.files ? e.target.files[0] : null)}
                                className="bg-white border-neutral-300 focus-visible:ring-neutral-900 rounded-lg shadow-inner text-sm file:text-sm file:font-semibold file:text-neutral-900"
                                required
                            />
                            <InputError message={createForm.errors.photo} />
                        </div>

                        <div className="flex gap-6 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={createForm.data.is_favourite}
                                    onChange={(e) => createForm.setData('is_favourite', e.target.checked)}
                                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                                />
                                <span className="text-sm font-medium text-neutral-700">Mark as Favourite</span>
                            </label>
                            
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={createForm.data.is_carousal}
                                    onChange={(e) => createForm.setData('is_carousal', e.target.checked)}
                                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                                />
                                <span className="text-sm font-medium text-neutral-700">Show in Carousel</span>
                            </label>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={closeCreate} className="h-11 rounded-lg border-neutral-200">Cancel</Button>
                            <Button type="submit" disabled={createForm.processing} className="bg-neutral-900 text-white hover:bg-neutral-800 h-11 rounded-lg shadow-sm">
                                {createForm.processing ? 'Uploading...' : 'Upload Photo'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            {editPhoto && (
                <Dialog open={true} onOpenChange={(open) => !open && closeEdit()}>
                    <DialogContent className="bg-white text-neutral-900 border-none shadow-2xl rounded-2xl w-full max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">Edit Photo Properties</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={updatePhoto} className="space-y-6 mt-2">
                            
                            <div className="space-y-3">
                                <Label htmlFor="edit_category" className="text-neutral-700 font-medium text-xs uppercase tracking-widest">Change Category</Label>
                                <select
                                    id="edit_category"
                                    value={editForm.data.category_id}
                                    onChange={(e) => editForm.setData('category_id', e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 bg-white px-3 h-12 text-sm text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                    ))}
                                </select>
                                <InputError message={editForm.errors.category_id} />
                            </div>

                            <div className="flex gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={editForm.data.is_favourite}
                                        onChange={(e) => editForm.setData('is_favourite', e.target.checked)}
                                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                                    />
                                    <span className="text-sm font-medium text-neutral-700">Mark as Favourite</span>
                                </label>
                                
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={editForm.data.is_carousal}
                                        onChange={(e) => editForm.setData('is_carousal', e.target.checked)}
                                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                                    />
                                    <span className="text-sm font-medium text-neutral-700">Show in Carousel</span>
                                </label>
                            </div>

                            <DialogFooter className="gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={closeEdit} className="h-11 rounded-lg border-neutral-200">Cancel</Button>
                                <Button type="submit" disabled={editForm.processing} className="bg-neutral-900 text-white hover:bg-neutral-800 h-11 rounded-lg shadow-sm">
                                    {editForm.processing ? 'Saving...' : 'Update Properties'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

PhotosIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Photos', href: '/admin/photos' },
    ],
};
