import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardBody } from "@/components/dashboard/DashboardBody";


export const Dashboard = () => {
    const style: React.CSSProperties = {
        background: "radial-gradient(circle,rgba(46, 53, 66, 1) 0%, rgba(25, 28, 28, 1) 64%)",
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
    };
    
    return (
        <div style={style}>
            <DashboardHeader />
            <DashboardBody />
        </div>
    );
}