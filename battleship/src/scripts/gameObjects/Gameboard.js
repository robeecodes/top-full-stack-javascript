import Ship from "./Ship";
import SHIP_DIRECTIONS from "../gameEnums/shipDirections";
import SHIP_TYPES from "../gameEnums/shipTypes";

export default class Gameboard {
    constructor() {
        this._board = this.createBoard();
        this._ships = [];
    }

    get board() {
        return this._board;
    }

    createBoard() {
        const board = [];
        for (let y = 0; y < 10; y++) {
            board.push([]);
            for (let x = 0; x < 10; x++) {
                board[y].push({
                    ship: null,
                    hit: false,
                });
            }
        }
        return board;
    }

    _resetBoard() {
        this._board = this.createBoard();
        this._ships = [];
    }

    placeShip(type, orientation, position) {
        const [startX, startY] = position;

        // Calculate all positions before checking or placing
        const positions = this._calculateShipPositions(type.length, orientation, startX, startY);

        // If positions is null, the placement is invalid
        if (!positions) return false;

        // Create ship and place it at all positions
        const ship = new Ship(type);
        positions.forEach(([x, y]) => {
            this.board[y][x] = {
                ship,
                hit: false,
            };
        });

        this._ships.push(ship);

        return true;
    }

    calculateRandomPlacements() {
        // Start clean so multiple calls don't accumulate ships
        this._resetBoard();

        const shipOrder = [
            SHIP_TYPES.CARRIER,
            SHIP_TYPES.BATTLESHIP,
            SHIP_TYPES.DESTROYER,
            SHIP_TYPES.SUBMARINE,
            SHIP_TYPES.PATROL_BOAT,
        ];
        const directions = [
            SHIP_DIRECTIONS.NORTH,
            SHIP_DIRECTIONS.SOUTH,
            SHIP_DIRECTIONS.EAST,
            SHIP_DIRECTIONS.WEST,
        ];

        const boardSize = this.board.length;
        const placements = [];

        const placeOne = (type) => {
            let placed = false;
            let guard = 0;
            while (!placed) {
                guard++;
                if (guard > 500) {
                    throw new Error("Failed to generate a valid layout (too many attempts).");
                }
                const dir = directions[Math.floor(Math.random() * directions.length)];
                const x = Math.floor(Math.random() * boardSize);
                const y = Math.floor(Math.random() * boardSize);

                try {
                    if (this.placeShip(type, dir, [x, y])) {
                        placements.push({ type, direction: dir, origin: [x, y] });
                        placed = true;
                    }
                } catch (_) {
                    // try again
                }
            }
        };

        shipOrder.forEach(placeOne);

        return placements;
    }

    _calculateShipPositions(length, orientation, startX, startY) {
        const positions = [];
        let x = startX;
        let y = startY;

        for (let i = 0; i < length; i++) {
            // Bounds + occupation check
            if (x < 0 || x > 9 || y < 0 || y > 9 || this.board[y][x].ship !== null) {
                return null;
            }

            // Store as [x, y] to match consumers
            positions.push([x, y]);

            // Advance one tile in the chosen direction.
            switch (orientation) {
                case SHIP_DIRECTIONS.EAST:  x--; break;
                case SHIP_DIRECTIONS.WEST:  x++; break;
                case SHIP_DIRECTIONS.NORTH: y++; break;
                case SHIP_DIRECTIONS.SOUTH: y--; break;
                default: return null;
            }
        }

        return positions;
    }

    receiveAttack(position) {
        const [x, y] = position;

        if (typeof x !== 'number' || typeof y !== 'number') return false;
        if (x < 0 || x > 9 || y < 0 || y > 9) return false;

        const cell = this.board[y][x];
        if (cell.hit) return false;
        cell.hit = true;

        if (cell.ship) cell.ship.hit();

        return true;
    }

    remainingShips() {
        const ships = this._ships.filter(ship => !ship.isSunk);
        return ships.length;
    }
}