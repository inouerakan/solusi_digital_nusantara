import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function ContactForm({data, fetchContact}) {
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAddress(data.address);
            setPhoneNumber(data.phone_number);
            setEmail(data.email);
            setInstagram(data.instagram);
            setYoutube(data.youtube);
            setTiktok(data.tiktok);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
        }
    }, [data])

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await axiosInstance.put(`/contact/${data.id}`, {
                address,
                phone_number: phoneNumber,
                email,
                instagram,
                youtube,
                tiktok,
                latitude,
                longitude
            });
            fetchContact();
        } catch (err) {
            setError(err.response?.data?.message || 'Data gagal diperbarui');
        } finally {
            setIsLoading(false);
        }
    };

    if (!data) {
        return <p className='text-light-3'>Data kontak belum tersedia.</p>;
    }

    return (
        <div className='flex-1 flex flex-col gap-4 p-4 border border-light-1/10 rounded-lg overflow-y-auto scrollbar-thumb-stone-500 scrollbar-thin'>
            {error && <p className='text-light-3'>{error}</p>}
            <form className='flex flex-col gap-4' onSubmit={handleSave}>
                <div>
                    <p>{`Id: ${data.id}`}</p>
                    <p>{`Diperbarui: ${data.updated_at}`}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Alamat</p>
                    <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='px-2 py-1 border border-light-1/10 rounded-sm'
                    ></textarea>
                </div>
                <div className='flex gap-4'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Nomor Telepon</p>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Email</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Instagram</p>
                        <input
                            type="text"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Youtube</p>
                        <input
                            type="text"
                            value={youtube}
                            onChange={(e) => setYoutube(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>TikTok</p>
                        <input
                            type="text"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Latitude</p>
                        <input
                            type="text"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p>Longitude</p>
                        <input
                            type="text"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            className='px-2 py-1 border border-light-1/10 rounded-sm'
                        />
                    </div>
                </div>
                <button type='submit' disabled={isLoading} className='w-full p-2 border border-light-1/10 hover:bg-dark-3'>
                    {isLoading ? 'Menyimpan' : 'Simpan'}
                </button>
            </form>
        </div>
    );
}