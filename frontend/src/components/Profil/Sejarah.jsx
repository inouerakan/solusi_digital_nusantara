import SectionMarker from '../ui/SectionMarker';
import { useState } from 'react';
import building from '/images/building.jpg'

export default function Sejarah({history}) {
    const [activeYear, setActiveYear] = useState(0);

    return (
        <div className='w-full px-6 md:px-20 py-16 md:py-30 flex flex-col gap-8 md:gap-16'>
            <SectionMarker section={'Sejarah'} />
            <div className='flex flex-col md:flex-row gap-8'>
                <h2 className='text-xl md:text-4xl flex-1 order-2 md:order-1'>Dari startup lokal di 2020 hingga pemain regional di 2026. Kami tidak hanya menyaksikan perubahan era digital, kami yang menciptakannya bersama klien-klien terbaik Indonesia.</h2>
                <img src={building} alt="Bulding" className='flex-1 object-center object-cover order-1 md:order-2' />
            </div>
            <div className='flex gap-8'>
                <div className='md:flex-1 flex flex-col gap-4'>
                    {history.map((item, index) => (
                        <div className='flex gap-4 items-center' onMouseEnter={() => setActiveYear(index)} onClick={() => setActiveYear(index)}>
                            <h2 style={{color: `${item.id === history[activeYear].id ? 'oklch(14.1% 0.005 285.823)' : 'oklch(50% 0.013 285.805)'}`}} className='text-4xl'>{item.year}</h2>
                            {item.id === history[activeYear].id && (
                                <>
                                    <div className='hidden md:block h-0.5 w-20 rounded-2xl bg-light-3' />
                                    <p className='hidden md:block text-lg'>{item.title}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <p className='block md:hidden text-base text-dark-3'>({history[activeYear].title})</p>
                    <p className='text-base md:text-xl leading-[1.3]'>{history[activeYear]?.description}</p>
                </div>
            </div>
        </div>
    )
}