import Board from "./components/Board.js";
import Node from "./components/Node.js";

export default function knightMoves(start, end) {
    const board = Board(8, 8);
    const path = getShortestPath(board, start, end);

    console.log(`You made it in ${path.length - 1} moves!`);
    path.forEach(position => console.log(position));
}

function getShortestPath(board, start, end) {
    const startNode = Node(start);
    const queue = [startNode];
    const visited = new Set();

    let currentNode = startNode;

    while (queue.length > 0) {
        currentNode = queue.shift();

        if (currentNode.position[0] === end[0] && currentNode.position[1] === end[1]) {
            return reconstructPath(currentNode);
        }

        let nextMoves = nextMove(board, currentNode);
        nextMoves.forEach(move => {
            const positionKey = move.position.join(',');
            if (!visited.has(positionKey)) {
                queue.push(move);
                visited.add(positionKey);
            }
        });
    }

    return null;
}

function nextMove(board, currentNode) {
    const movePatterns = [
        [-1, -2], [-1, 2],  // Vertical long L
        [1, -2], [1, 2],   // Vertical long L (other direction)
        [-2, -1], [-2, 1],  // Horizontal long L
        [2, -1], [2, 1]    // Horizontal long L (other direction)
    ];

    const x = currentNode.position[0];
    const y = currentNode.position[1];

    // Map the patterns to actual positions and filter valid ones
    return movePatterns
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(position => validMove(board, position))
        .map(position => (Node(position, currentNode)));
}

function validMove(board, position) {
    const x = position[0];
    const y = position[1];

    return !(x < 0 || x >= board.width ||
        y < 0 || y >= board.height);
}

function reconstructPath(currentNode) {
    const path = [];
    while (currentNode) {
        path.unshift(currentNode.position);
        currentNode = currentNode.parent;
    }
    return path;
}