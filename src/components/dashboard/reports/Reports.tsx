import { useEffect, useState } from "react";
import style from "@/style/components/dashboard/reports/Reports.module.css";
import { getReports } from "@/api/dashboard.api";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoaderCircle } from "@/components/shared/loading/LoaderCircle";

export const Reports = () => {
  const [reports, setReports] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        console.error("Failed to load reports", err);
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className={style.reports}>
      <h4>דיווחים</h4>

      {loading ? (
        <div className={style.emptyState}>
          <LoaderCircle text="טוען דיווחים..." />
        </div>
      ) : error ? (
        <div className={style.emptyState}>
          <ErrorState message={error} />
        </div>
      ) : !reports?.length ? (
        <div className={style.emptyState}>
          <EmptyState message="אין דיווחים להצגה" />
        </div>
      ) : (
        <ul className={style.list}>
          {reports.map((report, index) => (
            <li key={index} className={style.item}>
              {report}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};