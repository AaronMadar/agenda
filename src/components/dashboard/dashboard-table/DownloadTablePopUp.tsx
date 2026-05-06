import { SecondaryPopUp } from "@/components/shared/pop-ups/SecondaryPopUp";
import style from "@/style/components/dashboard/dashboard-table/DownloadTablePopUp.module.css";
import { Tooltip } from "@mui/material";
import { ExcelIcon, PdfIcon, CsvIcon } from "@/assets/icons";

import {
  exportToExcel,
  exportToCSV,
  exportToPDF,
  formatDataForExport,
} from "@/utils/exportTable";

type DownloadTablePopUpProps = {
  data: any[];
  columns: { accessor: string; label: string }[];
};

export const DownloadTablePopUp = ({
  columns,
  data,
}: DownloadTablePopUpProps) => {
  const formatted = formatDataForExport(data, columns);

  return (
    <SecondaryPopUp>
      <div className={style.flexContainer}>
        <Tooltip title="הורד Excel של הטבלה" placement="bottom" arrow>
          <div className={style.btnCell} onClick={() => exportToExcel(formatted)}>
            <ExcelIcon className={style.icon} />
          </div>
        </Tooltip>
        <div className={style.horizontalDivider} />
        <Tooltip title="הורד CSV של הטבלה" placement="bottom" arrow>
          <div className={style.btnCell} onClick={() => exportToCSV(formatted)}>
            <CsvIcon className={style.icon} />
          </div>
        </Tooltip>
        <div className={style.horizontalDivider} />
        <Tooltip title="הורד PDF של הטבלה" placement="bottom" arrow>
          <div className={style.btnCell} onClick={() => exportToPDF(formatted)}>
            <PdfIcon className={style.icon} />
          </div>
        </Tooltip>
      </div>
    </SecondaryPopUp>
  );
};
