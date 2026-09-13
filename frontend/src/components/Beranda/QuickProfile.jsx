import SectionMarker from "../ui/SectionMarker";
import building from '/images/building.jpg';

export default function QuickProfile() {
    return (
        <div className="w-full border-y border-dark-1/25 flex flex-col justify-center items-start gap-8 md:gap-16 px-6 md:px-20 py-16 md:py-30">
            <SectionMarker section={'Tentang Perusahaan'} />
            <div className='flex flex-col md:flex-row gap-8 md:gap-14'>
                <img src={building} alt='Building' className='aspect-square h-80 md:h-80 object-cover object-center' />
                <div className='flex flex-col gap-6'>
                    <h1 className="text-xl md:text-5xl leading-[1.2] text-justify">Didirikan 2020, kami memberdayakan bisnis Indonesia dengan platform digital mudah diakses, konsultasi transformasi, dan layanan IT managed — menjadikan teknologi enabler pertumbuhan, bukan hambatan.</h1>
                    <h1 className="text-xl md:text-5xl leading-[1.2] text-justify">Dengan tim ahli yang berpengalaman, kami menghadirkan solusi end-to-end yang inovatif, terintegrasi, dan berdampak nyata bagi operasional serta daya saing bisnis Anda di era digital.</h1>
                </div>
            </div>
        </div>
    )
}