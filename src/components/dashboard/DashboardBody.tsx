import style from "@/style/components/dashboard/DashboardBody.module.css"
import { BaseBodyCard } from "./BaseBodyCard";
import { Reports } from "./reports/Reports";
import { BudgetResources } from "./budget-resources/BudgetResources";
import { KeyIndicators } from "./key-indicators/KeyIndicators";
import { QuantityAndCost } from "./quantity-and-cost/QuantityAndCost";


const reports = [ 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 50% פחות תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות הוקצאה 10% יותר תחמושת", 
    "גדוד 123456 באימון מפח”ט טירונות  iliuiuh oiuh oiuh oiuhjr6j6n7567n56k 46k4n67n467iu46ughu47u4h67u467uh467u467uh46u ;oh iuh oigyuho o iuhoi uh oiuh oiuh iouh oiuh oiuh oiuh oiu  oiuh oiuh הוקצאה 20% פחות הובלות", 
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

const resources = [
    {name: "תחמושת", amount: 7, percentage: -12},
    {name: "דלק", amount: 15, percentage: 8},
    {name: "חיל רגלים", amount: 3, percentage: -5},
    {name: "שריון", amount: 4, percentage: 10},
    {name: "חיל רגלים", amount: 3, percentage: -5},
    {name: "שריון", amount: 4, percentage: 10},
    {name: "תחמושת", amount: 7, percentage: -12},
    {name: "דלק", amount: 15, percentage: 8},
    {name: "חיל רגלים", amount: 3, percentage: -5},
    {name: "דלק", amount: 15, percentage: 8},
    {name: "חיל רגלים", amount: 3, percentage: -5},
    {name: "שריון", amount: 4, percentage: 10},
]

const quantityAndCost = [
    { name: "עלות אימונים", amount: 1, percentage: 29 },
    { name: "כמות אימונים", amount: 300, percentage: 29 },
    { name: "עלות הכשרות", amount: 3, percentage: -25 },
    { name: "כמות הכשרות", amount: 258, percentage: 23 },
]

export const DashboardBody = () => {
    return (
        <div className={style.bodyGrid}>
            <BaseBodyCard>
                <QuantityAndCost quantityAndCost={quantityAndCost} />
            </BaseBodyCard>
            <BaseBodyCard title="משאבים תקציב">
                <BudgetResources resources={resources} />
            </BaseBodyCard>
            <BaseBodyCard title="מדדים מרכזיים">
                <KeyIndicators />
            </BaseBodyCard>
            <BaseBodyCard title="דיווחים">
                <Reports reports={reports} />
            </BaseBodyCard>
        </div>
    );
};