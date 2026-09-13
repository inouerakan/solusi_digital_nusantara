import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaAngleRight } from "react-icons/fa";

export default function PlainCard({name, description, image_url = null, index}) {
    const [imageShow, setImageShow] = useState(false);

    return (
        <div className="relative overflow-hidden aspect-video flex-1 flex flex-col justify-between p-6 bg-light-2">
            <AnimatePresence mode='wait'>
                {image_url != null && imageShow && (
                    <motion.img
                        src={image_url}
                        alt="Layanan"
                        className="absolute w-full h-full top-0 left-0 object-cover z-2"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.125 }}
                        onClick={() => setImageShow(!imageShow)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {image_url != null && imageShow && (
                    <motion.div
                        className="absolute w-full h-full top-0 left-0 object-cover bg-dark-3 z-1"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        onClick={() => setImageShow(!imageShow)}
                    />
                )}
            </AnimatePresence>
            <div className="flex flex-col gap-2">
                <p className="text-base md:text-xl text-dark-3">({name})</p>
                <h2 className="text-base md:text-xl text-dark-1">{description}</h2>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-base md:text-xl">{index}</p>
                {image_url != null && (
                    <button className="text-sm text-dark-2 flex items-center gap-2 hover:opacity-50" onClick={() => setImageShow(!imageShow)}>Lihat Gambar <FaAngleRight /></button>
                )}
            </div>
        </div>
    )
}