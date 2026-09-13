import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/ui/Loading';
import SectionMarker from '../components/ui/SectionMarker';
import ImageCard from '../components/ui/ImageCard';

export default function Artikel() {
    const [articles, setArticles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/articles')
        .then((articlesRes) => setArticles(articlesRes.data))
        .finally(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className='w-full flex flex-col gap-8 md:gap-16 px-6 md:px-20 py-16 md:py-30 font-medium bg-light-1'>
            <SectionMarker section={'Artikel'} />
            <h2 className='text-xl md:text-4xl md:w-1/2 leading-[1.1] md:mb-16'>Wawasan, tren, dan cerita seputar transformasi digital yang kami rangkum untuk membantu bisnis Anda terus berkembang.</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16'>
                {articles.map((item) => (
                    <Link to={`/artikel/${item.id}`}>
                        <ImageCard name={item.title} description={item.summary} image_url={item.image_url} index={item.date.split('T')[0]} isArticle={true} />
                    </Link>
                ))}
            </div>
        </div>
    )
}