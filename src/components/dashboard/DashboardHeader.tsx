import SelectTime from '../gantpage/header/SelectTime';
import style from "@/style/components/dashboard/DashboardHeader.module.css"


export const DashboardHeader = () => {
    return (
        <div className={style.containerWrapper}>
            <h2 style={{flex: 1}}>דשבורד למפקד</h2>
            <div className={style.controlsContainer}>
                <SelectTime />
                <img src="/dashboard-image-gray.png" alt="Dashboard Image" className={style.iconImage}></img>
                <img src="/dashboard-image-blue.png" alt="Dashboard Image" className={style.iconImage}></img>
            </div>
        </div>
    );
}