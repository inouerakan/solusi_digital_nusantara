import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export default function Footer({contact}) {
    return (
        <div className='px-6 md:px-20 py-6 md:py-10 bg-dark-1 flex flex-col gap-8 md:gap-14 text-light-1 text-sm'>
            <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-between'>
                <p>{contact.address}</p>
                <p>{contact.phone_number}</p>
                <p>{contact.email}</p>
            </div>
            <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-between'>
                <div className='flex flex-col items-start'>
                    <p className='flex items-center gap-2'><FaInstagram />{contact.instagram}</p>
                    <p className='flex items-center gap-2'><FaYoutube />{contact.youtube}</p>
                    <p className='flex items-center gap-2'><AiFillTikTok />{contact.tiktok}</p>
                </div>
                <h2 className='text-6xl'>Solusi Digital Nusantara</h2>
            </div>
            <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-between text-sm text-light-2'>
                <p>© 2026 Digital Solusi Nusantara — All right reserved</p>
                <p>Built by Rakan Shaka Raufa</p>
            </div>
        </div>
    )
}