import { useMemo, useState } from "react";
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

  const periodOptions = options.map(o => o.label);

  const handleSelect = (label: string) => {
    const selectedOption = options.find(o => o.label === label);
    if (!selectedOption) return;

    setPeriodView(label);
    setStartDate(dayjs(selectedOption.start));
    setEndDate(dayjs(selectedOption.end));
  };

  return (
    <Select
      label="תקופה"
      options={periodOptions}
      value={periodView}
      placeholder="בחר תקופה"
      onChange={handleSelect}
    />
  )

} 