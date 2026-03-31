import { useRef, useState } from "react";
import { ViewSettingsDivider } from "./ViewSettingsDivider";
import { ViewSettingsSelect } from "./ViewSettingsSelect";
import { ViewSettingsToggle } from "./ViewSettingsToggle";
import { ViewSettingsSubMenu } from "./ViewSettingsSubMenu";
import { useViewSettings } from "@/contexts/GantViewSettingsContext";
import { GROUP_BY_OPTIONS } from "@/constants/viewSettings.constants";

export const ViewSettingsList = () => {
  const {
    showOpenCards,
    setShowOpenCards,
    // viewModeOptions,
    selectedViewMode,
    setSelectedViewMode,
  } = useViewSettings();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeSelect, setActiveSelect] = useState<string | null>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- TIMER LOGIC ---------- */

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const delayedClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setAnchorEl(null);
      setActiveSelect(null);
    }, 80);
  };

  return (
    <div>
      <ViewSettingsToggle
        label="הצג כרטיסיות פתוחות"
        value={showOpenCards}
        onChange={setShowOpenCards}
      />

      <ViewSettingsDivider />

      <ViewSettingsSelect
        id="groupBy"
        label="קבץ לפי"
        value={selectedViewMode}
        options={GROUP_BY_OPTIONS}
        setAnchorEl={setAnchorEl}
        setActiveSelect={setActiveSelect}
        clearCloseTimer={clearCloseTimer}
        delayedClose={delayedClose}
      />

      <ViewSettingsSubMenu
        anchorEl={anchorEl}
        activeSelect={activeSelect}
        options={GROUP_BY_OPTIONS}
        value={selectedViewMode}
        onSelect={setSelectedViewMode}
        clearCloseTimer={clearCloseTimer}
        delayedClose={delayedClose}
      />
    </div>
  );
};