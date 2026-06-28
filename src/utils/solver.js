/**
 * Integrates Lotka-Volterra predator-prey dynamics over 100 iterations.
 * @param {number} alpha - Prey birth rate
 * @param {number} gamma - Predator death rate
 * @returns {object} Object containing array of population data and max valuation reached
 */
export function runSimulation(alpha, gamma) {
  const steps = 100;
  const dt = 0.5;
  const beta = 0.015;  // Predation rate
  const delta = 0.004;  // Predator birth rate from consumption
  
  let prey = 50;  // Initial prey
  let pred = 12;  // Initial predator
  
  const data = [{ prey, pred }]; // Initial state at t = 0
  let maxVal = 50;

  for (let i = 1; i < steps; i++) {
    const prevPrey = data[i - 1].prey;
    const prevPred = data[i - 1].pred;
    
    const dPrey = alpha * prevPrey - beta * prevPrey * prevPred;
    const dPred = delta * prevPrey * prevPred - gamma * prevPred;
    
    prey = Math.max(0.1, prevPrey + dPrey * dt);
    pred = Math.max(0.1, prevPred + dPred * dt);
    
    if (prey > maxVal) maxVal = prey;
    if (pred > maxVal) maxVal = pred;

    data.push({ prey, pred });
  }
  return { data, maxVal };
}
