import { COST_TABLE } from '../algorithm/mazeGenerator.js';

const COLORS = {
  Enhancer: '#36d17b',
  Transmuter: '#e9c46a',
  Conjurer: '#64b5f6',
  Manipulator: '#f4a261',
  Emitter: '#ef476f',
  Specialist: '#b388ff',
  wall: '#07100d',
  fog: '#020403',
  revealedFog: '#10231d',
  player: '#ffffff',
  shadow: '#111111',
  goal: '#00f5d4',
  path: 'rgba(255,255,255,0.36)'
};

export { COLORS };

export class GridCanvas {
  constructor(canvas, onCellClick) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onCellClick = onCellClick;
    this.canvas.addEventListener('click', e => this.handleClick(e));
  }

  bindState(state) { this.state = state; }

  handleClick(e) {
    if (!this.state) return;
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const cellSize = this.canvas.width / this.state.grid.length;
    const x = Math.floor((e.clientX - rect.left) * scaleX / cellSize);
    const y = Math.floor((e.clientY - rect.top) * scaleY / cellSize);
    this.onCellClick({ x, y });
  }

  draw() {
    const { grid, player, opponent, goal, path, affinity } = this.state;
    const ctx = this.ctx;
    const size = grid.length;
    const cell = this.canvas.width / size;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const pathSet = new Set(path.map(p => `${p.x},${p.y}`));

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const c = grid[y][x];
        const px = x * cell, py = y * cell;
        if (!c.revealed) {
          ctx.fillStyle = COLORS.fog;
          ctx.fillRect(px, py, cell, cell);
        } else if (!c.visible) {
          ctx.fillStyle = COLORS.revealedFog;
          ctx.fillRect(px, py, cell, cell);
        } else if (c.wall) {
          ctx.fillStyle = COLORS.wall;
          ctx.fillRect(px, py, cell, cell);
        } else {
          ctx.fillStyle = COLORS[c.nen];
          ctx.globalAlpha = 0.72;
          ctx.fillRect(px, py, cell, cell);
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'rgba(0,0,0,0.32)';
          ctx.font = `${Math.max(9, cell * 0.28)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(COST_TABLE[affinity][c.nen], px + cell / 2, py + cell / 2);
        }
        if (pathSet.has(`${x},${y}`) && c.revealed && !c.wall) {
          ctx.fillStyle = COLORS.path;
          ctx.fillRect(px + cell * 0.32, py + cell * 0.32, cell * 0.36, cell * 0.36);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.strokeRect(px, py, cell, cell);
      }
    }

    this.marker(goal, COLORS.goal, '◎');
    this.marker(opponent, COLORS.shadow, 'S');
    this.marker(player, COLORS.player, 'P');
  }

  marker(pos, color, label) {
    const size = this.state.grid.length;
    const cell = this.canvas.width / size;
    const ctx = this.ctx;
    const cx = pos.x * cell + cell / 2;
    const cy = pos.y * cell + cell / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, cell * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color === COLORS.shadow ? '#fff' : '#04100d';
    ctx.font = `bold ${Math.max(10, cell * 0.38)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, cx, cy);
  }
}
