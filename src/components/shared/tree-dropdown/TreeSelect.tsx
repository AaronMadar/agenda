import { TreeNode } from "./TreeNode";
import type { TreeNodeData } from "./types";
import styles from "../../../style/components/shared/tree-dropdown/TreeSelect.module.css"

interface TreeSelectProps {
  data: TreeNodeData[];
  selectedIds: Set<string>;
  onToggle: (node: TreeNodeData) => void;
}

export const TreeSelect = ({ data, selectedIds, onToggle }: TreeSelectProps) => {
  return (
    <ul className={styles.tree}>
      {data.map((root) => (
        <TreeNode
          key={root.id}
          node={root}
          selectedIds={selectedIds}
          onToggle={onToggle}
          ancestorChecked={false}
          level={0}
        />
      ))}
    </ul>
  );
};