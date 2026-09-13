export default function SectionMarker({section}) {
    return (
        <div className="flex items-center gap-8">
            <div className="h-0.5 w-20 bg-dark-1" />
            <p className="text-xl">{section}</p>
        </div>
    )
}