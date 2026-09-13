export default function ImageCard({name, description, image_url, index, isArticle = false}) {
    return (
        <div className='relative flex-1 text-base md:text-xl flex flex-col gap-2 md:gap-4'>
            <div className='aspect-4/3 overflow-hidden'>
                <img src={image_url} alt={name} className='w-full h-full object-cover hover:scale-110 transition-all duration-200' />
            </div>
            <div className='flex justify-between'>
                <p className='text-sm text-dark-3'>{`${isArticle === false ? 'Lihat Detail' : 'Baca Selengkapnya'}`}</p>
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-dark-3'>({name})</p>
                <p>{description}</p>
            </div>
            <p className='absolute top-2 md:top-4 left-2 md:left-4 mix-blend-difference text-light-1'>{index}</p>
        </div>
    )
}