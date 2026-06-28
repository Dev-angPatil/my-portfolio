import { runSimulation } from "./solver";

describe("Lotka-Volterra Equation Solver Tests", () => {
  test("Simulation integration runs successfully with correct sizes", () => {
    const { data, maxVal } = runSimulation(0.15, 0.12);
    
    // Assert exactly 100 steps calculated
    expect(data).toHaveLength(100);
    
    // Assert max value is populated
    expect(maxVal).toBeGreaterThanOrEqual(50); // initial prey is 50
  });

  test("Initial conditions are correct in step 0", () => {
    const { data } = runSimulation(0.15, 0.12);
    
    // Check initial state
    expect(data[0].prey).toBeCloseTo(50, 1);
    expect(data[0].pred).toBeCloseTo(12, 1);
  });

  test("Values stay within physical boundaries (greater than 0)", () => {
    const { data } = runSimulation(0.01, 0.30); // Very low prey growth, high predator death
    
    data.forEach((step) => {
      expect(step.prey).toBeGreaterThanOrEqual(0.1);
      expect(step.pred).toBeGreaterThanOrEqual(0.1);
    });
  });
});
