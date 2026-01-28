import { useState } from "react";
import type { TreeNodeData } from "./types";
import style from "@/style/components/shared/tree-dropdown/TreeNode.module.css"


interface TreeNodeProps {
  node: TreeNodeData;
  onSelect: (node: TreeNodeData) => void;
  level?: number;
}

export const TreeNode = ({ node, onSelect, level = 0 }: TreeNodeProps) => {
  const [open, setOpen] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;

  const getBackgroundColor = () => {
    const opacity = level * 0.08;
    const maxOpacity = Math.min(opacity, 0.5);
    
    return `rgba(255, 255, 255, ${maxOpacity})`;
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
            onClick={() => onSelect(node)}
            className={style.label}
          >
            {node.label}
          </span>
        </div>
      </li>

      {open && hasChildren && (
        <>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </>
      )}
    </>
  );
};