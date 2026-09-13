import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/ui/Loading';

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/gallery')
        .then((galleryRes) => setGallery(galleryRes.data))
        .finally(() => setIsLoaded(true));
    });

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className='w-full px-6 md:px-20 py-16 md:py-30 flex flex-col font-medium bg-light-1'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-8'>
                {gallery.map((item) => (
                    <div className='flex flex-col gap-2'>
                        <img src={item.image_url} alt={item.title} />
                        <p className='text-base md:text-xl'>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}