import { useState } from 'react';

import { Popover, Box, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/he';

import "@/style/components/gantpage/header/PopoverTime.css";


interface PopoverProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  setPeriodView: (value: string) => void;
}

export default function PopoverTime({
  anchorEl,
  setAnchorEl,
  setStartDate,
  setEndDate,
  setPeriodView
}: PopoverProps) {

  const [selectedStart, setSelectedStart] = useState<Dayjs | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Dayjs | null>(null);

  const currentYear = dayjs().year();
  // On cherche seulement a permettre toute l'anee derniere et toute l'annee prochaine
  const dynamicMinDate = dayjs(`${currentYear - 2}-12-31`).add(1, 'day');
  const dynamicMaxDate = dayjs(`${currentYear + 2}-01-01`).subtract(1, 'day');

  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  // function to handle apply button click
  const handleApply = () => {
    if (!selectedStart || !selectedEnd) return;

    if (selectedStart.isAfter(selectedEnd)) {
      alert("תאריך התחלה חייב להיות לפני תאריך סיום");
      return;
    }

    const start = selectedStart.startOf('day');
    const end = selectedEnd.endOf('day');
    setStartDate(start);
    setEndDate(end);

    const dateString = `${start.format("DD/MM/YY")} - ${end.format("DD/MM/YY")}`;
    setPeriodView(dateString);

    handleClose();

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{ className: "popover-dates-container" }}
        >
          <Box className="popover-content-box">
            <Typography className="popover-title">טווח תאריכים</Typography>

            <DatePicker
              label="תאריך התחלה"
              value={selectedStart}
              minDate={dynamicMinDate}
              maxDate={dynamicMaxDate}
              onChange={setSelectedStart}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  className: "date-picker-field"
                }
              }}
            />

            <DatePicker
              label="תאריך סיום"
              value={selectedEnd}
              minDate={dynamicMinDate}
              maxDate={dynamicMaxDate}
              onChange={setSelectedEnd}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  className: "date-picker-field"
                }
              }}
            />

            <Button
              variant="contained"
              onClick={handleApply}
              sx={{ mt: 1, backgroundColor: '#4093f1', '&:hover': { backgroundColor: '#3376c2' } }}
            >
              החל
            </Button>
          </Box>
        </Popover>
      </LocalizationProvider>
    );
  }
}
