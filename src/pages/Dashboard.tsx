import { useDateRange } from "@/contexts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Body } from "@/components/dashboard/Body";


export const Dashboard = () => {
  const {
    startDate,
    endDate,
    periodView,
    setStartDate,
    setEndDate,
    setPeriodView,
  } = useDateRange();


    return (
        <div style={{backgroundColor: "#232525cc", minHeight: "100vh", color: "white"}}>
            <DashboardHeader setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Body />
        </div>
    );
}