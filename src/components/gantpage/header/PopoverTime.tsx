import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Popover, Box, Typography, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useFilters } from "@/stores/filtersStore";

import styles from "@/style/components/gantpage/header/PopoverTime.module.css";

interface PopoverProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

export function PopoverTime({ anchorEl, setAnchorEl }: PopoverProps) {
  const { currentYear, setPeriodView, setPeriodDate } = useFilters();

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
                sx: {
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiPickersSectionList-root": {
                    color: "#fff",
                  },

                  "& label": {
                    color: "white",
                  },

                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInputBase-root.Mui-filled": {
                    backgroundColor: "#ffffff",
                  },

                  "& label.MuiInputLabel-shrink": {
                    color: "white",
                  },
                },
              },
              popper: {
                sx: {
                  "& input": {
                    color: "#ffffff",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#ffffff",
                  },
                  "& .MuiPaper-root": {
                    backgroundColor: "#3d3c3c",
                    color: "white",
                  },

                  "& .MuiPickersDay-root": {
                    color: "white",
                  },

                  "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: "#6a6a6a",
                    color: "white",
                  },

                  "& .MuiPickersDay-root:hover": {
                    backgroundColor: "#949090",
                  },

                  "& .MuiPickersDay-root.MuiPickersDay-today": {
                    border: "1px solid white",
                  },

                  "& .MuiInputBase-root": {
                    backgroundColor: "#ffffff",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: "#949090",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  },
                },
              },
              openPickerIcon: {
                sx: {
                  color: "#8e8e8e",
                },
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

                sx: {


                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiPickersSectionList-root": {
                    color: "#fff",
                  },

                  "& label": {
                    color: "white",
                  },

                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInputBase-root.Mui-filled": {
                    backgroundColor: "#ffffff",
                  },

                  "& label.MuiInputLabel-shrink": {
                    color: "white",
                  },
                },
              },
              popper: {
                sx: {
                  "& input": {
                    color: "#ffffff",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#ffffff",
                  },
                  "& .MuiPaper-root": {
                    backgroundColor: "#3d3c3c",
                    color: "white",
                  },

                  "& .MuiPickersDay-root": {
                    color: "white",
                  },

                  "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: "#6a6a6a",
                    color: "white",
                  },

                  "& .MuiPickersDay-root:hover": {
                    backgroundColor: "#949090",
                  },

                  "& .MuiPickersDay-root.MuiPickersDay-today": {
                    border: "1px solid white",
                  },

                  "& .MuiInputBase-root": {
                    backgroundColor: "#ffffff",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: "#949090",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  },
                },
              },
              openPickerIcon: {
                sx: {
                  color: "#8e8e8e",
                },
              },

            }}
          />

          <Button
            variant="contained"
            onClick={handleApply}
            className={styles["apply-button"]}
            sx={{ backgroundColor: "#525252", borderRadius: "12px", "&:hover": { backgroundColor: "#6a6a6a" } }}
          >
            החל
          </Button>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
