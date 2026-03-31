export const ViewSettingsItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        borderRadius: "8px",
        cursor: onClick ? "pointer" : "default",
        width: "100%",
        height: "40px",
      }}
    >
      {children}
    </div>
  );
};