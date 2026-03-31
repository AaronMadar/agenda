import { Popover } from "@mui/material";
import { SecondaryPopUp } from "../../../shared/pop-ups/SecondaryPopUp";
import { ViewSettingsList } from "./ViewSettingsList";

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const ViewSettingsPopover = ({ anchorEl, onClose }: Props) => {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      disableRestoreFocus
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      slotProps={{
        paper: {
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
        <ViewSettingsList />
      </SecondaryPopUp>
    </Popover>
  );
};