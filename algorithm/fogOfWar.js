export function updateFog(grid, player, radius = 2) {
  for (const row of grid) for (const cell of row) cell.visible = false;
  for (let y = player.y - radius; y <= player.y + radius; y++) {
    for (let x = player.x - radius; x <= player.x + radius; x++) {
      if (grid[y]?.[x] && Math.abs(player.x - x) + Math.abs(player.y - y) <= radius) {
        grid[y][x].visible = true;
        grid[y][x].revealed = true;
      }
    }
  }
  grid[player.y][player.x].visited = true;
  grid[player.y][player.x].revealed = true;
}
