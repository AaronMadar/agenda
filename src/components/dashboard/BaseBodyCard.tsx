import { useState, type ReactNode } from "react";
import style from "@/style/components/dashboard/BaseBodyCard.module.css";

type BaseBodyCardProps = {
  children: ReactNode;
};

export const BaseBodyCard = ({ children }: BaseBodyCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded && (
        <div
          className={style.overlay}
          onClick={() => setExpanded(false)}
        />
      )}

      <div
        className={`${style.basicBodyCard} ${
          expanded ? style.expanded : ""
        }`}
      >

        <button
          className={style.expandBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "✕" : "⛶"}
        </button>

        <div className={style.content}>
          {children}
        </div>
      </div>
    </>
  );
};
