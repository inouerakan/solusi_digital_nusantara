import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function MessagesForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await axiosInstance.post('/messages', {
                email,
                name,
                message
            });
            setEmail('');
            setName('');
            setMessage('');
        } catch (err) {
            setError(err.response?.data?.message || 'Data gagal diperbarui');
        }
    }

    return (
        <form className='flex-1 flex flex-col gap-4 p-6 bg-light-2 rounded border border-dark-1/25' onSubmit={handleSubmit}>
            {error && (
                <p className='text-amber-400'>{error}</p>
            )}
            <div className='flex gap-8'>
                <div className='flex-1 flex flex-col gap-2'>
                    <p>Email</p>
                    <input 
                        type='text' 
                        placeholder='Masukkan email anda...'
                        value={email}
                        className='border border-dark-1/10 px-2 py-1 bg-light-3'
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <p>Nama</p>
                    <input 
                        type='text' 
                        placeholder='Nama anda/kosongkan (anonim)'
                        value={name}
                        className='border border-dark-1/10 px-2 py-1  bg-light-3'
                        onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
                <p>Pesan Anda</p>
                <textarea 
                    rows={4} 
                    placeholder='Tuliskan pesan anda...'
                    value={message}
                    className='border border-dark-1/10 px-2 py-1  bg-light-3'
                    onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button 
                type='submit' 
                className='p-2 border border-dark-1/10 bg-light-3 hover:brightness-105 transition-all duration-150'
                disabled={isLoading}>
                    {isLoading ? 'Mengirim' : 'Kirim Pesan'}
            </button>
        </form>
    )
}