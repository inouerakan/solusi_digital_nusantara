import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function ArticlesForm({data, fetchArticles, isCreateData}) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isCreateData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitle('');
            setSummary('');
            setContent('');
            setImageUrl('');
            setSelectedFile(null);
        } else if (data) {
            setTitle(data.title);
            setSummary(data.summary);
            setContent(data.content);
            setImageUrl(data.image_url);
            setSelectedFile(null);
        }
    }, [data, isCreateData])

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (isCreateData && !selectedFile) {
            setError('Gambar wajib diunggah untuk data baru');
            setIsLoading(false);
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            let finalImageUrl = imageUrl;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const uploadRes = await axiosInstance.post('/upload/articles', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                finalImageUrl = uploadRes.data.image_url;
            }

            if (isCreateData) {
                await axiosInstance.post('/articles', {
                    title,
                    summary,
                    content,
                    image_url: finalImageUrl
                });
            } else {
                await axiosInstance.put(`/articles/${data.id}`, {
                    title,
                    summary,
                    content,
                    image_url: finalImageUrl
                });
            }
            fetchArticles();
        } catch (err) {
            setError(err.response?.data?.message || 'Data gagal diperbarui');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Yakin ingin menghapus data ini?')) return;
        setError('');
        setIsLoading(true);
        try {
            await axiosInstance.delete(`/articles/${data.id}`);
            fetchArticles();
        } catch (err) {
            setError(err.response?.data?.message || 'Data gagal dihapus');
        } finally {
            setIsLoading(false);
        }
    };

    if (!data && !isCreateData) {
        return <p className='text-light-3'>Pilih salah satu data untuk diperbarui atau dihapus.</p>;
    }

    return (
        <div className='flex-1 flex flex-col gap-4 p-4 border border-light-1/10 rounded-lg overflow-y-auto scrollbar-thumb-stone-500 scrollbar-thin'>
            {error && <p className='text-light-3'>{error}</p>}
            <form className='flex flex-col gap-4' onSubmit={handleSave}>
                {!isCreateData && (
                    <div>
                        <p>{`Id: ${data.id}`}</p>
                        <p>{`Tanggal: ${data.date}`}</p>
                    </div>
                )}
                <div className='flex flex-col gap-2'>
                    <p>Judul</p>
                    <input
                        placeholder='Masukkan Judul Artikel...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='px-2 py-1 border border-light-1/10 rounded-sm'
                        type="text"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Ringkasan</p>
                    <textarea
                        rows={3}
                        placeholder='Ringkasan singkat untuk card...'
                        className='px-2 py-1 border border-light-1/10 rounded-sm'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    ></textarea>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Konten Lengkap</p>
                    <textarea
                        rows={8}
                        placeholder='Isi lengkap artikel...'
                        className='px-2 py-1 border border-light-1/10 rounded-sm'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Gambar</p>
                    {imageUrl && !selectedFile && (
                        <img src={imageUrl} alt={title} className='w-40 aspect-video object-cover rounded-sm' />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className='border border-light-1/10 px-2 py-1 hover:bg-dark-3 text-sm'
                    />
                </div>
                <button type='submit' disabled={isLoading} className='w-full p-2 border border-light-1/10 hover:bg-dark-3'>
                    {isLoading ? 'Menyimpan' : 'Simpan'}
                </button>
            </form>
            {!isCreateData && (
                <button
                    type='button'
                    disabled={isLoading}
                    className='w-full p-2 border border-light-1/10 hover:bg-dark-3'
                    onClick={handleDelete}
                >
                    {isLoading ? 'Menghapus' : 'Hapus'}
                </button>
            )}
        </div>
    );
}