import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import Loading from '../../components/ui/Loading';
import OptionCard from '../../components/Admin/OptionCard';
import VisionForm from '../../components/Admin/VisionForm';
import HistoryForm from '../../components/Admin/HistoryForm';
import GalleryForm from '../../components/Admin/GalleryForm';
import MissionsForm from '../../components/Admin/MissionsForm';
import ValuesForm from '../../components/Admin/ValuesForm';
import ProductsForm from '../../components/Admin/ProductsForm';
import ServicesForm from '../../components/Admin/ServicesForm';
import ArticlesForm from '../../components/Admin/ArticlesForm';
import ContactForm from '../../components/Admin/ContactForm';

export default function Dashboard() {
    const [activeDashboard, setActiveDashboard] = useState('vision');
    const [activeData, setActiveData] = useState();
    const [vision, setVision] = useState([]);
    const [missions, setMissions] = useState([]);
    const [history, setHistory] = useState([]);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [articles, setArticles] = useState([]);
    const [values, setValues] = useState([]);
    const [contact, setContact] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCreateData, setIsCreateData] = useState(false);

    const fetchVision = async () => {
        const res = await axiosInstance.get('/vision');
        setVision(res.data);
    };

    const fetchHistory = async () => {
        const res = await axiosInstance.get('/history');
        setHistory(res.data);
    };

    const fetchGallery = async () => {
        const res = await axiosInstance.get('/gallery');
        setGallery(res.data);
    };

    const fetchMissions = async () => {
        const res = await axiosInstance.get('/missions');
        setMissions(res.data);
    };

    const fetchValues = async () => {
        const res = await axiosInstance.get('/values');
        setValues(res.data);
    };

    const fetchProducts = async () => {
        const res = await axiosInstance.get('/products');
        setProducts(res.data);
    };

    const fetchServices = async () => {
        const res = await axiosInstance.get('/services');
        setServices(res.data);
    };

    const fetchArticles = async () => {
        const res = await axiosInstance.get('/articles');
        setArticles(res.data);
    };

    const fetchContact = async () => {
        const res = await axiosInstance.get('/contact');
        setContact(res.data);
    };

    useEffect(() => {
        axios.all([
            axiosInstance.get('/vision'),
            axiosInstance.get('/missions'),
            axiosInstance.get('/history'),
            axiosInstance.get('/products'),
            axiosInstance.get('/services'),
            axiosInstance.get('/gallery'),
            axiosInstance.get('/articles'),
            axiosInstance.get('/values'),
            axiosInstance.get('/contact')
        ]).then(([visionRes, missionsRes, historyRes, productsRes, servicesRes, galleryRes, articlesRes, valuesRes, contactRes]) => {
            setVision(visionRes.data);
            setMissions(missionsRes.data);
            setHistory(historyRes.data);
            setProducts(productsRes.data);
            setServices(servicesRes.data);
            setGallery(galleryRes.data);
            setArticles(articlesRes.data);
            setValues(valuesRes.data);
            setContact(contactRes.data);
        }).finally(() => setIsLoaded(true));
    }, []);

    const dataMapping = {
        vision,
        missions,
        history,
        products,
        services,
        gallery,
        articles,
        values,
        contact
    };

    const formMapping = {
        vision: <VisionForm data={vision[0]} fetchVision={fetchVision} />,
        history: <HistoryForm data={history[activeData]} isCreateData={isCreateData} fetchHistory={fetchHistory} />,
        gallery: <GalleryForm data={gallery[activeData]} isCreateData={isCreateData} fetchGallery={fetchGallery} />,
        missions: <MissionsForm data={missions[activeData]} isCreateData={isCreateData} fetchMissions={fetchMissions} />,
        values: <ValuesForm data={values[activeData]} isCreateData={isCreateData} fetchValues={fetchValues} />,
        products: <ProductsForm data={products[activeData]} isCreateData={isCreateData} fetchProducts={fetchProducts} />,
        services: <ServicesForm data={services[activeData]} isCreateData={isCreateData} fetchServices={fetchServices} />,
        articles: <ArticlesForm data={articles[activeData]} isCreateData={isCreateData} fetchArticles={fetchArticles} />,
        contact: <ContactForm data={contact[0]} fetchContact={fetchContact} />
    };

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className='w-full min-h-screen md:h-screen flex flex-col md:flex-row gap-4 p-4 bg-dark-1 text-light-1 text-xs md:text-sm font-medium md:overflow-hidden wrap-break-word'>
            <div className='w-full md:flex-1 flex flex-col gap-4 bg-dark-2 rounded-2xl p-4 border border-light-1/10'>
                <select 
                    className='capitalize w-full md:w-fit' 
                    value={activeDashboard} 
                    onChange={(e) => {
                        setActiveDashboard(e.target.value);
                        setActiveData(undefined);
                        setIsCreateData(false);
                    }}
                >
                    <option className='bg-dark-3' value="vision">Visi</option>
                    <option className='bg-dark-3' value="missions">Misi</option>
                    <option className='bg-dark-3' value="history">Sejarah</option>
                    <option className='bg-dark-3' value="products">Produk</option>
                    <option className='bg-dark-3' value="services">Layanan</option>
                    <option className='bg-dark-3' value="gallery">Galeri</option>
                    <option className='bg-dark-3' value="articles">Artikel</option>
                    <option className='bg-dark-3' value="values">Nilai Perusahaan</option>
                    <option className='bg-dark-3' value="contact">Kontak</option>
                </select>
                <div className='flex flex-col gap-4 max-h-100 md:max-h-none overflow-y-auto scrollbar-thumb-stone-500 scrollbar-thin'>
                    {activeDashboard === 'contact' ? (
                        contact[0] && <OptionCard data={contact[0]} setActiveData={setActiveData} index={0} />
                    ) : (
                        dataMapping[activeDashboard].map((item, index) => (
                            <OptionCard key={item.id} data={item} setActiveData={setActiveData} index={index} />
                        ))
                    )}
                </div>
            </div>
            <div className='w-full md:flex-1 flex flex-col gap-4 bg-dark-2 rounded-2xl p-4 border border-light-1/10'>
                {activeDashboard !== 'contact' && activeDashboard !== 'vision' && (
                    <button 
                        style={{backgroundColor: `${isCreateData ? 'oklch(39.3% 0.095 152.535)' : 'oklch(42.1% 0.095 57.708)'}`}}
                        onClick={() => setIsCreateData(!isCreateData)}
                        className='p-2 rounded-2xl'
                    >
                        Toggle Tambah/Edit Data: {isCreateData ? 'Tambah' : 'Edit'}
                    </button>
                )}
                {formMapping[activeDashboard]}
            </div>
        </div>
    )
}