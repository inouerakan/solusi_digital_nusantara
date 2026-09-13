import Sejarah from '../components/Profil/Sejarah';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/ui/Loading';
import VisiMisi from '../components/Profil/VisiMisi';
import NilaiPerusahaan from '../components/Profil/NilaiPerusahaan';

export default function Profil() {
    const [history, setHistory] = useState([]);
    const [vision, setVision] = useState([]);
    const [missions, setMissions] = useState([]);
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get('http://localhost:3000/api/history'),
            axios.get('http://localhost:3000/api/vision'),
            axios.get('http://localhost:3000/api/missions'),
            axios.get('http://localhost:3000/api/values')
        ]).then(([historyRes, visionRes, missionsRes, valuesRes]) => {
            setHistory(historyRes.data);
            setVision(visionRes.data);
            setMissions(missionsRes.data);
            setValues(valuesRes.data);
        }).finally(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className='font-medium bg-light-1'>
            <Sejarah history={history} />
            <VisiMisi vision={vision} missions={missions} />
            <NilaiPerusahaan values={values} />
        </div>
    )
}