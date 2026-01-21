import "@/style/components/gantpage/ShibutsCard.css";


interface ShibutsCardProps {
    title: string;
    variation?: string;
    resources?: string; // C'est déjà une string grâce au .join() du parent
    style?: React.CSSProperties;
    className?: string;
}

export default function ShibutsCard({ title, variation, resources, style, className }: ShibutsCardProps) {
    return (
        <div className={`shibuts-card ${className || ''}`} style={style}>
            <div className="div-up">
                <span className="card-title">{title}</span>
                {/* On n'affiche la variation que si elle existe */}
                {variation && <span className="card-variation">{variation}</span>}
            </div>
            <div className="div-down">
                {/* ICI : "resources" est déjà une string. 
                   On utilise || pour afficher un texte par défaut si c'est vide.
                */}
                {resources || "Aucune ressource"}
            </div>
        </div>
    );
}



