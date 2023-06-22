import styles from './line.module.css';
export const Line = (props: { x: number; y: number; color: number; onClick: () => void }) => {
  return (
    <div className={styles.line} onClick={props.onClick}>
      {props.color !== 0 && (
        <div className={styles.stone} style={{ background: props.color === 1 ? '#000' : '#fff' }} />
      )}
    </div>
  );
};
