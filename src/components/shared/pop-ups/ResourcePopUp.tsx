import { SecondaryPopUp } from "./SecondaryPopUp"
import style from "@/style/components/shared/pop-ups/ResourcePopUp.module.css"


interface ResourcePopUpProps {
    resourceDetailsTable: { item: string, quantity: number, price: number }[]
}

export const ResourcePopUp = ({ resourceDetailsTable }: ResourcePopUpProps) => {
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
                    {resourceDetailsTable.map((res, index) => (
                        <tr key={index}>
                            <td className={style.resourceItem}>{res.item}</td>
                            <td>{res.quantity}</td>
                            <td>{res.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SecondaryPopUp>
    )
}