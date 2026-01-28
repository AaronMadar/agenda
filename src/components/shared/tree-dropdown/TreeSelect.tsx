import { TreeNode } from "./TreeNode";
import type { TreeNodeData } from "./types";


interface TreeSelectProps {
  data: TreeNodeData[];
  onSelect?: (node: TreeNodeData) => void;
}

export const TreeSelect = ({ data, onSelect }: TreeSelectProps) => {
  const handleSelect = (node: TreeNodeData) => {
    onSelect?.(node);
  };

  return (
    <ul style={{ margin: 0, padding: 0 }}>
      {data.map((root) => (
        <TreeNode key={root.id} node={root} onSelect={handleSelect} level={0} />
      ))}
    </ul>
  );
};