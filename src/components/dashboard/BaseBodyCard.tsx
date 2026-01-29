import { useState, type ReactNode } from "react";
import style from "@/style/components/dashboard/BaseBodyCard.module.css";

type BaseBodyCardProps = {
  children: ReactNode;
  title?: string;
};

export const BaseBodyCard = ({ children, title }: BaseBodyCardProps) => {
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
        <div className={style.header}>
          {title && <h3>{title}</h3>}

          <button
            className={style.expandBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "✕" : "⛶"}
          </button>
        </div>

        <div className={style.content}>
          {children}
        </div>
      </div>
    </>
  );
};









