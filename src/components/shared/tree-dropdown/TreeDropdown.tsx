import { useState } from "react";
import { TreeSelect } from "./TreeSelect";
import { useTreeData } from "@/contexts/TreeDataContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from "@/style/components/shared/tree-dropdown/TreeDropdown.module.css"

export const TreeDropdown = () => {
  const [open, setOpen] = useState(false);
  const { treeData, selectedNode, setSelectedNode, loading, error } = useTreeData();

  if (loading) {
    return <div className={style.container}>טוען...</div>;
  }   

  if (error) {
    return <div className={style.container}>שגיאה: {error}</div>;
  }

  return (
    <div className={style.container}>
      <div
        onClick={() => setOpen(!open)}
        className={style.trigger}
        
      >
        <span className={style.selectedText}>
          {selectedNode?.label ?? "בחר ערך"}
        </span>
        <ExpandMoreIcon 
          className={`${style.arrow} ${open ? style.arrowUp : style.arrowDown}`}
        />
      </div>

      {open && (
        <div className={style.dropdown}>
          <div className={style.dropdownContent}>
            <TreeSelect
              data={treeData}
              onSelect={(node) => {
                setSelectedNode(node);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};