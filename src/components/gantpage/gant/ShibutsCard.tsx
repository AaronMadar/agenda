import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import "@/style/components/gantpage/ShibutsCard.css";
import dayjs from 'dayjs';
import 'dayjs/locale/he';


interface ShibutsCardProps {
    title: string;
    variation?: string;
    dateBegin?: string;
    dateEnd?: string;
    resources?: string; // C'est déjà une string grâce au .join() du parent
    style?: React.CSSProperties;
    className?: string;
    icon?:string

}

export default function ShibutsCard({ title, variation, dateBegin, dateEnd, resources, style, className, icon }: ShibutsCardProps) {
    dayjs.locale('he');
    const formattedBegin = dateBegin ? `${dayjs(dateBegin).format('D MMM')}\`` : '';
    const formattedEnd = dateEnd ? `${dayjs(dateEnd).format('D MMM')}\`` : '';

    return (
        <div className={`shibuts-card ${className || ''}`} style={style}>
            <div className="div-up">
                <div className="iconAndTitle">
                <i className={`icon-card ${icon}`}></i>
                <span className="card-title">{title}</span>
                </div>
              
                {/* {variation && <span className="card-variation">{variation}</span>} */}
                <PercentageWithArrow value={variation ? parseFloat(variation) : 0} gantMode/>
            </div>
            <div className="div-down">
                {/* Affichage des dates précises + ressources, séparées par un séparateur clair */}
                {formattedBegin && formattedEnd && <span className="spanDate">{formattedBegin} - {formattedEnd}</span>}
                {resources ? <span> | {resources}</span> : <span> | Aucune ressource</span>}
            </div>
        </div>
    );
}



