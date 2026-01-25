import style from "@/style/components/dashboard/Body.module.css"
import { BaseBodyCard } from "./BaseBodyCard";
import { Reports } from "./reports/Reports";
import { BudgetResources } from "./budget-resources/BudgetResources";
import { KeyIndicators } from "./key-indicators/KeyIndicators";
import { QuantityAndCost } from "./quantity-and-cost/QuantityAndCost";


const reports = [ 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 50% פחות תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 10% יותר תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 20% פחות הובלות", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 15% פחות הכשרות",
    "גדוד 123456 באימון מפח”ט 3124 טירונות הוקצאה 50% פחות תחמושת",
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 50% פחות תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 10% יותר תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 20% פחות הובלות", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 15% פחות הכשרות",
    "גדוד 123456 באימון מפח”ט 3124 טירונות הוקצאה 50% פחות תחמושת",
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 50% פחות תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 10% יותר תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 20% פחות הובלות", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 15% פחות הכשרות",
    "גדוד 123456 באימון מפח”ט 3124 טירונות הוקצאה 50% פחות תחמושת",
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 50% פחות תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 10% יותר תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 20% פחות הובלות", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 15% פחות הכשרות",
    "גדוד 123456 באימון מפח”ט 3124 טירונות הוקצאה 50% פחות תחמושת",
];


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
                        <Reports reports={reports} />
                    </BaseBodyCard>
            </div>
        </div>
    );
};