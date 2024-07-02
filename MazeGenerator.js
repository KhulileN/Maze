function generateMaze(gridSize) {
    var vector2D = [];
    for (let i = 0; i < gridSize; i++) {
        vector2D[i] = [];
        for (let j = 0; j < gridSize; j++) {
            if (i % 2 !== 0 && j % 2 !== 0) {
                vector2D[i][j] = 0;
            } else {
                vector2D[i][j] = 1;
            }
        }
    }

    var stack = [];
    var visited = [];

    for (let i = 0; i < gridSize; i++) {
        visited[i] = [];
        for (let j = 0; j < gridSize; j++) {
            visited[i][j] = false;
        }
    }

    var startX = 1;
    var startY = 1;
    var endX = gridSize - 2;
    var endY = gridSize - 2;

    stack.push([startX, startY]);
    visited[startX][startY] = true;

    while (stack.length > 0) {
        var current = stack.pop();
        var [x, y] = current;

        var directions = shuffleDirections(); // Randomize the order of directions

        for (let direction of directions) {
            var newX = x + direction[0] * 2;
            var newY = y + direction[1] * 2;

            if (newX >= 1 && newX < gridSize - 1 && newY >= 1 && newY < gridSize - 1 && !visited[newX][newY]) {
                vector2D[(newX + x)/2][(newY+y)/2] = 0; // Open path between cells
                visited[newX][newY] = true;
                stack.push([newX, newY]);
            }
        }
    }

    vector2D[startX][startY] = 0; // Ensure start and end are open
    vector2D[endX][endY] = 0;

    x = startX;
    y = startY;
    EndX = endX;
    EndY = endY;

    return vector2D;
}

function shuffleDirections() {
    var directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1]   // Right
    ];

    for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    return directions;
}
