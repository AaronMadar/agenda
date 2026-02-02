import { useState, useRef, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeSelect } from "./TreeSelect";
import style from "@/style/components/shared/tree-dropdown/TreeDropdown.module.css";
import type { TreeNodeData } from "./types";

interface TreeDropdownProps {
  data: TreeNodeData[];
  value: TreeNodeData | null;
  onChange: (node: TreeNodeData | null) => void;
  placeholder?: string;
  label?: string;
}

export const TreeDropdown = ({
  data,
  value,
  onChange,
  placeholder = "בחר ערך",
  label,
}: TreeDropdownProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      {label && <span className={style.label}>{label}</span>}

      <div className={style.container}>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={style.trigger}
        >
          <span className={style.selectedText}>
            {value?.label ?? placeholder}
          </span>

          <ExpandMoreIcon
            className={`${style.arrow} ${open ? style.arrowUp : style.arrowDown}`}
          />
        </div>

        {open && (
          <div className={style.dropdown}>
            <div className={style.dropdownContent}>
              <TreeSelect
                data={data}
                onSelect={(node) => {
                  onChange(node);
                  setOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
