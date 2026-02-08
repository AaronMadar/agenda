import style from "@/style/components/shared/pop-ups/SecondaryPopUp.module.css"

export const SecondaryPopUp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.popUpWrapper}>
      {children}
    </div>
  );
};