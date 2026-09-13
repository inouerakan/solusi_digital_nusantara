import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function MissionsForm({data, fetchMissions, isCreateData}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isCreateData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitle('');
            setDescription('');
        } else if (data) {
            setTitle(data.title);
            setDescription(data.description);
        }
    }, [data, isCreateData])

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            if (isCreateData) {
                await axiosInstance.post('/missions', {
                    title,
                    description
                });
            } else {
                await axiosInstance.put(`/missions/${data.id}`, {
                    title,
                    description
                });
            }
            fetchMissions();
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
            await axiosInstance.delete(`/missions/${data.id}`);
            fetchMissions();
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
        <div className='flex-1 flex flex-col gap-4 p-4 border border-light-1/10 rounded-lg'>
            {error && <p className='text-light-3'>{error}</p>}
            <form className='flex flex-col gap-4' onSubmit={handleSave}>
                {!isCreateData && (
                    <div>
                        <p>{`Id: ${data.id}`}</p>
                        <p>{`Diperbarui: ${data.updated_at}`}</p>
                    </div>
                )}
                <div className='flex flex-col gap-2'>
                    <p>Judul</p>
                    <input
                        placeholder='Masukkan Judul...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='px-2 py-1 border border-light-1/10 rounded-sm'
                        type="text"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Deskripsi</p>
                    <textarea
                        rows={4}
                        placeholder='Jelaskan judul dalam deskripsi...'
                        className='px-2 py-1 border border-light-1/10 rounded-sm'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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