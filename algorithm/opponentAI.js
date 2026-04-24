import { aStar } from './aStar.js';
import { COST_TABLE } from './mazeGenerator.js';

export function getOpponentPath(grid, opponent, goal) {
  return aStar(grid, opponent, goal, cell => COST_TABLE.Emitter[cell.nen]);
}

export function moveOpponent(grid, opponent, goal) {
  const path = getOpponentPath(grid, opponent, goal);
  return path.length > 1 ? path[1] : opponent;
}
