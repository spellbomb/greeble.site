"use client";

import React, { useState } from "react";

type LoopyProps = {
  onGreebleStateChange: (newState: string) => void;
};

const Loopy: React.FC<LoopyProps> = ({ onGreebleStateChange }) => {
  const [greebleState, setGreebleState] = useState<string>("small");
  const unselectableStyle: React.CSSProperties = { userSelect: "none" };

  const handleClick = () => {
    const newState =
      greebleState === "small"
        ? "long"
        : greebleState === "long"
        ? "tall"
        : "small";
    setGreebleState(newState);
    onGreebleStateChange(newState);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        borderWidth: "1px",
        borderStyle: "dashed",
        borderColor: "transparent",
        padding: "4px",
        borderImage:
          "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) 1",
      }}
    >
      <div
        style={{
          fontSize: "3em",
          position: "relative",
          top: 0,
          ...unselectableStyle,
        }}
      >
        Loopy&apos;s Greeble
      </div>
      <div style={{ fontSize: "2em", ...unselectableStyle }}>
        {greebleState === "small" ? (
          <div>Make me long ;^)</div>
        ) : greebleState === "long" ? (
          <div>Make me tall</div>
        ) : (
          <div>Make me small</div>
        )}
      </div>
    </div>
  );
};

export default Loopy;
