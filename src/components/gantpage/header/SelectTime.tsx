import { useState } from "react";
import { useDateRange } from "@/contexts/DateRangeContext";
import dayjs, { Dayjs } from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; //TODO remplace this icon by bootstrap icon

import "@/style/components/gantpage/header/SelectTime.css";

export function SelectTime() {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);

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

  return (
    <div className="select-container">
      <div className="select-trigger" onClick={() => setOpen(!open)}>
        <span className="select-text">
          {periodView || "בחר תקופה"}
        </span>

        <KeyboardArrowDownIcon
          className={`select-arrow ${open ? "arrow-up" : ""}`}
        />
      </div>

      {open && (
        <div className="select-dropdown">
          <div className="select-dropdown-content">
            {options.map((option, index) => (
              <div
                key={index}
                className="select-option"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}