import { useNavigate } from "react-router-dom";
import style from "@/style/components/dashboard/DashboardHeader.module.css";
import { ControlsPanel } from "../shared/ControlsPanel";
// import { KeyValPopUp } from "../shared/pop-ups/KeyValPopUp"
// import { ResourcePopUp } from "../shared/pop-ups/ResourcePopUp";

// const keyValues = [
//     { key: "קוד שיבוץ", value: "12345678" },
//     { key: "יחידה", value: "מפקדת חטיבה 84" },
//     { key: "משימה", value: "קורס מ”כים חי”ר"},
//     { key: "עלות ישיר", value: "10000"},
//     { key: "עלות פריטי", value: "1200"},
// ]

// const resourceDetailsTable = [
//             { "item": "כד’ 5.56 מ”מ לאימונים", "quantity": 1200, "price": 1.5 },
//             { "item": "כד’ 5.56 מ”מ", "quantity": 300, "price": 5 },
//             { "item": "רימון יד מס’ 4", "quantity": 500, "price": 2 },
//             { "item": "רימון יד מס’ 20", "quantity": 200, "price": 3 }
//           ]


export const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerWrapper}>
      <h4 style={{ flex: 1 }}>דשבורד למפקד</h4>

      {/* <KeyValPopUp header="תרג”ד חי”ר סדיר" keyValues={keyValues} /> */}
      {/* <ResourcePopUp resourceDetailsTable={resourceDetailsTable} /> */}

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
