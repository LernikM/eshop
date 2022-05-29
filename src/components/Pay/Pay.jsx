import React, { useCallback, useState } from "react";
import styles from "./Pay.module.scss";
import { Button } from "@wf/components";
import { useHistory } from "react-router";
import Loading from "../sherd/Loading";
import axios from "axios";

const Pay = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const handleClick = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    const requestData = [...data?.firstData, ...data?.lastData].map(el => el.hsCode);
    axios
      .post("http://192.168.1.42:8060/eshop/transaction", requestData)
      .then(() => history.push("/result"))
      .catch(() => console.log("try"));
  }, []);
  return (
    <div className={styles.pay}>
      <div className={styles.totalInfo}>
        <p className={styles.innerTotal}>
          <span>
            <b>Ընդհանուր</b>
          </span>
        </p>
      </div>
      {loading && (
        <div className={styles.loader}>
          <Loading />
        </div>
      )}
      <div className={styles.buttonWrap}>
        <Button className={styles.processButton} onClick={() => history.push("/")}>
          Back
        </Button>
        <Button className={styles.processButton} onClick={handleClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pay;
