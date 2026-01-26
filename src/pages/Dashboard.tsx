import { useDateRange } from "@/contexts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardBody } from "@/components/dashboard/DashboardBody";


export const Dashboard = () => {
    const style: React.CSSProperties = {
    backgroundColor: "#050606cc",
    minHeight: "100vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    };

    const {
        startDate,
        endDate,
        periodView,
        setStartDate,
        setEndDate,
        setPeriodView,
    } = useDateRange();


    return (
        <div style={style}>
            <DashboardHeader setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            <DashboardBody />
        </div>
    );
}