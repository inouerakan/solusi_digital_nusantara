import SectionMarker from '../ui/SectionMarker'
import PlainCard from '../ui/PlainCard'

export default function VisiMisi({vision, missions}) {
    return (
        <div className='w-full px-6 md:px-20 py-16 md:py-30 flex flex-col items-center gap-8 md:gap-16 border-y border-dark-1/25'>
            <div className='self-start'>
                <SectionMarker section={'Visi dan Misi'} />
            </div>
            <div className='flex flex-col gap-4 items-center'>
                <p className='text-dark-3 text-base'>({vision[0].statement})</p>
                <h1 className='text-2xl md:text-4xl md:w-4/7 md:mb-16 text-center'>{vision[0].description}</h1>
            </div>
            <div className='grid grid-cols-3 md:flex-row gap-4 md:gap-8'>
                {missions.map((item, index) => (
                    <PlainCard key={item.id} name={item.title} description={item.description} index={`0${index+1}`} />
                ))}
            </div>
        </div>
    )
}