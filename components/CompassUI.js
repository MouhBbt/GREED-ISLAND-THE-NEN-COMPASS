export function compassData(player, goal) {
  const dx = goal.x - player.x;
  const dy = goal.y - player.y;
  let arrow = '•';
  if (Math.abs(dx) > Math.abs(dy)) arrow = dx > 0 ? 'E' : 'W';
  else if (dy !== 0) arrow = dy > 0 ? 'S' : 'N';
  const distance = Math.abs(dx) + Math.abs(dy);
  return { arrow, distance, dx, dy };
}

export function renderCompass(container, player, goal) {
  const { arrow, distance, dx, dy } = compassData(player, goal);
  const symbols = { N: '↑', S: '↓', E: '→', W: '←', '•': '◎' };
  container.innerHTML = `
    <div class="arrow">${symbols[arrow]}</div>
    <strong>Nen Compass: ${arrow}</strong>
    <div class="distance">Aura distance ${distance} · dx ${dx}, dy ${dy}</div>
  `;
}
