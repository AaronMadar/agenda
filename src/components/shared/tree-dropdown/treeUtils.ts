import type { TreeNodeData } from "./types";

export function findPath(
  data: TreeNodeData[],
  targetId: string
): TreeNodeData[] | null {
  for (const node of data) {
    if (node.id === targetId) return [node];
    if (node.children?.length) {
      const sub = findPath(node.children, targetId);
      if (sub) return [node, ...sub];
    }
  }
  return null;
}

export function getAllDescendantIds(node: TreeNodeData): string[] {
  const ids: string[] = [];
  if (node.children) {
    for (const child of node.children) {
      ids.push(child.id, ...getAllDescendantIds(child));
    }
  }
  return ids;
}

export function toggleNode(
  selectedIds: Set<string>,
  data: TreeNodeData[],
  nodeId: string
): Set<string> {
  const path = findPath(data, nodeId);
  if (!path) return selectedIds;

  const newSelected = new Set(selectedIds);

  const coveringAncestor = path.find((n) => newSelected.has(n.id)) ?? null;

  if (coveringAncestor) {
    newSelected.delete(coveringAncestor.id);

    const ancestorIndex = path.findIndex((n) => n.id === coveringAncestor.id);

    for (let i = ancestorIndex; i < path.length - 1; i++) {
      const currentNode = path[i];
      const nextInPath = path[i + 1];
      if (currentNode.children) {
        for (const child of currentNode.children) {
          if (child.id !== nextInPath.id) {
            newSelected.add(child.id);
          }
        }
      }
    }
  } else {
    newSelected.add(nodeId);
    const descendantIds = getAllDescendantIds(path[path.length - 1]);
    for (const id of descendantIds) {
      newSelected.delete(id);
    }
  }

  return newSelected;
}

export function getNodeLabel(
  data: TreeNodeData[],
  id: string
): string | null {
  for (const node of data) {
    if (node.id === id) return node.label;
    if (node.children?.length) {
      const found = getNodeLabel(node.children, id);
      if (found) return found;
    }
  }
  return null;
}