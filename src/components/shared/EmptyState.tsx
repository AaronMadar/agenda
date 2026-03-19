import style from "@/style/components/shared/EmptyState.module.css";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message = "אין נתונים להצגה" }: EmptyStateProps) => {
  return (
    <div className={style.emptyState}>
      <img
        src="/src/assets/empty-box.svg"
        alt="Empty"
        className={style.emptyImage}
      />
      <p>{message}</p>
    </div>
  );
};