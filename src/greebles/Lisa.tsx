import React, { useState, CSSProperties } from "react";
import styles from "./Lisa.module.css";

const Lisa = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const handleClick = () => {
    setAnimationStarted(!animationStarted);
  };

  const heartStyle: CSSProperties = {
    animation: animationStarted ? "heartbeat 1s infinite" : "none",
  };

  return (
    <>
      <style>
        {`
          @keyframes heartbeat {
            0% {
              transform: scale(0.75);
            }
            20% {
              transform: scale(1);
            }
            40% {
              transform: scale(0.75);
            }
            60% {
              transform: scale(1);
            }
            80% {
              transform: scale(0.75);
            }
            100% {
              transform: scale(0.75);
            }
          }
        `}
      </style>
      <div className={styles.container} onClick={handleClick}>
        <div className={styles.heart} style={heartStyle}></div>
        <div className={styles.text}>greebled with love by lisatomic (click me)</div>
      </div>
    </>
  );
};

export default Lisa;