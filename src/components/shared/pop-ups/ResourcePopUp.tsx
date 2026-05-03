import { SecondaryPopUp } from "./SecondaryPopUp"
import { getResourceItemIcon } from "@/constants/budgetResources"
import style from "@/style/components/shared/pop-ups/ResourcePopUp.module.css"


interface ResourcePopUpProps {
    resName?: string;
    resourceDetailsTable: { name: string, quantity: number, unitCost: number }[]
}

export const ResourcePopUp = ({ resName, resourceDetailsTable }: ResourcePopUpProps) => {
    return(
        <SecondaryPopUp>
            <table className={style.resourceTable}>
                <thead>
                    <tr>
                        <th>שם פריט</th>
                        <th>כמות</th>
                        <th>מחיר פרט</th>
                    </tr>
                </thead>
                <tbody>
                    {resourceDetailsTable.map((item, index) => (
                        <tr key={index}>
                            <td className={style.resourceItem}>
                                <i className={getResourceItemIcon(resName, item.name)} />
                                {item.name}
                            </td>
                            <td>{item.quantity}</td>
                            <td>{item.unitCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SecondaryPopUp>
    )
}