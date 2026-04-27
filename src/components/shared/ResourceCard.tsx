// import style from "@/style/components/shared/ResourceCard.module.css"
// import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
// import type { Resource } from "./resourceCard.types";


// interface ResourceCardProps {
//   resource: Resource;
//   noBackground?: boolean;
// }

// const convertToMOrK = (amount: number) => {
//   if (amount >= 1_000_000) {
//     return (amount / 1_000_000).toFixed(0) + "M";
//   } else if (amount >= 1_000) {
//     return (amount / 1_000).toFixed(0) + "K";
//   } else {
//     return amount.toString();
//   }
// }

// export const ResourceCard = ({ resource, noBackground = false }: ResourceCardProps) => {
//   return (
//     <div
//       className={`${style.containerWrapper} ${
//         noBackground ? style.noBackground : ""
//       }`}
//     >
//       <h4 className={style.header} >{resource.name}</h4>
//       <div className={style.details}>
//         <div className={style.amount}>{convertToMOrK(resource.amount)}</div>
//         <PercentageWithArrow value={resource.percentage} />
//       </div>
//     </div>
//   );
// };
