export const NEN_TYPES = ["Enhancer", "Transmuter", "Conjurer", "Manipulator", "Emitter", "Specialist"];

export const COST_TABLE = {
  Enhancer:     { Enhancer: 1, Transmuter: 3, Conjurer: 4, Manipulator: 5, Emitter: 2, Specialist: 4 },
  Transmuter:   { Enhancer: 3, Transmuter: 1, Conjurer: 5, Manipulator: 4, Emitter: 2, Specialist: 4 },
  Conjurer:     { Enhancer: 4, Transmuter: 5, Conjurer: 1, Manipulator: 3, Emitter: 4, Specialist: 2 },
  Manipulator:  { Enhancer: 5, Transmuter: 4, Conjurer: 3, Manipulator: 1, Emitter: 4, Specialist: 3 },
  Emitter:      { Enhancer: 2, Transmuter: 2, Conjurer: 4, Manipulator: 4, Emitter: 1, Specialist: 4 },
  Specialist:   { Enhancer: 4, Transmuter: 4, Conjurer: 2, Manipulator: 3, Emitter: 4, Specialist: 1 }
};

function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function randomNen(rand) {
  return NEN_TYPES[Math.floor(rand() * NEN_TYPES.length)];
}

export function generateMaze(size = 20, seed = Date.now()) {
  const rand = rng(seed);
  const grid = Array.from({ length: size }, (_, y) => Array.from({ length: size }, (_, x) => ({
    x, y, wall: true, nen: randomNen(rand), visible: false, visited: false, revealed: false
  })));

  // Recursive backtracker on odd coordinates creates a guaranteed connected maze.
  const carve = (x, y) => {
    grid[y][x].wall = false;
    const dirs = [[2,0],[-2,0],[0,2],[0,-2]].sort(() => rand() - 0.5);
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (ny > 0 && ny < size - 1 && nx > 0 && nx < size - 1 && grid[ny][nx].wall) {
        grid[y + dy / 2][x + dx / 2].wall = false;
        carve(nx, ny);
      }
    }
  };
  carve(1, 1);

  // Open start and opponent corners, plus a few loops so weighted pathfinding matters.
  const forced = [[0,0],[1,0],[0,1],[1,1],[size-1,size-1],[size-2,size-1],[size-1,size-2],[size-2,size-2]];
  for (const [x,y] of forced) grid[y][x].wall = false;
  for (let i = 0; i < size * 2; i++) {
    const x = 1 + Math.floor(rand() * (size - 2));
    const y = 1 + Math.floor(rand() * (size - 2));
    grid[y][x].wall = false;
  }

  // Pick a hidden center target from walkable cells near the mathematical center.
  const candidates = [];
  for (let y = 8; y <= 11; y++) for (let x = 8; x <= 11; x++) {
    grid[y][x].wall = false;
    candidates.push({ x, y });
  }
  const goal = candidates[Math.floor(rand() * candidates.length)];
  return { grid, start: { x: 0, y: 0 }, opponentStart: { x: size - 1, y: size - 1 }, goal, seed };
}
