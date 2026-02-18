import { useState, type ReactNode } from "react";
import { Tooltip } from "@mui/material";
import style from "@/style/components/dashboard/BaseBodyCard.module.css";

type BaseBodyCardProps = {
  children: ReactNode;
};

export const BaseBodyCard = ({ children }: BaseBodyCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded && (
        <div className={style.overlay} onClick={() => setExpanded(false)} />
      )}

      <div
        className={`${style.basicBodyCard} ${expanded ? style.expanded : ""}`}
      >
        <Tooltip
          title={expanded ? "סגור": "הרחב"}
          arrow
          placement="top"
          slotProps={{
            popper: {
              sx: { zIndex: 20000 },
            },
          }}
        >
          <button
            className={style.expandBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "✕" : "⛶"}
          </button>
        </Tooltip>

        <div className={style.content}>{children}</div>
      </div>
    </>
  );
};
