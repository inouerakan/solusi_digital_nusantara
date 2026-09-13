export default function HorizontalCard({title, summary, date}) {
    const onlyDate = date.split("T")[0];

    return (
        <div className="w-full p-4 md:p-8 flex border-y border-dark-1/10 gap-6 md:gap-16 text-sm md:text-2xl font-bold hover:bg-light-2 transition-all duration-200">
            <h2 className="w-1/3 md:w-1/6 self-center">{onlyDate}</h2>
            <h2 className="w-1/3 md:w-1/4">{title}</h2>
            <p className="font-normal w-1/3 md:w-fit md:flex-1">{summary}</p>
        </div>
    )
}