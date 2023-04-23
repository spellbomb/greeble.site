"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./LoopySnake.module.css";

type LoopySnakeProps = {};

const LoopySnake: React.FC<LoopySnakeProps> = () => {
  const gridSize = 10;
  const initialSnake = [{ x: 2, y: 2 }];
  const gridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    width: "100%",
    height: "100%",
  };

  const cellStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
  };

  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    border: "1px dashed white",
    padding: "4px",
  };

  const gridWrapperStyles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  };
  const gridContainerStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  const rowStyles: React.CSSProperties = { display: "flex" };
  const snakeStyles: React.CSSProperties = { backgroundColor: "green" };
  const foodStyles: React.CSSProperties = { backgroundColor: "red" };

  type Direction = "up" | "down" | "left" | "right";

  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState<Direction>("right");
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5, y: 5 });
  const [gameState, setGameState] = useState<
    "default" | "playing" | "gameOver"
  >("default");

  const handleStartClick = () => {
    if (gameState === "default" || gameState === "gameOver") {
      setGameState("playing");
      gameInterval.current = setInterval(moveSnake, 500);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameState === "playing") {
        if (e.key === "ArrowUp" && direction !== "down") {
          setDirection("up");
        } else if (e.key === "ArrowDown" && direction !== "up") {
          setDirection("down");
        } else if (e.key === "ArrowLeft" && direction !== "right") {
          setDirection("left");
        } else if (e.key === "ArrowRight" && direction !== "left") {
          setDirection("right");
        }
      }
    },
    [gameState, direction]
  );

  const moveSnake = () => {
    const newSnake = snake.map((segment, index) => {
      if (index === 0) {
        const newHead = { ...segment };

        if (direction === "up") {
          newHead.y -= 1;
        } else if (direction === "down") {
          newHead.y += 1;
        } else if (direction === "left") {
          newHead.x -= 1;
        } else if (direction === "right") {
          newHead.x += 1;
        }

        return newHead;
      } else {
        return snake[index - 1];
      }
    });

    setSnake(newSnake);
    checkFood();
  };

  const generateRandomFoodPosition = () => {
    const randomX = Math.floor(Math.random() * gridSize);
    const randomY = Math.floor(Math.random() * gridSize);

    return { x: randomX, y: randomY };
  };

  const checkFood = () => {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      const newFoodPosition = generateRandomFoodPosition();
      setFood(newFoodPosition);
    }
  };

  const renderGrid = () => {
    const grid = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let cellClass = "grid-cell";

        snake.forEach((segment) => {
          if (segment.x === x && segment.y === y) {
            cellClass += " snake";
          }
        });

        if (food.x === x && food.y === y) {
          cellClass += " food";
        }

        grid.push(
          <div
            key={`cell-${x}-${y}`}
            className={cellClass}
            style={cellStyles}
          />
        );
      }
    }

    return grid;
  };

  const handleGameOver = () => {
    setGameState("gameOver");
    // Save high score and display it on the game over screen
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === "gameOver" && gameInterval.current) {
      clearInterval(gameInterval.current);
      gameInterval.current = null;
    }
  }, [gameState]);

  return (
    <div onClick={handleStartClick} style={containerStyles}>
      {gameState === "default" && <div>Start Game</div>}
      {gameState === "playing" && (
        <div style={gridWrapperStyles}>
          <div className="game" style={gridStyles}>
            {renderGrid()}
          </div>
        </div>
      )}
      {gameState === "gameOver" && <div>Game Over. Click to restart.</div>}
    </div>
  );
};

export default LoopySnake;
