import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/ui/Loading';
import MessagesForm from '../components/Kontak/MessagesForm';

export default function Contact() {
    const [contact, setContact] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/contact')
        .then((contactRes) => setContact(contactRes.data[0]))
        .finally(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) {
        return (
            <Loading />
        )
    }

    return (
        <div className='w-full flex flex-col font-medium'>
            <div className='w-full md:h-screen flex gap-4 md:gap-0 flex-col md:flex-row'>
                <div className='md:flex-1 pt-16 md:py-30 px-6 md:px-20'>
                    <h2 className='text-2xl md:text-6xl leading-[1.1]'>Punya pertanyaan atau ide proyek? Kami siap mendengarkan.</h2>
                </div>
                <img src='/images/fullteam.jpg' alt='Perusahaan' className='md:w-1/2 px-6 md:px-0 object-cover' />
            </div>
            <div className='w-full px-6 md:px-20 py-16 md:py-30 flex flex-col gap-8 md:gap-16'>
                <h2 className='text-xl text-center md:text-left md:text-4xl'>Hubungi Kami</h2>
                <div className='flex'>
                    <div className='flex-1 grid grid-cols-2 gap-8 text-base md:text-lg'>
                        <div className='flex flex-col gap-2'>
                            <p>Alamat</p>
                            <p className='text-dark-3'>{contact.address}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Nomor Telepon</p>
                            <p className='text-dark-3'>{contact.phone_number}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Email</p>
                            <p className='text-dark-3'>{contact.email}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Instagram</p>
                            <p className='text-dark-3'>{contact.instagram}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Youtube</p>
                            <p className='text-dark-3'>{contact.youtube}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>TikTok</p>
                            <p className='text-dark-3'>{contact.tiktok}</p>
                        </div>
                    </div>
                    <MessagesForm />
                </div>
                <iframe  
                    className='aspect-video w-full' 
                    frameBorder="0" 
                    style={{ border: 0 }} 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=PT%20Digital%20Solusi%20Grup%2C%20E%20Jakarta%2C%20RT.2%2FRW.2%2C%20Karet%20Semanggi%2C%20South%20Jakarta%20City%2C%20Jakarta%2C%20Indonesia&maptype=roadmap" 
                    allowFullScreen 
/>
            </div>
        </div>
    )
}