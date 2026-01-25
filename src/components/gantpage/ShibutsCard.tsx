// import "@/style/components/gantpage/ShibutsCard.css";


// interface ShibutsCardProps {
//     title: string;
//     variation?: string;
//     resources?: string; // C'est déjà une string grâce au .join() du parent
//     style?: React.CSSProperties;
//     className?: string;
// }

// export default function ShibutsCard({ title, variation, resources, style, className }: ShibutsCardProps) {
//     return (
//         <div className={`shibuts-card ${className || ''}`} style={style}>
//             <div className="div-up">
//                 <span className="card-title">{title}</span>
//                 {/* On n'affiche la variation que si elle existe */}
//                 {variation && <span className="card-variation">{variation}</span>}
//             </div>
//             <div className="div-down">
//                 {/* ICI : "resources" est déjà une string. 
//                    On utilise || pour afficher un texte par défaut si c'est vide.
//                 */}
//                 {resources || "Aucune ressource"}
//             </div>
//         </div>
//     );
// }



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
}

export default function ShibutsCard({ title, variation, dateBegin, dateEnd, resources, style, className }: ShibutsCardProps) {
    dayjs.locale('he');
    const formattedBegin = dateBegin ? dayjs(dateBegin).format('D MMM') : '';
    const formattedEnd = dateEnd ? dayjs(dateEnd).format('D MMM') : '';

    return (
        <div className={`shibuts-card ${className || ''}`} style={style}>
            <div className="div-up">
                <span className="card-title">{title}</span>
                {/* On n'affiche la variation que si elle existe */}
                {variation && <span className="card-variation">{variation}</span>}
            </div>
            <div className="div-down">
                {/* Affichage des dates précises + ressources, séparées par un séparateur clair */}
                {formattedBegin && formattedEnd && <span>{formattedBegin} - {formattedEnd}</span>}
                {resources ? <span> | {resources}</span> : <span> | Aucune ressource</span>}
            </div>
        </div>
    );
}