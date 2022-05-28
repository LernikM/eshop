import React, { useMemo, useState } from "react";
import styles from "./Home.module.scss";
import { Button, Input } from "@wf/components";
import Loader from "@wf/keycloak-axios-provider/dist/es/src/components/Loader/Loader";
import axios from "axios";

const Home = () => {
  const [value, setValue] = useState("");
  const [firstData, setFirstData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calorieCount = useMemo(() => {
    let count = 0;
    lastData.forEach(el => {
      count = count + el.calorie;
    });
    return count;
  }, [lastData]);

  const totalValues = useMemo(() => {
    let massCount = 0;
    let amountCount = 0;
    lastData.forEach(el => {
      massCount = massCount + el.mass;
      amountCount = amountCount + el.amount;
    });
    firstData.forEach(el => {
      massCount = massCount + el.mass;
      amountCount = amountCount + el.amount;
    });
    return { massCount, amountCount };
  }, [lastData, firstData]);

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8060/eshop/product/getByHsCode/${value}`)
      .then(({ data }) => {
        if (data.calorie === 0) {
          setFirstData([{ ...data, id: Math.random() }, ...firstData]);
        } else {
          setLastData([{ ...data, id: Math.random() }, ...lastData]);
        }
      })
      .catch(() => {
        setError("Invalid Code");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = (index, type) => {
    if (type === 0) {
      const newData = firstData.filter(el => el.id !== index);
      setFirstData(newData);
    } else {
      const newData = lastData.filter(el => el.id !== index);
      setLastData(newData);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.firstContent}>
            {lastData.map(el => (
              <div key={el.id} className={styles.item}>
                <div className={styles.info}>
                  <span>
                    <b>Արժեք:</b> {el.amount}
                  </span>
                  <span>
                    <b>Կազմակերպության անուն:</b> {el.companyName}
                  </span>
                  <span>
                    <b>Արտադրող երկիր:</b> {el.country}
                  </span>
                  <span>
                    <b>Նկարագրություն:</b> {el.description}
                  </span>
                  <span>
                    <b>Կալորիականություն:</b> {el.calorie}
                  </span>
                  <span>
                    <b>Անուն:</b> {el.name}
                  </span>
                  <span>
                    <b>Արտադրման ամսաթիվ:</b> {el.validFrom}
                  </span>
                  <span>
                    <b>Պիտանի է մինչև:</b> {el.validTo}
                  </span>
                  <span>
                    <b>Քաշ:</b> {el.mass}
                  </span>
                </div>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div className={styles.closeIcon} onClick={() => handleClose(el.id, 1)}>
                  x
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalInfo}>
            {" "}
            <p className={styles.innerTotal}>
              <span>
                <b>Ընդհանուր :</b> {calorieCount}
              </span>
              <span>
                <b>Կալորիա</b>
              </span>
            </p>
          </div>
        </div>

        <div className={styles.content}>
          {firstData.map(el => (
            <div key={el.id} className={styles.item}>
              <div className={styles.info}>
                <span>
                  <b>Արժեք:</b> {el.amount}
                </span>
                <span>
                  <b>Կազմակերպության անուն:</b> {el.companyName}
                </span>
                <span>
                  <b>Արտադրող երկիր:</b> {el.country}
                </span>
                <span>
                  <b>Նկարագրություն:</b> {el.description}
                </span>
                <span></span>
                <span>
                  <b>Քաշ:</b> {el.mass}
                </span>
                <span>
                  <b>Անուն:</b> {el.name}
                </span>
                <span>
                  <b>Արտադրման ամսաթիվ:</b> {el.validFrom}
                </span>
                <span>
                  <b>Պիտանի է մինչև:</b> {el.validTo}
                </span>
              </div>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div className={styles.closeIcon} onClick={() => handleClose(el.id, 0)}>
                x
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.action}>
        <div className={styles.inputWrap}>
          <Input
            value={value}
            onChange={e => {
              setValue(e.target.value);
              if (error) {
                setError(null);
              }
            }}
            maxLength={8}
            type={"number"}
            errorMessage={error}
            label={"Ապրանքի ունիկալ կոդ"}
            hasError={!!error?.length}
          />
          <Button className={styles.submit} onClick={() => handleSearch()} disabled={!value.length || loading}>
            {loading && <Loader className={styles.loader} />}
            {!loading && "Ավելացնել"}
          </Button>
        </div>
        <div className={styles.process}>
          <span className={styles.total}>
            <span>
              <b>Ընդհանուր :</b> {totalValues.massCount}
            </span>
            <span>
              <b>Կիլոգրամ</b>
            </span>
          </span>
          <span className={styles.total}>
            {" "}
            <span>
              <b>Ընդհանուր :</b> {totalValues.amountCount}
            </span>
            <span>
              <b>Դրամ</b>
            </span>
          </span>
          <Button className={styles.processButton}>ՎՃԱՐԵԼ</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
