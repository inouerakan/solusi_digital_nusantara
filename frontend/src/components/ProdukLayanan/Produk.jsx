import SectionMarker from '../ui/SectionMarker';
import ImageCard from '../ui/ImageCard';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from "react-icons/io5";

export default function Layanan({products}) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [openProduct, setOpenProduct] = useState(null);

    return (
        <div className='w-full px-6 md:px-20 py-16 md:py-30 flex flex-col items-center gap-8 md:gap-16'>
            <AnimatePresence>
                {isDetailOpen && (
                    <motion.div 
                    className='w-screen h-screen flex justify-center items-center backdrop-blur-sm fixed left-0 top-0 bg-light-1/60 z-10 px-6 md:px-20 py-16 md:py-30'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>
                        <motion.div 
                        className='md:aspect-video relative w-full h-full flex flex-col md:flex-row justify-between gap-4 md:gap-8 md:w-3/5 text-light-1 bg-dark-1 p-4 md:p-6'
                        initial={{y: '25%'}}
                        animate={{y: 0}}
                        exit={{y: '25%'}}>
                            <div className='flex flex-col md:flex-1 gap-2 md:gap-4 text-sm md:text-base text-light-3'>
                                <img src={products[openProduct].image_url} alt={products[openProduct].name} className='w-full aspect-video object-cover order-2 md:order-1' />
                                <p className='order-3 md:order-2'>{products[openProduct].name}</p>
                                <p className='order-4 md:order-3'>{products[openProduct].description}</p>
                                <IoClose className='top-5 right-5 md:bottom-5 md:left-5 absolute mix-blend-difference md:mix-blend-normal md:block mt-auto text-light-1 text-2xl order-1 md:order-4' onClick={() => setIsDetailOpen(false)} />
                            </div>
                            <h2 className='min-h-0 md:flex-1 text-base md:text-xl leading-normal h-full overflow-y-auto scrollbar-thin scrollbar-thumb-light-1 scrollbar-track-transparent'>{products[openProduct].content}</h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className='self-start'>
                <SectionMarker section={'Produk Kami'} />
            </div>
            <h2 className='text-xl md:text-4xl leading-normal md:leading-[1.1] md:w-4/7 md:mb-16'><span className='md:mr-40'></span>Setiap produk yang kami kembangkan lahir dari pemahaman mendalam terhadap tantangan nyata dunia usaha, mulai dari mengelola toko online, sumber daya manusia, hingga mengambil keputusan berbasis data secara akurat.</h2>
            <div className='grid grid-cols-2 md:flex flex-wrap justify-center gap-4 md:gap-6'>
                {products.map((item, index) => (
                    <div key={item.id} className='md:w-[calc(20%-1.2rem)] cursor-pointer' onClick={() => {setIsDetailOpen(true); setOpenProduct(index) }}>
                        <ImageCard name={item.name} description={item.description} image_url={item.image_url} index={`0${index+1}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}