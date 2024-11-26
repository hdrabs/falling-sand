import { Particle } from "../types";

/**
 * Creates a 2D grid initialized with "empty" particles.
 * @param width Number of columns in the grid.
 * @param height Number of rows in the grid.
 * @returns A 2D array of particles.
 */
export const createGrid = (width: number, height: number): Particle[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "empty")
  );
};
