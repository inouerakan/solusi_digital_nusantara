import SectionMarker from "../ui/SectionMarker";
import PlainCard from "../ui/PlainCard";

export default function LayananUnggulan({services}) {
    return (
        <div className="w-full px-6 md:px-20 py-16 md:py-30 flex flex-col gap-8 md:gap-16">
            <SectionMarker section={'Layanan Unggulan'} />
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {services.slice(0, 3).map((item, index) => (
                        <PlainCard key={item.id} name={item.name} description={item.description} image_url={item.image_url} index={`0${index+1}`} />
                    ))}
            </div>
        </div>
    )
}