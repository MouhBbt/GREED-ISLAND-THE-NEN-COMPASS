export function keyOf(cell) {
  return `${cell.x},${cell.y}`;
}

export function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function neighbors(grid, cell) {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const result = [];
  for (const [dx, dy] of dirs) {
    const x = cell.x + dx;
    const y = cell.y + dy;
    if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && !grid[y][x].wall) {
      result.push({ x, y });
    }
  }
  return result;
}

export function aStar(grid, start, goal, costFn = () => 1) {
  const open = [start];
  const cameFrom = new Map();
  const gScore = new Map([[keyOf(start), 0]]);
  const fScore = new Map([[keyOf(start), heuristic(start, goal)]]);
  const closed = new Set();

  while (open.length) {
    open.sort((a, b) => (fScore.get(keyOf(a)) ?? Infinity) - (fScore.get(keyOf(b)) ?? Infinity));
    const current = open.shift();
    const currentKey = keyOf(current);
    if (current.x === goal.x && current.y === goal.y) return reconstruct(cameFrom, current);
    closed.add(currentKey);

    for (const next of neighbors(grid, current)) {
      const nextKey = keyOf(next);
      if (closed.has(nextKey)) continue;
      const tentative = (gScore.get(currentKey) ?? Infinity) + costFn(grid[next.y][next.x]);
      if (!open.some(c => c.x === next.x && c.y === next.y)) open.push(next);
      if (tentative >= (gScore.get(nextKey) ?? Infinity)) continue;
      cameFrom.set(nextKey, current);
      gScore.set(nextKey, tentative);
      fScore.set(nextKey, tentative + heuristic(next, goal));
    }
  }
  return [];
}

function reconstruct(cameFrom, current) {
  const path = [current];
  while (cameFrom.has(keyOf(current))) {
    current = cameFrom.get(keyOf(current));
    path.unshift(current);
  }
  return path;
}
