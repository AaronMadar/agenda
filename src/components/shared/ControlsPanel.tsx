import { useState } from "react";
import dayjs from "dayjs";
import { Tooltip } from "@mui/material";
import { useControls } from "@/contexts/ControlsContext";
import { useDateRange } from "@/contexts/DateRangeContext";
import { TreeDropdown } from "@/components/shared/tree-dropdown/TreeDropdown";
import { SelectTime } from "../gantpage/header/SelectTime";
import { PopoverTime } from "../gantpage/header/PopoverTime";
import { MultiSelect } from "./selects/MultiSelect";
import styles from "@/style/components/shared/ControlsPanel.module.css";

export const ControlsPanel = () => {
  const {
    treeData,
    selectedUnitIds,
    setSelectedUnitIds,

    serviceTypes,
    selectedServiceTypes,
    setSelectedServiceTypes,

    resourceTypes,
    selectedResourceTypes,
    setSelectedResourceTypes,

    loading,
    error,
  } = useControls();

  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setPeriodView,
    refetchData,
  } = useDateRange();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setPeriodView(`כל ${dayjs().year()}`);
    setSelectedUnitIds([]);
    setSelectedServiceTypes(null);
    setSelectedResourceTypes(null);
  };

  const handleApplyFilters = () => {
    refetchData(
      startDate
        ? startDate.format("YYYY-MM-DD")
        : dayjs().startOf("year").format("YYYY-MM-DD"),
      endDate
        ? endDate.format("YYYY-MM-DD")
        : dayjs().endOf("year").format("YYYY-MM-DD"),
      selectedUnitIds,
      selectedServiceTypes,
      selectedResourceTypes,
    );
    alert(
      "Filters applied! (This is a placeholder - implement actual data fetching)",
    );
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <>
      <div className={styles["control-panel"]}>
        <button className={styles["button"]} onClick={handleApplyFilters}>
          בצע סינון
        </button>

        <button className={styles["button"]} onClick={handleResetFilters}>
          איפוס סינונים
        </button>

        <TreeDropdown
          data={treeData}
          value={selectedUnitIds}
          onChange={setSelectedUnitIds}
          placeholder="יחידה"
        />

        <MultiSelect
          placeholder="סוג שירות"
          options={serviceTypes}
          value={selectedServiceTypes ?? []}
          onChange={(value) =>
            setSelectedServiceTypes(value.length === 0 ? null : value)
          }
        />

        <MultiSelect
          placeholder="משאבים"
          options={resourceTypes}
          value={selectedResourceTypes ?? []}
          onChange={(value) =>
            setSelectedResourceTypes(value.length === 0 ? null : value)
          }
        />

        <SelectTime />

        <PopoverTime anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        <Tooltip title="תאריך" arrow>
          <i
            className={`bi bi-calendar-date ${styles["time-icon"]}`}
            onClick={handleOpenPopover}
          />
        </Tooltip>
      </div>
      <i
        className={`${styles["control-panel-icon"]} bi bi-calendar4-range ${styles["header-icon"]}`}
      />
    </>
  );
};
