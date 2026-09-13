import Hero from "../components/Beranda/Hero";
import QuickProfile from "../components/Beranda/QuickProfile";
import LayananUnggulan from "../components/Beranda/LayananUnggulan";
import ArtikelTerbaru from "../components/Beranda/ArtikelTerbaru";
import Loading from '../components/ui/Loading';
import Footer from '../components/ui/Footer';
import axios from "axios";
import { useState, useEffect } from 'react';

export default function Beranda() {
    const [articles, setArticles] = useState([]);
    const [services, setServices] = useState([]);
    const [contact, setContact] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get('http://localhost:3000/api/articles'),
            axios.get('http://localhost:3000/api/services'),
            axios.get('http://localhost:3000/api/contact')
        ]).then(([articlesRes, servicesRes, contactRes]) => {
            setArticles(articlesRes.data);
            setServices(servicesRes.data);
            setContact(contactRes.data[0]);
        }).finally(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className="font-medium bg-light-1">
            <Hero />
            <QuickProfile />
            <LayananUnggulan services={services} />
            <ArtikelTerbaru articles={articles} />
            <Footer contact={contact} />
        </div>
    )
}