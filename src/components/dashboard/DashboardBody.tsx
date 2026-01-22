import style from "@/style/components/dashboard/Body.module.css"
import { BaseBodyCard } from "./BaseBodyCard";


export const DashboardBody = () => {
    return (
        <div className={style.containerWrapper}>
            <div className={style.grid}>
                    <BaseBodyCard>
                        <p>Body Component</p>
                    </BaseBodyCard>
                    <BaseBodyCard title="משאבים תקציב">
                        <p>Body Component</p>
                    </BaseBodyCard>
                    <BaseBodyCard title="מדדים מרכזיים">
                        <p>Body Component</p>
                    </BaseBodyCard>
                    <BaseBodyCard title="דיווחים">
                        <p>Body Component</p>
                    </BaseBodyCard>
            </div>
        </div>
    );
};