export type Particle = "empty" | "sand" | "water" | "stone";

export interface Grid {
  rows: Particle[][];
}
