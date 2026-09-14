import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function GalleryForm({data, fetchGallery, isCreateData}) {
    const [title, setTitle] = useState(data?.title || '');
    const [imageUrl, setImageUrl] = useState(data?.image_url || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isCreateData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitle('');
            setImageUrl('');
            setSelectedFile(null);
        } else if (data) {
            setTitle(data.title);
            setImageUrl(data.image_url);
            setSelectedFile(null);
        }
    }, [data, isCreateData]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (isCreateData && !selectedFile) {
            setError('Gambar wajib diunggah untuk data baru');
            setIsUploading(false);
            return;
        }
        setError('');
        try {
            let finalImageUrl = imageUrl;
            if (selectedFile) {
                setIsUploading(true);
                const formData = new FormData();
                formData.append('file', selectedFile);

                const uploadRes = await axiosInstance.post('/upload/gallery', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                finalImageUrl = uploadRes.data.image_url;
                setIsUploading(false);
            }

            if (isCreateData) {
                await axiosInstance.post('/gallery', {
                    title,
                    image_url: finalImageUrl
                });
            } else {
                await axiosInstance.put(`/gallery/${data.id}`, {
                    title,
                    image_url: finalImageUrl
                });
            }
            fetchGallery();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan data');
            setIsUploading(false);
        }
    };

    const handleDelete = async () => {
        setError('');
        if (!confirm('Yakin ingin menghapus data ini?')) return;
        setIsUploading(true);
        try {
            await axiosInstance.delete(`/gallery/${data.id}`);
            fetchGallery();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan data');
            setIsUploading(false);
        }
    };

    if (!data && !isCreateData) return <p className='text-light-3'>Pilih salah satu data untuk diperbarui atau dihapus.</p>

    return (
        <div className='flex-1 flex flex-col gap-4 p-4 border border-light-1/10 rounded-lg'>
            {error && <p className='text-light-3'>{error}</p>}
            <form onSubmit={handleSave} className='flex flex-col gap-4'>
                {!isCreateData && (
                    <div>
                        <p>{`Id: ${data.id}`}</p>
                        <p>{`Diperbarui: ${data.updated_at}`}</p>
                    </div>
                )}
                <div className='flex gap-4'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Judul</p>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className='border border-light-1/10 px-2 py-1'
                        />
                    </div>
                    
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Gambar</p>
                        <input 
                            type="file" 
                            className='border border-light-1/10 px-2 py-1 hover:bg-dark-3'
                            accept="image/*"
                            onChange={handleFileChange} 
                        />
                        {imageUrl && !selectedFile && (
                            <img src={imageUrl} alt="Preview" className='w-32 h-32 object-cover' />
                        )}
                    </div>
                </div>
                <button type="submit" disabled={isUploading} className='p-2 border border-light-1/10 hover:bg-dark-3 rounded-sm'>
                    {isUploading ? 'Menyimpan...' : 'Simpan'}
                </button>
            </form>
            {!isCreateData && (
                <button type="button" onClick={handleDelete} disabled={isUploading} className='p-2 border border-light-1/10 hover:bg-dark-3 rounded-sm'>
                    {isUploading ? 'Menghapus...' : 'Hapus'}
                </button>
            )}
        </div>
    );
}