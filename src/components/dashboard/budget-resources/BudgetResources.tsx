import { useEffect, useState } from "react";
import style from "@/style/components/dashboard/budget-resources/BudgetResources.module.css";
import { ResourceCard } from "../../shared/ResourceCard";
import { getResources } from "@/api/dashboard.api";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

interface Resource {
  name: string;
  amount: number;
  percentage: number;
}

export const BudgetResources = () => {
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        console.error("Failed to load resources", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorState message={error} />;
  if (!resources || resources.length === 0) return <EmptyState message="אין משאבים להצגה" />;

  return (
    <div className={style.budgetResources}>
      <h4>משאבים תקציב</h4>
      <div className={style.grid}>
        {!resources?.length && <div>No resources available</div>}
        {resources?.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
};