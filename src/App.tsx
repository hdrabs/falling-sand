import React, { useState, useEffect } from "react";
import { createGrid } from "./utils/grid";
import { applyGravity } from "./utils/physics";
import Canvas from "./components/Canvas";
import { Particle } from "./types";

const App: React.FC = () => {
  const [grid, setGrid] = useState(createGrid(50, 50)); // 50x50 grid
  const [selectedParticle, setSelectedParticle] = useState<Particle>("sand"); // Default particle
  const pixelSize = 10; // Size of each grid cell

  const handleCanvasClick = (x: number, y: number) => {
    const newGrid = grid.map((row) => [...row]); // Create a copy of the grid
    if (x >= 0 && y >= 0 && y < newGrid.length && x < newGrid[0].length) {
      newGrid[y][x] = selectedParticle; // Place the selected particle
    }
    setGrid(newGrid);
  };

  // Apply gravity at a regular interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => applyGravity(prevGrid));
    }, 80); // Update every 200ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Reset grid to empty
  const handleReset = () => {
    setGrid(createGrid(50, 50)); // Reset to empty grid
  };

  return (
    <div>
      <h1>Falling Sand Simulation</h1>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setSelectedParticle("sand")}>Sand</button>
        <button onClick={() => setSelectedParticle("water")}>Water</button>
        <button onClick={() => setSelectedParticle("stone")}>Stone</button>
        <button onClick={handleReset}>Reset</button> {/* Reset button */}
      </div>
      <Canvas grid={grid} pixelSize={pixelSize} onCanvasClick={handleCanvasClick} />
    </div>
  );
};

export default App;
