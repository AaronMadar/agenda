import styles from '@/style/components/shared/loading/LoadingOverlay.module.css';

type Props = {
  loading: boolean;
  children: React.ReactNode;
};

export const LoadingOverlay = ({ loading, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.loader}>
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      <div className={loading ? styles.contentLoading : styles.content}>
        {children}
      </div>
    </div>
  );
};
