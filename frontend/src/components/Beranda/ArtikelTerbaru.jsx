import SectionMarker from "../ui/SectionMarker";
import HorizontalCard from "../ui/HorizontalCard";
import { Link } from 'react-router-dom';

export default function ArtikelTerbaru({articles}) {
    return (
        <div className="w-full px-6 md:px-20 py-16 md:py-30 flex flex-col gap-8 md:gap-16 border-y border-dark-1/25">
            <SectionMarker section={'Artikel Terbaru'} />
            <div className="flex flex-col">
                {articles.slice(0, 3).map((item) => (
                    <Link to={`/artikel/${item.id}`}>
                        <HorizontalCard key={item.id} title={item.title} summary={item.summary} date={item.date} />
                    </Link>
                ))}
            </div>
        </div>
    )
}