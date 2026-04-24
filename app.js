import { aStar, heuristic } from './algorithm/aStar.js';
import { generateMaze, NEN_TYPES, COST_TABLE } from './algorithm/mazeGenerator.js';
import { updateFog } from './algorithm/fogOfWar.js';
import { moveOpponent } from './algorithm/opponentAI.js';
import { GridCanvas, COLORS } from './components/GridCanvas.js';
import { renderCompass } from './components/CompassUI.js';
import { buildAffinitySelector } from './components/AffinitySelector.js';

const canvas = document.getElementById('grid');
const setup = document.getElementById('setup');
const game = document.getElementById('game');
const statusEl = document.getElementById('status');
const compassEl = document.getElementById('compass');
const pathInfo = document.getElementById('pathInfo');
const startBtn = document.getElementById('startBtn');
const newGameBtn = document.getElementById('newGameBtn');
const legendEl = document.getElementById('legend');

let state;
let selectedAffinity = 'Enhancer';
let opponentTimer = null;
let playerLocked = false;

const gridCanvas = new GridCanvas(canvas, onCellClick);

function init(seed = Date.now()) {
  if (opponentTimer) clearInterval(opponentTimer);
  const generated = generateMaze(20, seed);
  state = {
    ...generated,
    player: { ...generated.start },
    opponent: { ...generated.opponentStart },
    affinity: selectedAffinity,
    path: [],
    running: false,
    won: false,
    lost: false
  };
  updateFog(state.grid, state.player);
  recalcPath();
  gridCanvas.bindState(state);
  renderLegend();
  draw();
}

function startGame() {
  setup.classList.add('hidden');
  game.classList.remove('hidden');
  state.affinity = selectedAffinity;
  state.running = true;
  setStatus(`Trial started. Affinity: ${state.affinity}. Find the center before the Shadow Hunter.`);
  updateFog(state.grid, state.player);
  recalcPath();
  draw();
  opponentTimer = setInterval(() => {
    if (!state.running || state.won || state.lost) return;
    state.opponent = moveOpponent(state.grid, state.opponent, state.goal);
    checkOutcome();
    draw();
  }, 1000);
}

function onCellClick(target) {
  if (!state.running || playerLocked || state.won || state.lost) return;
  const cell = state.grid[target.y]?.[target.x];
  if (!cell || cell.wall || !cell.visible) return;
  if (heuristic(state.player, target) !== 1) {
    setStatus('You can only move to an adjacent visible room.');
    return;
  }
  const cost = COST_TABLE[state.affinity][cell.nen];
  playerLocked = true;
  setStatus(`Moving through ${cell.nen} room. Cost ${cost}.`);
  setTimeout(() => {
    state.player = { ...target };
    updateFog(state.grid, state.player);
    recalcPath();
    playerLocked = false;
    checkOutcome();
    draw();
  }, 180 + cost * 140);
}

function recalcPath() {
  state.path = aStar(state.grid, state.player, state.goal, cell => COST_TABLE[state.affinity][cell.nen]);
  const visibleSteps = state.path.filter(p => state.grid[p.y][p.x].revealed).length;
  pathInfo.textContent = state.path.length
    ? `Known weighted route: ${state.path.length - 1} steps. Revealed on route: ${visibleSteps}/${state.path.length}.`
    : 'No route is currently known. Keep exploring revealed corridors.';
}

function checkOutcome() {
  const playerNear = heuristic(state.player, state.goal) <= 1;
  const shadowNear = heuristic(state.opponent, state.goal) <= 1;
  if (playerNear && !shadowNear) {
    state.won = true;
    state.running = false;
    clearInterval(opponentTimer);
    setStatus('Victory. You reached the Nen center before the Shadow Hunter.');
  } else if (shadowNear) {
    state.lost = true;
    state.running = false;
    clearInterval(opponentTimer);
    setStatus('Defeat. The Shadow Hunter reached the center first. Generate a new maze or choose another affinity.');
  }
}

function draw() {
  renderCompass(compassEl, state.player, state.goal);
  gridCanvas.draw();
}

function setStatus(text) {
  statusEl.textContent = text;
}

function renderLegend() {
  legendEl.innerHTML = '';
  for (const type of NEN_TYPES) {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span class="swatch" style="background:${COLORS[type]}"></span>${type}`;
    legendEl.append(item);
  }
}

buildAffinitySelector(document.getElementById('affinityButtons'), type => {
  selectedAffinity = type;
  if (state) {
    state.affinity = type;
    recalcPath();
    draw();
  }
});

startBtn.addEventListener('click', startGame);
newGameBtn.addEventListener('click', () => {
  setup.classList.remove('hidden');
  game.classList.add('hidden');
  init(Date.now());
  setStatus('New maze generated. Choose an affinity and start again.');
});

init();
