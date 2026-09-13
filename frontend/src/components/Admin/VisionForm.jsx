import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function VisionForm({data, fetchVision}) {
    const [statement, setStatement] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatement(data.statement);
            setDescription(data.description);
        }
    }, [data])

    const handleSave = async (e) => {
        e.preventDefault();
        setError('')
        setIsLoading(true);
        try {
            await axiosInstance.put(`/vision/${data.id}`, {
                statement,
                description
            });
            fetchVision();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan perubahan');
        } finally {
            setIsLoading(false)
        }
    };

    if (!data) return <p className='text-light-3'>Pilih salah satu data untuk diperbarui atau dihapus.</p>;

    return (
        <div className='flex-1 flex flex-col gap-4 p-4 border rounded-lg border-light-1/10'>
            <form className='flex flex-col gap-4' onSubmit={handleSave}>
                {error && (
                    <p>{error}</p>
                )}
                <div>
                    <p>{`Id: ${data.id}`}</p>
                    <p>{`Diperbarui: ${data.updated_at}`}</p>
                </div>
                <div className='flex gap-2'>
                    <div className='flex flex-col flex-1 gap-2'>
                        <p>Pernyataan</p>
                        <input 
                        placeholder='Buat sebuah statement...'
                        type="text" 
                        className='border border-light-1/10 px-2 py-1'
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)} />
                    </div>
                    <div className='flex flex-col flex-1 gap-2'>
                        <p>Deskripsi</p>
                        <textarea 
                        placeholder='Jelaskan statement dalam deskripsi...'
                        rows={4} 
                        className='border border-light-1/10 px-2 py-1 scrollbar-thumb-stone-500 scrollbar-thin' 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>
                <button 
                className='w-full p-2 border border-light-1/10 hover:bg-dark-3 rounded-sm' 
                type='submit' 
                disabled={isLoading}>{`${isLoading ? 'Menyimpan' : 'Simpan'}`}</button>
            </form>
        </div>
    )
}