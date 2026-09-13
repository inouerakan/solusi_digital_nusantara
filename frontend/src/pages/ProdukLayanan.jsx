import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../components/ui/Loading';
import Produk from '../components/ProdukLayanan/Produk';
import Layanan from '../components/ProdukLayanan/Layanan';

export default function ProdukLayanan() {
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get('http://localhost:3000/api/products'),
            axios.get('http://localhost:3000/api/services'),
        ]).then(([productsRes, servicesRes]) => {
            setProducts(productsRes.data);
            setServices(servicesRes.data);
        }).finally(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className='font-medium bg-light-1'>
            <Produk products={products} />
            <Layanan services={services} />
        </div>
    )
}