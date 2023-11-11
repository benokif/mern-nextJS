import styles from "./loading.module.css"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

