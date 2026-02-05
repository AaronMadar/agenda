import { useState } from "react";
import { useControls } from "@/contexts/ControlsContext";
import { TreeDropdown } from "@/components/shared/tree-dropdown/TreeDropdown";
import { Select } from "./Select";
import { SelectTime } from "../gantpage/header/SelectTime";
import { PopoverTime } from "../gantpage/header/PopoverTime";

import '@/style/components/shared/ControlsPanel.css'

export const ControlsPanel = () => {
  const {
    treeData,
    selectedUnit,
    setSelectedUnit,

    serviceTypeOptions,
    selectedServiceType,
    setSelectedServiceType,

    resourceTypeOptions,
    selectedResourceType,
    setSelectedResourceType,

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
    <div className="control-panel"
      style={{
        
      }}
    >
      <TreeDropdown
        label="יחידה"
        data={treeData}
        value={selectedUnit}
        onChange={setSelectedUnit}
      />

      <Select
        label="סוג שירות"
        options={serviceTypeOptions}
        value={selectedServiceType ?? "הכל"}
        onChange={(value) =>
          setSelectedServiceType(value === "הכל" ? null : value)
        }
      />

      <Select
        label="משאבים"
        options={resourceTypeOptions}
        value={selectedResourceType ?? "הכל"}
        onChange={(value) =>
          setSelectedResourceType(value === "הכל" ? null : value)
        }
      />

      <SelectTime />

      <PopoverTime anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <i
        className="bi bi-calendar-date header-icon"
        onClick={handleOpenPopover}
      />
    </div>
    <i className="control-panel-icon bi bi-calendar4-range header-icon "/>
    </>
    
    
  );
};
