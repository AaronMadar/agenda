import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from "react"
import type { TreeNodeData } from '@/components/shared/tree-dropdown/types';

type TreeDataContextType = {
  treeData: TreeNodeData[];
  selectedNode: TreeNodeData | null;
  loading: boolean;
  error: string | null;
  setSelectedNode: (node: TreeNodeData | null) => void;
  refetch: () => void;
};

const TreeDataContext = createContext<TreeDataContextType | null>(null);

export const TreeDataProvider = ({ children }: { children: ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTreeData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/public/tree-data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch tree data');
      }
      
      const data = await response.json();
      setTreeData(data);
      
      if (data.length > 0 && !selectedNode) {
        setSelectedNode(data[0]);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching tree data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  return (
    <TreeDataContext.Provider
      value={{
        treeData,
        selectedNode,
        loading,
        error,
        setSelectedNode,
        refetch: fetchTreeData,
      }}
    >
      {children}
    </TreeDataContext.Provider>
  );
};

export const useTreeData = () => {
  const context = useContext(TreeDataContext);
  if (!context) {
    throw new Error('useTreeData must be used inside TreeDataProvider');
  }
  return context;
};