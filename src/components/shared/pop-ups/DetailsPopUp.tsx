import { SecondaryPopUp } from "./SecondaryPopUp"
import { RequestIcon, DownloadDocumentIcon, DashboardIcon, ShibutzAddIcon } from "@/assets/icons";
import style from "@/style/components/shared/pop-ups/DetailsPopUp.module.css"


export const DetailsPopUp = () => {
    return (
        <SecondaryPopUp>
            <div className={style.btnCell}>
                <RequestIcon className={style.icon} />
                <div className={style.caption}>
                    הגשת בקשה
                </div>
            </div>
            <div className={style.divider} />
            
            <div className={style.btnCell}>
                <DownloadDocumentIcon className={style.icon} />
                <div className={style.caption}>
                    מסמכים להורדה
                </div>
            </div>
            <div className={style.divider} />

            <div className={style.btnCell}>
                <DashboardIcon className={style.icon} />
                <div className={style.caption}>
                    דשבורד
                </div>
            </div>
            <div className={style.divider} />

            <div className={style.btnCell}>
                <ShibutzAddIcon className={style.icon} />
                <div className={style.caption}>
                    הוספת שיבוץ
                </div>
            </div>
        </SecondaryPopUp>
    )
}