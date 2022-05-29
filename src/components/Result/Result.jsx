import React, { useEffect } from "react";
import styles from "./Result.module.scss";
import { Button } from "@wf/components";
import { useKeycloakContext } from "@wf/keycloak-axios-provider";
import { useHistory } from "react-router";

const Result = () => {
  const history = useHistory();
  const { logout } = useKeycloakContext();
  const handleClick = () => {
    history.push("/");
    logout();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.result}>
      <div className={styles.loader}>
        <div className={styles.img}>
          <img src={require("./1.png")} alt={"img"} />
          <p className={styles.imgTitle}>barev</p>
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <span></span>
        <Button className={styles.processButton} onClick={handleClick}>
          Result
        </Button>
      </div>
    </div>
  );
};

export default Result;
