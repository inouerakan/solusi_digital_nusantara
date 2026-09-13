import SectionMarker from '../ui/SectionMarker';
import SquareCard from '../ui/SquareCard';
import { motion } from 'motion/react';

export default function NilaiPerusahaan({values}) {
    return (
        <div className='w-full flex flex-col gap-8 md:gap-32 py-16 md:py-30 overflow-hidden'>
            <div className='px-6 md:px-20 flex flex-col gap-16'>
                <SectionMarker section={'Nilai Unggulan'} />
                <h2 className='text-4xl md:text-7xl w-2/3 md:w-1/2 leading-[1.1]'>Nilai yang kami pegang dalam setiap langkah.</h2>
            </div>
            <div className='w-full -rotate-9 mb-16 md:mb-32'>
                <motion.div
                className='flex w-max'
                animate={{x: '-50%'}}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 16
                }}>
                    <div className='flex'>
                        {values.map((item, index) => (
                            <div className='mr-4 md:mr-8 aspect-square w-56 md:w-124 rotate-9'>
                                <SquareCard label={'Nilai'} name={item.name} description={item.description} index={`0${index+1}`} />
                            </div>
                        ))}
                    </div>
                    <div className='flex'>
                        {values.map((item, index) => (
                            <div className='mr-4 md:mr-8 aspect-square w-56 md:w-124 rotate-9'>
                                <SquareCard label={'Nilai'} name={item.name} description={item.description} index={`0${index+1}`} />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}