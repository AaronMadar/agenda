import style from "@/style/components/dashboard/budget-resources/ResourceCard.module.css"
import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";


interface ResourceCardProps {
    resource: {
        name: string;
        amount: number;
        percentage: number;
    }
}

export const ResourceCard = ( { resource }: ResourceCardProps) => {
    return(
        <div className={style.containerWrapper}>
            <h4>{resource.name}</h4>
            <div className={style.details}>
                <div className={style.amount}>{resource.amount}M</div>
                <PercentageWithArrow value={resource.percentage}/>
            </div>
        </div>
    )
}