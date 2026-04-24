# Greed Island: The Nen Compass

A Hunter x Hunter inspired real-time maze game built for the **Greed Island: The Nen Compass** problem-solving challenge.

The player must explore a hidden 20x20 maze, choose a Nen affinity, follow the Nen Compass, and reach the center before the Shadow Hunter.

---

## Challenge Summary

You are trapped inside a 20x20 Nen maze.

Each cell can be:

- A wall, which is blocked
- A path, which can be walked on
- A Nen room with one of six Nen types:
  - Enhancer
  - Transmuter
  - Conjurer
  - Manipulator
  - Emitter
  - Specialist

The player chooses a Nen affinity at the start.

Movement cost depends on the player's affinity and the Nen type of the room.

The goal is to reach the center of the maze, or within one cell of the center, before the Shadow Hunter.

---

## Features

- 20x20 procedurally generated maze
- Walls and walkable paths
- Six Nen room types
- Player affinity selection
- Affinity-based movement cost system
- A* pathfinding algorithm
- Real-time Shadow Hunter AI
- Shadow Hunter starts from the opposite corner
- Shadow Hunter moves every 1 second
- Fog of war system
- Only cells within 2-cell radius are visible
- Explored cells remain visible
- Nen Compass showing direction and distance to the goal
- Win and lose conditions
- Browser-based Canvas frontend

---

## How to Run

Because the project uses JavaScript modules, do not open `index.html` directly with `file://`.

Run it using a local server.

### Using Python

From inside the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Using VS Code Live Server

Open the folder in VS Code.

Right-click `index.html`.

Choose:

```text
Open with Live Server
```

---

## How to Play

1. Choose your Nen affinity.
2. The game starts after choosing an affinity.
3. Your player starts near the top-left corner.
4. The Shadow Hunter starts near the bottom-right corner.
5. Click only adjacent walkable cells to move:
   - Up
   - Down
   - Left
   - Right
6. Avoid walls.
7. Use the compass to move toward the center.
8. Reach the center before the Shadow Hunter.

---

## Important Gameplay Rules

The compass shows the direction of the center, but it does not always show the shortest path.

Walls can block the direct route.

Some Nen rooms are more expensive to move through depending on your chosen affinity.

The Shadow Hunter has perfect pathfinding and moves automatically every second.

---

## Movement Cost Table

| Your Affinity | Enhancer | Transmuter | Conjurer | Manipulator | Emitter | Specialist |
|---|---:|---:|---:|---:|---:|---:|
| Enhancer | 1 | 3 | 4 | 5 | 2 | 4 |
| Transmuter | 3 | 1 | 5 | 4 | 2 | 4 |
| Conjurer | 4 | 5 | 1 | 3 | 4 | 2 |
| Manipulator | 5 | 4 | 3 | 1 | 4 | 3 |
| Emitter | 2 | 2 | 4 | 4 | 1 | 4 |
| Specialist | 4 | 4 | 2 | 3 | 4 | 1 |

Lower cost means faster and better movement.

Walls are impassable.

---

## Project Structure

```text
nen-compass/
├── index.html
├── style.css
├── app.js
├── algorithm/
│   ├── aStar.js
│   ├── mazeGenerator.js
│   ├── fogOfWar.js
│   └── opponentAI.js
├── components/
│   ├── GridCanvas.js
│   ├── CompassUI.js
│   └── AffinitySelector.js
└── README.md
```

---

## File Explanation

### `index.html`

Main HTML page.

It loads the canvas, UI elements, styles, and JavaScript modules.

### `style.css`

Contains the visual design of the game.

### `app.js`

Main game controller.

It handles:

- Game state
- Player movement
- Shadow Hunter timing
- Win and loss checks
- Rendering updates

### `algorithm/aStar.js`

Implements the A* pathfinding algorithm.

It is used to calculate paths through the maze.

### `algorithm/mazeGenerator.js`

Creates the 20x20 maze.

It generates:

- Walls
- Walkable paths
- Nen types for cells

### `algorithm/fogOfWar.js`

Controls visibility.

Only cells near the player are visible, while previously explored cells stay revealed.

### `algorithm/opponentAI.js`

Controls the Shadow Hunter.

The Shadow Hunter uses pathfinding to move toward the center.

### `components/GridCanvas.js`

Draws the game on the canvas.

It displays:

- Maze cells
- Walls
- Nen rooms
- Player
- Shadow Hunter
- Fog
- Goal

### `components/CompassUI.js`

Displays the Nen Compass.

It shows:

- Direction to the center
- Distance to the center

### `components/AffinitySelector.js`

Lets the player choose their Nen affinity before starting the game.

---

## Win Condition

The player wins when they reach the exact center cell or a cell within one step of the center before the Shadow Hunter.

---

## Lose Condition

The player loses if the Shadow Hunter reaches the center first.

---

## Challenge Requirements Covered

This solution implements:

- Canvas grid frontend
- A* pathfinding
- Real-time opponent AI
- Fog of war
- 2-cell visibility radius
- Visited cell memory
- Affinity-based movement costs
- Procedural 20x20 maze
- Compass direction and distance UI
- Required project folder structure

---

## Author Notes

This project was created as a solution for the **Greed Island: The Nen Compass** challenge.

The main idea is not only to build a maze, but to combine:

- Pathfinding
- Limited visibility
- Weighted movement costs
- Real-time enemy movement
- Strategic navigation

The player must think carefully instead of blindly following the compass.
