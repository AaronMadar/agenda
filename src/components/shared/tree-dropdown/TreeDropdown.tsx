import { useState, useRef, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeSelect } from "./TreeSelect";
import style from "@/style/components/shared/tree-dropdown/TreeDropdown.module.css";
import type { TreeNodeData } from "./types";
import { toggleNode, getNodeLabel } from "./treeUtils";

interface TreeDropdownProps {
  data: TreeNodeData[];
  value: string[];
  onChange: (ids: string[]) => void;
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
  const [tempSelected, setTempSelected] = useState<Set<string>>(
    new Set(value)
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempSelected(new Set(value));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setTempSelected(new Set(value));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const handleToggle = (node: TreeNodeData) => {
    setTempSelected((prev) => toggleNode(prev, data, node.id));
  };

  const getDisplayText = () => {
    if (tempSelected.size === 0) return placeholder;
    const labels = [...tempSelected].map((id) => getNodeLabel(data, id) ?? id);
    if (labels.length <= 2) return labels.join(", ");
    return `${placeholder} [${labels.length}]`;
  };

  const handleConfirm = () => {
    onChange([...tempSelected]);
    setOpen(false);
  };

  const handleReset = () => {
    setTempSelected(new Set());
  };

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      {label && <span className={style.label}>{label}</span>}

      <div className={style.container}>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={style.trigger}
        >
          <span
            className={`${style.selectedText} ${
              tempSelected.size === 0 ? style.placeholder : ""
            }`}
          >
            {getDisplayText()}
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
                selectedIds={tempSelected}
                onToggle={handleToggle}
              />
            </div>

            <div className={style.footer}>
              <div className={style.footerButtons}>
                <button className={style.resetButton} onClick={handleReset}>
                  איפוס
                </button>
                <button className={style.confirmButton} onClick={handleConfirm}>
                  אישור
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};