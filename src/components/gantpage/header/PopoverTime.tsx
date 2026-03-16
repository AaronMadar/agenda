import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Popover, Box, Typography, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useControls } from "@/contexts/ControlsContext";

import styles from "@/style/components/gantpage/header/PopoverTime.module.css";

interface PopoverProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

export function PopoverTime({ anchorEl, setAnchorEl }: PopoverProps) {
  const { currentYear, setPeriodView, setPeriodDate } = useControls();

  const [selectedStart, setSelectedStart] = useState<Dayjs | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Dayjs | null>(null);

  const dynamicMinDate = dayjs(`${currentYear - 2}-12-31`).add(1, "day");
  const dynamicMaxDate = dayjs(`${currentYear + 2}-01-01`).subtract(1, "day");

  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const handleApply = () => {
    if (!selectedStart || !selectedEnd) return;

    if (selectedStart.isAfter(selectedEnd)) {
      alert("תאריך התחלה חייב להיות לפני תאריך סיום");
      return;
    }

    setPeriodDate({
      start: selectedStart.format("YYYY-MM-DD"),
      end: selectedEnd.format("YYYY-MM-DD"),
    });

    const dateString = `${selectedStart.startOf("day").format("DD/MM/YY")} - ${selectedEnd.endOf("day").format("DD/MM/YY")}`;
    setPeriodView(dateString);

    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ className: styles["popover-dates-container"] }}
      >
        <Box className={styles["popover-content-box"]}>
          <Typography className={styles["popover-title"]}>
            טווח תאריכים
          </Typography>

          <DatePicker
            label="תאריך התחלה"
            value={selectedStart}
            minDate={dynamicMinDate}
            maxDate={dynamicMaxDate}
            className={styles["date-picker-field"]}
            onChange={setSelectedStart}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                className: styles["date-picker-field"],
              },
            }}
          />

          <DatePicker
            label="תאריך סיום"
            value={selectedEnd}
            minDate={dynamicMinDate}
            maxDate={dynamicMaxDate}
            className={styles["date-picker-field"]}
            onChange={setSelectedEnd}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                className: styles["date-picker-field"],
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleApply}
            className={styles["apply-button"]}
          >
            החל
          </Button>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
