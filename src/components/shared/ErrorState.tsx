import style from "@/style/components/shared/ErrorState.module.css";

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({ message = "אירעה שגיאה בטעינת הנתונים" }: ErrorStateProps) => {
  return (
    <div className={style.errorState}>
      <img
        src="/src/assets/error.svg"
        alt="Error"
        className={style.errorImage}
      />
      <p>{message}</p>
    </div>
  );
};