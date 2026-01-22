import SelectTime from '../gantpage/header/SelectTime';
import { Dayjs } from 'dayjs';
import style from "@/style/components/dashboard/DashboardHeader.module.css"


interface HeaderProps {
    setPeriodView: (value: string) => void;
    periodView: string;
    setStartDate: (date: Dayjs | null) => void;
    setEndDate: (date: Dayjs | null) => void;
}

export const DashboardHeader = ( {setPeriodView, periodView, setStartDate, setEndDate}: HeaderProps) => {
    return (
        <div className={style.containerWrapper}>
            <h2 style={{flex: 1}}>דשבורד למפקד</h2>
            <div className={style.controlsContainer}>
                <SelectTime setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
                <img src="/dashboard-image-gray.png" alt="Dashboard Image" className={style.iconImage}></img>
                <img src="/dashboard-image-blue.png" alt="Dashboard Image" className={style.iconImage}></img>
            </div>
        </div>
    );
}