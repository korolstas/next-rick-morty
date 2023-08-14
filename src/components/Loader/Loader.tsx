import React from "react";
import styles from "./loader.module.less";

const Loader = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
    </div>
  );
};

export default Loader;
