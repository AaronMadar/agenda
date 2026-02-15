import { SecondaryPopUp } from "./SecondaryPopUp"
import style from "@/style/components/shared/pop-ups/KeyValPopUp.module.css"

interface KeyValPopUpProps {
    header: string,
    keyValues: { key: string, value: string }[]
}


export const KeyValPopUp = ({ header, keyValues }: KeyValPopUpProps) => {
    return(
        <SecondaryPopUp>
            <h4 className={style.header}>{header}</h4>
            <ul className={style.list}>
                {keyValues.map((kv, index) => (
                    <li className={style.listItem} key={index}>
                        <span className={style.key}>{kv.key}: </span>
                        <span>{kv.value}</span>
                    </li>
                ))}
            </ul>
        </SecondaryPopUp>
    )
}