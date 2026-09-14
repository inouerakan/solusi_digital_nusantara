import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function MessagesForm({data, fetchMessages}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!confirm('Yakin ingin menghapus data ini?')) return;
        setError('');
        setIsLoading(true);
        try {
            await axiosInstance.delete(`/messages/${data.id}`);
            fetchMessages();
        } catch (err) {
            setError(err.response?.data?.message || 'Data gagal dihapus');
        }
    }

    if (!data) {
        return <p className='text-light-3'>Pilih salah satu data untuk dilihat atau dihapus</p>
    }

    return (
        <div className='flex-1 flex flex-col gap-4 border border-light-1/10 rounded-lg p-4'>
            {error && (
                <p>{error}</p>
            )}
            <div>
                <p>{`Id: ${data.id}`}</p>
                <p>{`Dikirim: ${data.send_at}`}</p>
            </div>
            <div className='flex'>
                <div className='flex-1'>
                    <p>Email</p>
                    <p className='text-light-3'>{data.email}</p>
                </div>
                <div className='flex-1'>
                    <p>Nama</p>
                    <p className='text-light-3'>{data.name === '' ? 'Anonim' : data.name}</p>
                </div>
            </div>
            <div>
                <p>Pesan</p>
                <p className='text-light-3'>{data.message}</p>
            </div>
            <button 
                type='button' 
                className='p-2 border border-light-1/10 rounded-sm hover:bg-dark-3 cursor-pointer'
                disabled={isLoading}
                onClick={handleDelete}>
                    {isLoading ? 'Menghapus' : 'Hapus'}
                </button>
        </div>
    )
}