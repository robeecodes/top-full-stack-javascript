import Gameboard from "../../src/scripts/gameObjects/Gameboard";
import SHIP_TYPES from "../../src/scripts/gameEnums/shipTypes";
import SHIP_DIRECTIONS from "../../src/scripts/gameEnums/shipDirections";

describe('gameboard', () => {
    test('can be created', () => {
        const gameboard = new Gameboard();
        expect(gameboard).toBeDefined();
    });

    describe('placing ships', () => {
        let gameboard;

        beforeEach(() => {
            gameboard = new Gameboard();
        });

        test('you can place a ship in an unoccupied position', () => {
            const shipPlacements = [
                gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [4, 7]),
                gameboard.placeShip(SHIP_TYPES.BATTLESHIP, SHIP_DIRECTIONS.EAST, [3, 4]),
                gameboard.placeShip(SHIP_TYPES.DESTROYER, SHIP_DIRECTIONS.NORTH, [2, 1]),
                gameboard.placeShip(SHIP_TYPES.SUBMARINE, SHIP_DIRECTIONS.SOUTH, [5, 2]),
                gameboard.placeShip(SHIP_TYPES.PATROL_BOAT, SHIP_DIRECTIONS.WEST, [0, 0])
            ];

            expect(shipPlacements).toEqual([true, true, true, true, true]);

        });

        test('you can not place a ship in an occupied position', () => {
            const shipPlacements = [
                gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [4, 4]),
                gameboard.placeShip(SHIP_TYPES.BATTLESHIP, SHIP_DIRECTIONS.EAST, [4, 4]),
                gameboard.placeShip(SHIP_TYPES.DESTROYER, SHIP_DIRECTIONS.NORTH, [4, 4]),
            ]

            expect(shipPlacements).toEqual([true, false, false]);
        });

        test('you can not place a ship in an invalid position', () => {
            const shipPlacements = [
                gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [-1, 4]),
                gameboard.placeShip(SHIP_TYPES.BATTLESHIP, SHIP_DIRECTIONS.EAST, [4, 40]),
                gameboard.placeShip(SHIP_TYPES.DESTROYER, SHIP_DIRECTIONS.NORTH, [5, 9]),
            ]

            expect(shipPlacements).toEqual([false, false, false]);
        });
    });

    describe('receiving attacks', () => {
        let gameboard;

        beforeEach(() => {
            gameboard = new Gameboard();
        });

        test('attacking any board position will mark it as hit', () => {
            gameboard.receiveAttack([4, 4]);
            gameboard.receiveAttack([9, 3]);

            const currentBoard = gameboard.board;

            expect(currentBoard[4][4].hit).toBe(true);
            expect(currentBoard[3][9].hit).toBe(true);
            expect(currentBoard[5][4].hit).toBe(false);
            expect(currentBoard[0][0].hit).toBe(false);
        });
        test('attacking an invalid board position returns false', () => {
            const attacks = [
                gameboard.receiveAttack([4, 4]),
                gameboard.receiveAttack([9, 3]),
                gameboard.receiveAttack([-1, 4]),
                gameboard.receiveAttack([4, 4]),
                gameboard.receiveAttack(["a", undefined])
            ]

            expect(attacks).toEqual([true, true, false, false, false]);
        });

        test('attacking a ship increments its hits', () => {
            gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [4, 4]);

            gameboard.receiveAttack([4, 4]);
            gameboard.receiveAttack([5, 4]);

            const currentBoard = gameboard.board;
            const ship = currentBoard[4][4].ship;

            expect(ship.hits).toBe(2);

            gameboard.receiveAttack([6, 4]);
            gameboard.receiveAttack([7, 4]);
            gameboard.receiveAttack([8, 4]);

            expect(ship.isSunk).toBe(true);
        });


        test('board will store missed attacks', () => {
            gameboard.receiveAttack([3, 3]);

            const currentBoard = gameboard.board;

            expect(currentBoard[3][3].hit).toBe(true);
            expect(currentBoard[4][4].hit).toBe(false);
        });

        test('board can report remaining ships', () => {
            gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [4, 7]);
            gameboard.placeShip(SHIP_TYPES.BATTLESHIP, SHIP_DIRECTIONS.EAST, [3, 4]);
            gameboard.placeShip(SHIP_TYPES.DESTROYER, SHIP_DIRECTIONS.NORTH, [2, 1]);
            gameboard.placeShip(SHIP_TYPES.SUBMARINE, SHIP_DIRECTIONS.SOUTH, [5, 2]);
            gameboard.placeShip(SHIP_TYPES.PATROL_BOAT, SHIP_DIRECTIONS.WEST, [0, 0]);

            expect(gameboard.remainingShips()).toBe(5);

            gameboard.receiveAttack([0, 0]);
            gameboard.receiveAttack([1, 0]);

            expect(gameboard.remainingShips()).toBe(4);
        });
    });
});

