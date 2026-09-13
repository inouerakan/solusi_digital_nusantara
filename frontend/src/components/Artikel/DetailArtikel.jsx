import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../ui/Loading';

export default function DetailArtikel() {
    const {id} = useParams();
    const [article, setArticle] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/articles/${id}`)
        .then((articleRes) => setArticle(articleRes.data))
        .finally(() => setIsLoaded(true));
    });


    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className='w-full flex flex-col items-center gap-8 md:gap-16 pb-16 md:pb-30 font-medium'>
            <div className='w-full h-screen relative md:mb-16'>
                <img src={article.image_url} alt={article.name} className='w-full h-full object-cover' />
                <h2 className='text-xl md:text-4xl absolute bottom-0 left-0 bg-light-1 w-1/2 md:w-1/3 pb-4 md:pb-8 pl-4 md:pl-8 pt-4 pr-4'>{article.title}<br /><span className='text-lg text-dark-3'>{article.date.split('T')[0]}</span></h2>
            </div>
            <p className='text-base md:text-xl md:w-2/3 text-justify leading-loose font-normal px-6'>{article.content}</p>
        </div>
    )
}