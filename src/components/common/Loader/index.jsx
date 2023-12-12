import styles from "./Styles.module.css";

const Loader = () => {
  return (
    <div className="overflow-hidden">
      <div className={styles.drawing} id="loading">
        <div className={styles.loading__dot}></div>
      </div>
    </div>
  );
};

export default Loader;
