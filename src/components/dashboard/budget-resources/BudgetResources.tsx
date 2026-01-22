import style from "@/style/components/dashboard/budget-resources/BudgetResources.module.css"
import { ResourceCard } from "./ResourceCard"


export const BudgetResources = () => {
    return(
        <div className={style.containerWrapper}>
            <div className={style.grid}>
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
            </div>
        </div>
    )
}