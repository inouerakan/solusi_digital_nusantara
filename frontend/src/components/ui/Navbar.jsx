import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div>
            <div className='fixed w-full px-20 py-6 hidden md:flex justify-between text-xl font-medium z-99 bg-light-1 border-b border-dark-1/25 shadow-md'>
                <p>Solusi Digital Nusantara</p>
                <div className='flex gap-8'>
                    <NavLink to={'/'}>Beranda</NavLink>
                    <NavLink to={'/profil'}>Profil</NavLink>
                    <NavLink to={'/produklayanan'}>Produk & Layanan</NavLink>
                    <NavLink to={'/artikel'}>Artikel</NavLink>
                    <NavLink to={'/gallery'}>Gallery</NavLink>
                    <NavLink to={'/contact'}>Contact</NavLink>
                </div>
            </div>
            <div className='fixed md:hidden flex justify-between items-center px-6 text-xl font-medium py-4 bg-light-1 w-full z-99'>
                <p>Solusi Digital Nusantara</p>
                <RxHamburgerMenu onClick={() => setMobileOpen(true)} />
            </div>
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div 
                    className='md:hidden fixed w-full h-screen bg-dark-1 z-100 text-light-1 px-6'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>
                        <div className='absolute left-0 top-0 px-6 flex justify-between items-center text-light-1 text-xl font-medium py-4 w-full'>
                            <p>Solusi Digital Nusantara</p>
                            <IoMdClose onClick={() => setMobileOpen(false)} />
                        </div>
                        <motion.div 
                        className='h-full flex flex-col items-center justify-center gap-4 text-4xl'
                        initial={{y: 20}}
                        animate={{y: 0}}
                        exit={{y: -20}}>
                            <NavLink to={'/'} onClick={() => setMobileOpen(false)}>Beranda</NavLink>
                            <NavLink to={'/profil'} onClick={() => setMobileOpen(false)}>Profil</NavLink>
                            <NavLink to={'/produklayanan'} onClick={() => setMobileOpen(false)}>Produk & Layanan</NavLink>
                            <NavLink to={'/artikel'} onClick={() => setMobileOpen(false)}>Artikel</NavLink>
                            <NavLink to={'/gallery'} onClick={() => setMobileOpen(false)}>Gallery</NavLink>
                            <NavLink to={'/contact'} onClick={() => setMobileOpen(false)}>Contact</NavLink>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}