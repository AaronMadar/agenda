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

  const options = [
    { label: `ינו' ${year} - מרץ' ${year}`, start: `${year}-01-01`, end: `${year}-03-31` },
    { label: `אפר' ${year} - יוני' ${year}`, start: `${year}-04-01`, end: `${year}-06-30` },
    { label: `יולי' ${year} - ספט' ${year}`, start: `${year}-07-01`, end: `${year}-09-30` },
    { label: `אוק' ${year} - דצמ' ${year}`, start: `${year}-10-01`, end: `${year}-12-31` },
    { label: `חצי-ראשון ${year}`, start: `${year}-01-01`, end: `${year}-06-30` },
    { label: `חצי-שני ${year}`, start: `${year}-07-01`, end: `${year}-12-31` },
    { label: `כל ${year}`, start: `${year}-01-01`, end: `${year}-12-31` },
  ];

  const handleSelect = (option: typeof options[0]) => {
    setPeriodView(option.label); 
    setStartDate(dayjs(option.start));
    setEndDate(dayjs(option.end));
    setOpen(false);
  };

  
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




// return (
//     <div className="select-container">
//       <div className="select-trigger" onClick={() => setOpen(!open)}>
//         <span className="select-text">
//           {periodView || "בחר תקופה"}
//         </span>

//         <KeyboardArrowDownIcon
//           className={`select-arrow ${open ? "arrow-up" : ""}`}
//         />
//       </div>

//       {open && (
//         <div className="select-dropdown">
//           <div className="select-dropdown-content">
//             {options.map((option, index) => (
//               <div
//                 key={index}
//                 className="select-option"
//                 onClick={() => handleSelect(option)}
//               >
//                 {option.label}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }