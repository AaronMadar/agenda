import { useEffect, useState } from "react";
import style from "@/style/components/dashboard/reports/Reports.module.css";
import { getReports } from "@/api/dashboard.api";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorState message={error} />;
  if (!reports || reports.length === 0) return <EmptyState message="אין דיווחים להצגה" />;

  return (
    <div className={style.reports}>
      <h4>דיווחים</h4>
      <ul className={style.list}>
        {!reports?.length && <li>No reports available</li>}
        {reports?.map((report, index) => (
          <li key={index} className={style.item}>
            {report}
          </li>
        ))}
      </ul>
    </div>
  );
};