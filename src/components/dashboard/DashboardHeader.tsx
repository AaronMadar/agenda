import { useNavigate } from "react-router-dom";
import SelectTime from "../gantpage/header/SelectTime";
import style from "@/style/components/dashboard/DashboardHeader.module.css";
import { TreeDropdown } from "@/components/shared/tree-dropdown/TreeDropdown";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerWrapper}>
      <h4 style={{ flex: 1 }}>דשבורד למפקד</h4>
      <div className={style.controlsContainer}>
        <TreeDropdown />
        <SelectTime />
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
