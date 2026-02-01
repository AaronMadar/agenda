// import { useState } from "react";
// import { useDateRange } from "@/contexts/DateRangeContext";
// import dayjs, { Dayjs } from "dayjs";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import "@/style/components/gantpage/header/SelectTime.css";

// export function SelectTime() {
//   const year = new Date().getFullYear();
//   const [open, setOpen] = useState(false);

//   const {
//     periodView,
//     setStartDate,
//     setEndDate,
//     setPeriodView,
//   } = useDateRange();

//   const periodLabels: { [key: string]: string } = {
//     "רבעון1": `ינו' ${year} - מרץ' ${year}`,
//     "רבעון2": `אפר' ${year} - יוני' ${year}`,
//     "רבעון3": `יולי' ${year} - ספט' ${year}`,
//     "רבעון4": `אוק' ${year} - דצמ' ${year}`,
//     "חצי-שנה1": `חצי-ראשון ${year}`,
//     "חצי-שנה2": `חצי-שני ${year}`,
//     "שנה": `כל ${year}`,
//   };

//   const displayText = periodLabels[periodView] || periodView || "בחר תקופה";

//   const handleSelect = (mode: string) => {
//     let start: Dayjs | null = null;
//     let end: Dayjs | null = null;

//     switch (mode) {
//       case "רבעון1":
//         start = dayjs(`${year}-01-01`);
//         end = dayjs(`${year}-03-31`);
//         break;
//       case "רבעון2":
//         start = dayjs(`${year}-04-01`);
//         end = dayjs(`${year}-06-30`);
//         break;
//       case "רבעון3":
//         start = dayjs(`${year}-07-01`);
//         end = dayjs(`${year}-09-30`);
//         break;
//       case "רבעון4":
//         start = dayjs(`${year}-10-01`);
//         end = dayjs(`${year}-12-31`);
//         break;
//       case "חצי-שנה1":
//         start = dayjs(`${year}-01-01`);
//         end = dayjs(`${year}-06-30`);
//         break;
//       case "חצי-שנה2":
//         start = dayjs(`${year}-07-01`);
//         end = dayjs(`${year}-12-31`);
//         break;
//       case "שנה":
//         start = dayjs(`${year}-01-01`);
//         end = dayjs(`${year}-12-31`);
//         break;
//       default:
//         // For custom periods, don't override dates (assume they are set elsewhere)
//         break;
//     }

//     setPeriodView(mode);
//     setOpen(false);
//     if (start && end) {
//       setStartDate(start);
//       setEndDate(end);
//     }
//   };

//   return (
//     <div className="select-container">
//       <div
//         className="select-trigger"
//         onClick={() => setOpen(!open)}
        
//       >
//         <span className="select-text">
//           {displayText}
//         </span>

//         <KeyboardArrowDownIcon
//           className={`select-arrow ${open ? "arrow-up" : ""}`}
//         />
//       </div>

//       {open && (
//         <div className="select-dropdown">
//           <div className="select-dropdown-content">

//             {periodView &&
//               !periodView.startsWith("רבעון") &&
//               !periodView.startsWith("חצי") &&
//               periodView !== "שנה" && (
//                 <div
//                   className="select-option"
//                   onClick={() => handleSelect(periodView)}
//                 >
//                   {periodView}
//                 </div>
//               )}

//             <div className="select-option" onClick={() => handleSelect("רבעון1")}>
//               {periodLabels["רבעון1"]}
//             </div>
//             <div className="select-option" onClick={() => handleSelect("רבעון2")}>
//               {periodLabels["רבעון2"]}
//             </div>
//             <div className="select-option" onClick={() => handleSelect("רבעון3")}>
//               {periodLabels["רבעון3"]}
//             </div>
//             <div className="select-option" onClick={() => handleSelect("רבעון4")}>
//               {periodLabels["רבעון4"]}
//             </div>
//             <div className="select-option" onClick={() => handleSelect("חצי-שנה1")}>
//               {periodLabels["חצי-שנה1"]}
//             </div>
//             <div className="select-option" onClick={() => handleSelect("חצי-שנה2")}>
//               {periodLabels["חצי-שנה2"]}
//             </div>
//             <div className="select-option" onClick={() => handleSelect("שנה")}>
//               {periodLabels["שנה"]}
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

























import { useMemo } from "react";
import { useDateRange } from "@/contexts/DateRangeContext";
import dayjs, { Dayjs } from "dayjs";
import { Select } from "@/components/shared/Select";

export function SelectTime() {
  const year = new Date().getFullYear();

  const {
    periodView,
    setStartDate,
    setEndDate,
    setPeriodView,
  } = useDateRange();

  const periodLabels: Record<string, string> = {
    "רבעון1": `ינו' ${year} - מרץ' ${year}`,
    "רבעון2": `אפר' ${year} - יוני' ${year}`,
    "רבעון3": `יולי' ${year} - ספט' ${year}`,
    "רבעון4": `אוק' ${year} - דצמ' ${year}`,
    "חצי-שנה1": `חצי-ראשון ${year}`,
    "חצי-שנה2": `חצי-שני ${year}`,
    "שנה": `כל ${year}`,
  };

  const periodOptions = [
    "01/01-31/03",
    "01/04-30/06",
    "01/07-30/09",
    "01/10-31/12",
    "01/01-30/06",
    "01/07-31/12",
    "01/01-31/12",
  ]

  const periodOptionsString = [
    "רבעון ראשון",
    "רבעון שני",
    "רבעון שלישי",
    "רבעון רביעי",
    "חצי-שנה1",
    "חצי-שנה2",
    "שנה",
  ]

  const options = useMemo(
    () => Object.values(periodLabels),
    [year]
  );

  const handleSelect = (mode: string) => {
    let start: Dayjs | null = null;
    let end: Dayjs | null = null;

    switch (mode) {
      case "רבעון1":
        start = dayjs(`${year}-01-01`);
        end = dayjs(`${year}-03-31`);
        break;
      case "רבעון2":
        start = dayjs(`${year}-04-01`);
        end = dayjs(`${year}-06-30`);
        break;
      case "רבעון3":
        start = dayjs(`${year}-07-01`);
        end = dayjs(`${year}-09-30`);
        break;
      case "רבעון4":
        start = dayjs(`${year}-10-01`);
        end = dayjs(`${year}-12-31`);
        break;
      case "חצי-שנה1":
        start = dayjs(`${year}-01-01`);
        end = dayjs(`${year}-06-30`);
        break;
      case "חצי-שנה2":
        start = dayjs(`${year}-07-01`);
        end = dayjs(`${year}-12-31`);
        break;
      case "שנה":
        start = dayjs(`${year}-01-01`);
        end = dayjs(`${year}-12-31`);
        break;
      default:
        break;
    }

    setPeriodView(mode);

    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <Select
      label="תקופה"
      options={periodOptionsString}
      value={periodView}
      placeholder="בחר תקופה"
      onChange={handleSelect}
    />
  );
}
