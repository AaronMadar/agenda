import { Popover } from "@mui/material";
import { SecondaryPopUp } from "../../../shared/pop-ups/SecondaryPopUp";
import { ViewSettingsDivider } from "./ViewSettingsDivider";
import styles from "@/style/components/gantpage/header/view-settings/ViewSettingsSubMenu.module.css"

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  anchorEl: HTMLElement | null;
  activeSelect: string | null;
  options: Option<T>[];
  value: T;
  onSelect: (value: T) => void;

  clearCloseTimer: () => void;
  delayedClose: () => void;
};

export const ViewSettingsSubMenu = <T extends string>({
  anchorEl,
  activeSelect,
  options,
  value,
  onSelect,
  clearCloseTimer,
  delayedClose,
}: Props<T>) => {
  const open = Boolean(anchorEl) && activeSelect === "groupBy";

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      disableRestoreFocus
      sx={{ pointerEvents: "none" }}
      slotProps={{
        paper: {
          onMouseEnter: clearCloseTimer,
          onMouseLeave: delayedClose,
          sx: {
            pointerEvents: "auto",
            backgroundColor: "transparent",
            borderRadius: "10px",
            overflow: "visible",
          },
        },
      }}
    >
      <SecondaryPopUp>
        {options.map((opt, index) => (
          <div key={opt.value}>
            <div
              className={`${styles.option} ${opt.value === value ? styles.active : ""}`}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </div>

            {options.length - 1 > index && <ViewSettingsDivider />}
          </div>
        ))}
      </SecondaryPopUp>
    </Popover>
  );
};