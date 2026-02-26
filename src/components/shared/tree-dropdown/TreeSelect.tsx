import { TreeNode } from "./TreeNode";
import type { TreeNodeData } from "./types";

interface TreeSelectProps {
  data: TreeNodeData[];
  selectedIds: Set<string>;
  onToggle: (node: TreeNodeData) => void;
}

export const TreeSelect = ({ data, selectedIds, onToggle }: TreeSelectProps) => {
  return (
    <ul style={{ margin: 0, padding: 0 }}>
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