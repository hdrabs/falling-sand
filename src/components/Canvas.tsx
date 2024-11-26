import React, { useEffect, useRef } from "react";
import { Particle } from "../types";

interface CanvasProps {
  grid: Particle[][];
  pixelSize: number; // Size of each particle in pixels
  onCanvasClick: (x: number, y: number) => void; // Callback for click events
}

const Canvas: React.FC<CanvasProps> = ({ grid, pixelSize, onCanvasClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render each particle in the grid
    grid.forEach((row, y) => {
      row.forEach((particle, x) => {
        ctx.fillStyle =
          particle === "sand"
            ? "yellow"
            : particle === "water"
            ? "blue"
            : particle === "stone"
            ? "gray"
            : "white"; // Default color for "empty"

        ctx.fillRect(
          x * pixelSize,
          y * pixelSize,
          pixelSize,
          pixelSize
        );
      });
    });
  }, [grid, pixelSize]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);

    onCanvasClick(x, y); // Notify parent component
  };

  return (
    <canvas
      ref={canvasRef}
      width={grid[0].length * pixelSize}
      height={grid.length * pixelSize}
      onClick={handleClick}
      style={{ border: "1px solid black", cursor: "pointer" }}
    />
  );
};

export default Canvas;
