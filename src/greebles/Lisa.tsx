"use client";

import React, { useState } from "react";

const Lisa = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const handleClick = () => {
    setAnimationStarted(!animationStarted);
  };

  const containerStyle = {
    position: "relative",
    cursor: "pointer",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  };

  const heartStyle = {
    position: "absolute",
    width: "100px",
    height: "90px",
    animation: animationStarted ? "heartbeat 1s infinite" : "none",
    margin: "0 auto",
    zIndex: "1",
  };

  const textStyle = {
    fontSize: "10px",
    color: "#fff",
    textAlign: "center",
    zIndex: "2",
    position: "absolute",
    bottom: "5px",
    right: "5px",
  };

  return (
    <>
      <style>{`
        #heart:before,
        #heart:after {
          position: absolute;
          content: "";
          left: 50px;
          top: 0;
          width: 50px;
          height: 80px;
          background: #c33;
          border-radius: 50px 50px 0 0;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
        }
        #heart:after {
          left: 0;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }

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
      `}</style>
      <div style={containerStyle} onClick={handleClick}>
        <div id="heart" style={heartStyle}></div>
        <div style={textStyle}>made with love by lisatomic (click me)</div>
      </div>
    </>
  );
};

export default Lisa;