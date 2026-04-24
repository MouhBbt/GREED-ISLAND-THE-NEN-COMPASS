# Greed Island: The Nen Compass

A vanilla JavaScript implementation of the challenge specification.

## Features

- 20x20 procedurally generated maze with walls and Nen room types.
- Player chooses one of six Nen affinities.
- Movement cost follows the provided affinity-vs-room cost table.
- A* pathfinding recalculates after every legal move.
- Shadow Hunter starts at the opposite corner and uses perfect weighted A* with Emitter affinity.
- Fog of war reveals only a 2-cell Manhattan radius around the player.
- Revealed and visited cells remain mapped.
- Nen Compass shows the cardinal direction and aura distance to the hidden center.
- Win condition: reach the goal cell or a cell adjacent to it before the Shadow Hunter.

## Run

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then browse to `http://localhost:8000`.

## File structure

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
