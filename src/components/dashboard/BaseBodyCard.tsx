import type { ReactNode } from "react";
import style from "@/style/components/dashboard/BaseBodyCard.module.css"

type BaseBodyCardProps = {
  children: ReactNode;
  title?: string;
};

export const BaseBodyCard = ({ children, title }: BaseBodyCardProps) => {
  return (
    <div className={style.basicBodyCard}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};