import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs, { Dayjs } from 'dayjs';

import "@/style/index.css";
import "@/style/components/gantpage/header/SelectTime.css";


interface SelectTimeProps {
  setPeriodView: (value: string) => void;
  periodView: string;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
}

export default function SelectTime({
  setPeriodView,
  periodView,
  setStartDate,
  setEndDate
}: SelectTimeProps) {

  const year = new Date().getFullYear();


  const handlePeriodViewChange = (e: any) => {
    let mode = e.target.value;
    setPeriodView(mode)

    let start: Dayjs | null = null;
    let end: Dayjs | null = null;

    switch (mode) {
      case 'רבעון1':
        start = dayjs(`${year}-01-01`);
        end = dayjs(`${year}-03-31`);
        break;
      case 'רבעון2':
        start = dayjs(`${year}-04-01`);
        end = dayjs(`${year}-06-30`);
        break;
      case 'רבעון3':
        start = dayjs(`${year}-07-01`);
        end = dayjs(`${year}-09-30`);
        break;
      case 'רבעון4':
        start = dayjs(`${year}-10-01`);
        end = dayjs(`${year}-12-31`);
        break;
      case 'חצי-שנה1':
        start = dayjs(`${year}-01-01`);
        end = dayjs(`${year}-06-30`);
        break;
      case 'חצי-שנה2':
        start = dayjs(`${year}-07-01`);
        end = dayjs(`${year}-12-31`);
        break;
      case 'שנה':
        start = dayjs(`${year}-01-01`);
        end = dayjs(`${year}-12-31`);
        break;
      default:
        start = null;
        end = null;
    }

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <FormControl variant="standard">
      <Select
        value={periodView}
        onChange={handlePeriodViewChange}
        className="select-timeview"
        disableUnderline
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#3d3c3c',
              color: '#efeded',
              borderRadius: '18px',
              marginTop: '8px',
              '& .MuiMenuItem-root': {
                padding: '10px 20px',
                margin: '4px',
                borderRadius: '12px',
                '&:hover': { bgcolor: 'rgba(64, 147, 241, 0.2)' },
                '&.Mui-selected': {
                  bgcolor: '#4093f1 !important',
                  color: 'white'
                }
              }
            }
          }
        }}
      >

        {/* Renders the custom date range from the Popover as a selectable option.
  The condition prevents duplicating standard periods (Quarters, Semesters, Year) 
  that are already defined as fixed MenuItems below.
*/}
        {periodView && !periodView.startsWith('רבעון') && !periodView.startsWith('חצי') && periodView !== 'שנה' && (
          <MenuItem value={periodView}>{periodView}</MenuItem>
        )}
        <MenuItem value="רבעון1">ינו' {year} - מרץ' {year} </MenuItem>
        <MenuItem value="רבעון2">אפר' {year} - יוני' {year}</MenuItem>
        <MenuItem value="רבעון3">יולי' {year} - ספט' {year}</MenuItem>
        <MenuItem value="רבעון4">אוק' {year} - דצמ' {year}</MenuItem>
        <MenuItem value="חצי-שנה1">חצי-ראשון {year}</MenuItem>
        <MenuItem value="חצי-שנה2">חצי-שני {year}</MenuItem>
        <MenuItem value="שנה">כל {year}</MenuItem>

      </Select>
    </FormControl>
  );
}
