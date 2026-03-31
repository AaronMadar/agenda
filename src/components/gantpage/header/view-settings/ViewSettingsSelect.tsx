import { ViewSettingsItem } from "./ViewSettingsItem";

type Option<T> = {
  value: T;
  label: string;
};

type ViewSettingsSelectProps<T> = {
  id: string;
  label: string;
  value: T;
  options: Option<T>[];

  setAnchorEl: (el: HTMLElement | null) => void;
  setActiveSelect: (id: string | null) => void;

  clearCloseTimer: () => void;
  delayedClose: () => void;
};

export const ViewSettingsSelect = <T extends string>({
  id,
  label,
  value,
  options,
  setAnchorEl,
  setActiveSelect,
  clearCloseTimer,
  delayedClose,
}: ViewSettingsSelectProps<T>) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <ViewSettingsItem>
      <div
        onMouseEnter={(e) => {
          clearCloseTimer();
          setAnchorEl(e.currentTarget);
          setActiveSelect(id);
        }}
        onMouseLeave={delayedClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
        }}
      >
        <div>{label}</div>

        <div style={{ opacity: 0.6 }}>
          {selectedOption?.label}
        </div>

        <i className="bi bi-chevron-left" />
      </div>
    </ViewSettingsItem>
  );
};