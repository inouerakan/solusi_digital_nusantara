export default function SquareCard({label, name, description, index}) {
    return (
        <div className='flex-1 aspect-square bg-light-2 flex flex-col gap-2 md:gap-4 p-4 md:p-8'>
            <div className='flex justify-between'>
                <p>{label}</p>
                <p>{index}</p>
            </div>
            <h2 className='mt-auto text-2xl md:text-6xl'>{name}</h2>
            <div className='h-0.5 w-full bg-dark-1/10 text-dark-3' />
            <p className='text-sm md:text-lg text-dark-3'>{description}</p>
        </div>
    )
}