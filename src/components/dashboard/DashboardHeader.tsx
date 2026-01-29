import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {SelectTime} from "../gantpage/header/SelectTime";
import style from "@/style/components/dashboard/DashboardHeader.module.css";
import { TreeDropdown } from "@/components/shared/tree-dropdown/TreeDropdown";
import { PopoverTime } from "../gantpage/header/PopoverTime"

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget); // event.currentTarget is the element that was clicked
  };


  return (
    <div className={style.containerWrapper}>
      <h4 style={{ flex: 1 }}>דשבורד למפקד</h4>
      <div className={style.controlsContainer}>
        <i className="bi bi-calendar-date header-icon" onClick={handleOpenPopover} />
        <PopoverTime anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
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
