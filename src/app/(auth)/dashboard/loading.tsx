import FormRow from "@/components/FormRow";
import styles from "./loading.module.css";
import SubmitBtn from "@/components/SubmitBtn";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className={styles.section}>
      <form className={`form ${styles.form}`}>
        <h4 className={styles.formTitle}>loading...</h4>
        <div className={styles.formCenter}>

          <div className={`form-row ${styles.formRow}`}>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonText}`}
              ></div>
            </label>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonInput}`}
              ></div>
            </label>
          </div>
          <div className={`form-row ${styles.formRow}`}>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonText}`}
              ></div>
            </label>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonInput}`}
              ></div>
            </label>
          </div>
          <div className={`form-row ${styles.formRow}`}>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonText}`}
              ></div>
            </label>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonInput}`}
              ></div>
            </label>
          </div>
          <div className={`form-row ${styles.formRow}`}>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonText}`}
              ></div>
            </label>
            <label className={`form-label`}>
              <div
                className={`${styles.skeleton} ${styles.skeletonInput}`}
              ></div>
            </label>
          </div>
          <div
            className={`${styles.skeleton} ${styles.skeletonBtn}`}  
            
          ></div>
          <div
            className={`${styles.skeleton} ${styles.skeletonBtn}`}
            
          ></div>
        </div>
      </form>
    </section>
  );
}
