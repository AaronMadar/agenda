import { Popover } from "@mui/material";
import { SecondaryPopUp } from "../../../shared/pop-ups/SecondaryPopUp";
import { ViewSettingsDivider } from "./ViewSettingsDivider";

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
              onClick={() => onSelect(opt.value)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor:
                  opt.value === value ? "#646869" : "transparent",
              }}
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