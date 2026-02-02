import { useNavigate } from "react-router-dom";
import style from "@/style/components/dashboard/DashboardHeader.module.css";
import { ControlsPanel } from "../shared/ControlsPanel";


export const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerWrapper}>
      <h4 style={{ flex: 1 }}>דשבורד למפקד</h4>

      <ControlsPanel />

      <div className={style.imgsContainer}>
        <img
          src="/dashboard-image-gray.png"
          alt="Dashboard Image"
          className={style.iconImage}
          onClick={() => navigate("/")}
        />
        <img
          src="/dashboard-image-blue.png"
          alt="Dashboard Image"
          className={style.iconImage}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};
