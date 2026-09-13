import wallpaper from "/images/wallpaper.jpg";

export default function Hero() {
    return (
        <div className="relative w-full h-screen bg-cover bg-center flex flex-col gap-4 md:gap-0 justify-center text-light-1">
            <img src={wallpaper} alt="background" className='absolute inset-0 object-center object-cover w-full h-full z-99' />
            <h1 className='self-center text-4xl md:text-[12rem]/[1.1] md:absolute left-8 top-0 z-100'>Solusi</h1>
            <p className='self-center text-center text-sm md:text-base w-2/3 md:w-1/3 z-100'>Kami membantu UMKM dan enterprise Indonesia melakukan transformasi digital secara menyeluruh — dari strategi, pengembangan platform, hingga implementasi teknologi terkini seperti AI, cloud computing, dan data analytics.</p>
            <h1 className='self-center text-end text-4xl md:text-[8rem]/[1.3] md:absolute right-8 bottom-0 z-100'>Digital Nusantara</h1>
        </div>
    )
}