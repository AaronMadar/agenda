import style from "@/style/components/dashboard/budget-resources/BudgetResources.module.css"
import { ResourceCard } from "./ResourceCard"


interface BudgetResourcesProps {
    resources?: {
        name: string;
        amount: number;
        percentage: number;
    }[];
}

export const BudgetResources = ({ resources }: BudgetResourcesProps) => {
    return(
        <div className={style.containerWrapper}>
            <div className={style.grid}>
                {resources?.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                ))}
            </div>
        </div>
    )
}