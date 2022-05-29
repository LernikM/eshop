import React from "react";
import styles from "./Loading.module.scss";

type Props = {
  alwaysShow?: boolean;
};

const Loading: React.FC<Props> = ({ alwaysShow = false }) => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loading;
