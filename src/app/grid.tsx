"use client";

import React, { useState } from "react";
import styles from "./grid.module.css";
import Cam from "../greebles/Cam";
import LoopySize from "../greebles/LoopySize";
import LoopySnake from "../greebles/LoopySnake";

const Grid = () => {
  const [greebleState, setGreebleState] = useState("small");

  const handleGreebleStateChange = (newState: string) => {
    setGreebleState(newState);
  };

  const getGreebleStyles = () => {
    switch (greebleState) {
      case "small":
        return {};
      case "long":
        return { gridColumn: "span 2", gridRow: "span 1" };
      case "tall":
        return { gridColumn: "span 2", gridRow: "span 2" };
      default:
        return {};
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.gridItem} style={{ gridColumn: "span 2" }}>
        <p>first item</p>
      </div>
      <div>
        <Cam />
      </div>
      <div style={getGreebleStyles()}>
        <LoopySize onGreebleStateChange={handleGreebleStateChange} />
      </div>
      <div className={styles.gridItem}>
        <p>another item</p>
      </div>
      <div className={styles.gridItem}>
        <p>another item</p>
      </div>
      <div className={styles.gridItem}>
        <p>another item</p>
      </div>
      <div className={styles.gridItem}>
        <p>another item</p>
      </div>
    </div>
  );
};

export default Grid;
