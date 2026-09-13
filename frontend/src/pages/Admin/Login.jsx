import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            const message = err.response?.data?.message || 'Terjadi kesalahan, coba lagi.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center px-6 bg-dark-1 font-medium'>
            <form 
                className='w-full max-w-sm p-8 flex flex-col gap-6 bg-dark-2 rounded-2xl border border-light-1/10' 
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-1'>
                    <h1 className='text-xl text-light-1'>Masuk ke dashboard</h1>
                    <p className='text-sm text-light-3'>Kelola konten Solusi Digital Nusantara.</p>
                </div>

                {error && (
                    <p className='text-sm px-3 py-2 rounded-sm bg-red-500/10 text-red-400 border border-red-500/20'>
                        {error}
                    </p>
                )}

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='email' className='text-sm text-light-3'>Email</label>
                        <input 
                            id='email'
                            type='email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='bg-dark-3 border border-light-1/10 rounded-sm px-3 py-2 text-light-1 outline-none focus:border-light-1/30' 
                            placeholder='nama@perusahaan.com' 
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='password' className='text-sm text-light-3'>Kata sandi</label>
                        <input 
                            id='password'
                            type='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className='bg-dark-3 border border-light-1/10 rounded-sm px-3 py-2 text-light-1 outline-none focus:border-light-1/30' 
                            placeholder='••••••••' 
                            required 
                        />
                    </div>
                </div>

                <button 
                    type='submit' 
                    disabled={isLoading} 
                    className='py-2.5 rounded-sm bg-light-1 text-dark-1 hover:brightness-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isLoading ? 'Memproses...' : 'Masuk'}
                </button>
            </form>
        </div>
    )
}