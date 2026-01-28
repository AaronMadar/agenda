import style from "@/style/components/dashboard/reports/Reports.module.css"


interface ReportsProps {
    reports?: string[];
}

export const Reports = ({ reports }: ReportsProps) => {
    return (
        <ul className={style.list}>
            {reports?.map((report, index) => (
                <li key={index} className={style.item}>
                    {report}
                </li>
            ))}
        </ul>
    );
};