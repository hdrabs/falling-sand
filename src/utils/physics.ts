import { Particle } from "../types";

/**
 * Applies gravity to the grid, handling particle interactions including stones.
 * @param grid The current grid state.
 * @returns A new grid with gravity applied.
 */
export const applyGravity = (grid: Particle[][]): Particle[][] => {
  const newGrid = grid.map((row) => [...row]); // Clone the grid

  // Apply gravity to sand, water, and prevent them from moving through stones
  for (let y = grid.length - 2; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      const particle = grid[y][x];

      if (particle === "sand" || particle === "water") {
        // Check the space below first
        const below = grid[y + 1][x];

        if (below === "empty") {
          newGrid[y][x] = "empty";
          newGrid[y + 1][x] = particle;
        }
        // If the space below is a stone, check sideways for water or sand
        else if (below === "stone" || below === "water") {
          if (particle === "water") {
            // Move water left or right if possible
            const left = x > 0 ? grid[y + 1][x - 1] : "empty";
            const right = x < grid[y].length - 1 ? grid[y + 1][x + 1] : "empty";

            if (left === "empty") {
              newGrid[y][x] = "empty";
              newGrid[y + 1][x - 1] = "water";
            } else if (right === "empty") {
              newGrid[y][x] = "empty";
              newGrid[y + 1][x + 1] = "water";
            }
          }
        }
      }
    }
  }

  return newGrid;
};
