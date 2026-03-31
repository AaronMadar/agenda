import { Switch } from "@mui/material";
import { ViewSettingsItem } from "./ViewSettingsItem";

export const ViewSettingsToggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <ViewSettingsItem>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
        }}
      >
        <span>{label}</span>
        <Switch checked={value} onChange={(e) => onChange(e.target.checked)} />
      </div>
    </ViewSettingsItem>
  );
};
