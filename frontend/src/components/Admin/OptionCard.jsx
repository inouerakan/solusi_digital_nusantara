export default function OptionCard({data, setActiveData, index}) {
    const title = data.title ?? data.name ?? data.statement ?? data.address;
    const subtitle = data.description ?? data.summary ?? data.phone_number;

    return (
        <button className='w-full bg-dark-2 hover:brightness-130 rounded-xl border border-light-1/10 flex justify-between items-center gap-6 p-4 cursor-pointer' onClick={() => setActiveData(index)}>
            <div className='flex flex-col items-start text-left gap-1'>
                <p>{title}</p>
                <p className='text-light-3'>{subtitle}</p>
            </div>
            <p>{data.updated_at ?? data.date}</p>
        </button>
    )
}