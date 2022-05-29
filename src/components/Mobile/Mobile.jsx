import React, { useEffect, useState } from "react";
import styles from "./Mobile.module.scss";
import axios from "axios";
import cx from "classnames";
import { getCurrentDay } from "../../utils";
import { Button } from "@wf/components/dist/cjs";
import { useKeycloakContext } from "@wf/keycloak-axios-provider";

const Mobile = () => {
  const [list, setList] = useState(null);
  const { logout } = useKeycloakContext();
  useEffect(() => {
    axios.get("http://192.168.1.42:8060/eshop/transaction").then(({ data }) => {
      setList(data);
    });
  }, []);
  const handleRowClick = index => {
    const newList = list.map(el => {
      if (el.transactionDate === index) {
        return { ...el, isActive: !el?.isActive };
      }
      return el;
    });
    console.log(newList, index, "newList");
    setList(newList);
  };
  return (
    <div className={styles.mobile}>
      <div className={styles.content}>
        <div className={styles.title}>ttt test my</div>
        {list &&
          list.map(el => {
            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div className={styles.wrap} key={el.transactionDate} onClick={() => handleRowClick(el.transactionDate)}>
                <div className={styles.item}>
                  <p className={styles.transactionDate}>{getCurrentDay(el.transactionDate)}</p>{" "}
                  <div className={cx(styles.icon, { [styles.active]: el.isActive })}>{`>`}</div>
                </div>
                {el.isActive && (
                  <div className={styles.transactionResponseDto}>
                    <div className={styles.productList}>
                      {el.transactionResponseDto.productList.map(product => {
                        return (
                          <div key={Math.random()} className={styles.productListItem}>
                            <span>
                              <b>name: </b>
                              {product.name}
                            </span>
                            <span>
                              <b>description: </b>
                              {product.description}
                            </span>
                            <span>
                              <b>companyName: </b>
                              {product.companyName}
                            </span>
                            <span>
                              <b>country: </b>
                              {product.country}
                            </span>
                            <span>
                              <b>validFrom: </b>
                              {product.validFrom}
                            </span>
                            <span>
                              <b>validTo: </b>
                              {product.validTo}
                            </span>
                            <span>
                              <b>mass: </b>
                              {product.mass}
                            </span>
                            <span>
                              <b>calorie: </b>
                              {product.calorie === 0 ? "N/A" : product.calorie}
                            </span>
                            <span>
                              <b>amount: </b>
                              {product.amount}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.total}>
                      <div className={styles.totals}>
                        <b>Total Amount :</b>
                        {el.transactionResponseDto.totalAmount}
                      </div>
                      <div className={styles.totals}>
                        <b>Total Mass :</b>
                        {el.transactionResponseDto.totalMass}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className={styles.button}>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
};

export default Mobile;
