import style from "@/style/components/dashboard/Body.module.css"
import { BaseBodyCard } from "./BaseBodyCard";
import { Reports } from "./reports/Reports";
import { BudgetResources } from "./budget-resources/BudgetResources";
import { KeyIndicators } from "./key-indicators/KeyIndicators";
import { QuantityAndCost } from "./quantity-and-cost/QuantityAndCost";


export const DashboardBody = () => {
    return (
        <div className={style.containerWrapper}>
            <div className={style.grid}>
                    <BaseBodyCard>
                        <QuantityAndCost />
                    </BaseBodyCard>
                    <BaseBodyCard title="משאבים תקציב">
                        <BudgetResources />
                    </BaseBodyCard>
                    <BaseBodyCard title="מדדים מרכזיים">
                        <KeyIndicators />
                    </BaseBodyCard>
                    <BaseBodyCard title="דיווחים">
                        <Reports />
                    </BaseBodyCard>
            </div>
        </div>
    );
};