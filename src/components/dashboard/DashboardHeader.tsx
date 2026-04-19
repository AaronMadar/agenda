import { useNavigate } from "react-router-dom";
import style from "@/style/components/dashboard/DashboardHeader.module.css";
import { FiltersPanel } from "../shared/FiltersPanel";
import { DashboardTable } from "./dashboard-table/DashboardTable";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { DropdownMultiSelect } from "./dashboard-table/DropdownMultiSelect";
// import { KeyValPopUp } from "../shared/pop-ups/KeyValPopUp"
// import { ResourcePopUp } from "../shared/pop-ups/ResourcePopUp";

// const keyValues = [
//     { key: "קוד שיבוץ", value: "12345678" },
//     { key: "יחידה", value: "מפקדת חטיבה 84" },
//     { key: "משימה", value: "קורס מ”כים חי”ר"},
//     { key: "עלות ישיר", value: "10000"},
//     { key: "עלות פריטי", value: "1200"},
// ]

// const resourceDetailsTable = [
//             { "item": "כד’ 5.56 מ”מ לאימונים", "quantity": 1200, "price": 1.5 },
//             { "item": "כד’ 5.56 מ”מ", "quantity": 300, "price": 5 },
//             { "item": "רימון יד מס’ 4", "quantity": 500, "price": 2 },
//             { "item": "רימון יד מס’ 20", "quantity": 200, "price": 3 }
//           ]


export const DashboardHeader = () => {
  const navigate = useNavigate();

  const columns = [
    { label: "name", searchable: true, sumable: false },
    { label: "age", searchable: false, sumable: true },
    { label: "city", searchable: true, sumable: false },
    { label: "country", searchable: true, sumable: false },
    { label: "money", searchable: false, sumable: true }
  ]

  const data = [
    { id: 1, name: "John Doe", age: 30, city: "New York", country: "USA", money: 1000 },
    { id: 2, name: "Jane Smith", age: 25, city: "London", country: "UK", money: 1500 },
    { id: 3, name: "Michael Johnson", age: 35, city: "Sydney", country: "Australia", money: 2000 },
    { id: 4, name: "John Doe", age: 30, city: "New York", country: "USA", money: 1000 },
    { id: 5, name: "Jane Smith", age: 25, city: "London", country: "UK", money: 1500 },
    { id: 6, name: "Michael Johnson", age: 35, city: "Sydney", country: "Australia", money: 2000 },
    { id: 7, name: "John Doe", age: 30, city: "New York", country: "USA", money: 1000 },
    { id: 8, name: "Jane Smith", age: 25, city: "London", country: "UK", money: 1500 },
    { id: 9, name: "Michael Johnson", age: 35, city: "Sydney", country: "Australia", money: 2000 },
    { id: 10, name: "Emily Davis", age: 28, city: "Toronto", country: "Canada", money: 2500 }
  ]

  // const { favorites, toggleFavorite } = useFavorites("dashboardUsers");

  const [selected, setSelected] = useState<string[]>([]);
  const options = ["חףךלחע", "גיל", "עיר", "מדינה", "כסף", "אפשרות 6", "אפשרות 7", "אפשרות 8", "אפשרות 9", "אפשרות 10"];













  return (
    <div className={style.containerWrapper}>
      <h4 style={{ flex: 1 }}>דשבורד למפקד</h4>

      {/* <KeyValPopUp header="תרג”ד חי”ר סדיר" keyValues={keyValues} /> */}
      {/* <ResourcePopUp resourceDetailsTable={resourceDetailsTable} /> */}

      {/* <FiltersPanel /> */}











      {/* <DashboardTable
          columns={columns}
          data={data}
          favoriteRows={favorites}
          onToggleFavorite={toggleFavorite}
      /> */}


      

      <DropdownMultiSelect
          search
          options={options}
          selectedOptions={selected}
          onChange={setSelected}
      />




      <div className={style.imgsContainer}>
        <img
          src="/dashboard-image-gray.png"
          alt="Dashboard Image"
          className={style.iconImage}
          onClick={() => navigate("/")}
        />
        <img
          src="/dashboard-image-blue.png"
          alt="Dashboard Image"
          className={style.iconImage}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};
