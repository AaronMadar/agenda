import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import type { TreeNodeData } from "./types";
import style from "@/style/components/shared/tree-dropdown/TreeNode.module.css";

interface TreeNodeProps {
  node: TreeNodeData;
  onToggle: (node: TreeNodeData) => void;
  selectedIds: Set<string>;
  ancestorChecked?: boolean;
  level?: number;
}

export const TreeNode = ({
  node,
  onToggle,
  selectedIds,
  ancestorChecked = false,
  level = 0,
}: TreeNodeProps) => {
  const [open, setOpen] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;

  const isChecked = ancestorChecked || selectedIds.has(node.id);

  const getBackgroundColor = () => {
    const opacity = Math.min(level * 0.08, 0.5);
    return `rgba(255, 255, 255, ${opacity})`;
  };

  return (
    <>
      <li className={style.nodeItem}>
        <div
          className={style.nodeContent}
          style={{ backgroundColor: getBackgroundColor() }}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className={style.toggleButton}
            >
              {open ? "−" : "+"}
            </button>
          ) : (
            <span className={style.spacer} />
          )}

          <span
            onClick={() => onToggle(node)}
            className={style.label}
          >
            {node.label}
          </span>

          {isChecked && (
            <CheckIcon className={style.check} sx={{ fontSize: 21 }} />
          )}
        </div>
      </li>

      {open && hasChildren && (
        <>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onToggle={onToggle}
              selectedIds={selectedIds}
              ancestorChecked={isChecked}
              level={level + 1}
            />
          ))}
        </>
      )}
    </>
  );
};