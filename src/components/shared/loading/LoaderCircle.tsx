import style from '@/style/components/shared/loading/LoaderCircle.module.css';

type LoaderProps = {
  size?: number;
  text?: string;
  fullHeight?: boolean;
};

export const LoaderCircle = ({
  size = 46,
  text,
  fullHeight = false,
}: LoaderProps) => {
  return (
    <div
      className={`${style.loaderWrapper} ${fullHeight ? style.fullHeight : ''}`}
    >
      <div
        className={style.loader}
        style={
          {
            '--size': `${size}px`,
          } as React.CSSProperties
        }
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {text && <p className={style.text}>{text}</p>}
    </div>
  );
};
