import { useState } from "react";
import { Tooltip } from "@mui/material";
import { useControls } from "@/contexts/ControlsContext";
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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <>
      <div className={styles["control-panel"]}>
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