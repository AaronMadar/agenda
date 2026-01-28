import { useEffect, useState } from "react";
import style from "@/style/components/dashboard/DashboardBody.module.css"
import { BaseBodyCard } from "./BaseBodyCard";
import { Reports } from "./reports/Reports";
import { BudgetResources } from "./budget-resources/BudgetResources";
import { KeyIndicators } from "./key-indicators/KeyIndicators";
import { QuantityAndCost } from "./quantity-and-cost/QuantityAndCost";


type dataResponseType = {
    quantityAndCost: {
        name: string;
        amount: number;
        percentage: number;
    }[];
    resources: {
        name: string;
        amount: number;
        percentage: number;
    }[];
    reports: string[];
}

export const DashboardBody = () => {
    const [data, setData] = useState<dataResponseType | null>(null);

    useEffect(() => {
        fetch('/public/dashboardSummary.json')
            .then(res => res.json())
            .then(data => {
            setData(data);
            });
    }, []);

    return (
        <div className={style.bodyGrid}>
            <BaseBodyCard>
                <QuantityAndCost quantityAndCost={data?.quantityAndCost} />
            </BaseBodyCard>
            <BaseBodyCard title="משאבים תקציב">
                <BudgetResources resources={data?.resources} />
            </BaseBodyCard>
            <BaseBodyCard title="מדדים מרכזיים">
                <KeyIndicators />
            </BaseBodyCard>
            <BaseBodyCard title="דיווחים">
                <Reports reports={data?.reports} />
            </BaseBodyCard>
        </div>
    );
};