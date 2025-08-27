// each player has a gameboard
import Player from "../../src/scripts/gameObjects/Player";
import CPU_Player from "../../src/scripts/gameObjects/CPU_Player";
import SHIP_TYPES from "../../src/scripts/gameEnums/shipTypes";
import SHIP_DIRECTIONS from "../../src/scripts/gameEnums/shipDirections";

test('each player has a gameboard', () => {
    const p1 = new Player('Player 1');
    const p2 = new Player('Player 2');

    expect(p1.gameboard).not.toBe(p2.gameboard);
});

test('computer players can attack a random tile on opponent\'s gameboard', () => {
    const p1 = new Player('Player 1');
    const p2 = new CPU_Player('Player 2');

    p1.gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [4, 7]);
    p1.gameboard.placeShip(SHIP_TYPES.BATTLESHIP, SHIP_DIRECTIONS.EAST, [3, 4]);
    p1.gameboard.placeShip(SHIP_TYPES.DESTROYER, SHIP_DIRECTIONS.NORTH, [2, 1]);
    p1.gameboard.placeShip(SHIP_TYPES.SUBMARINE, SHIP_DIRECTIONS.SOUTH, [5, 2]);
    p1.gameboard.placeShip(SHIP_TYPES.PATROL_BOAT, SHIP_DIRECTIONS.WEST, [0, 0]);

    for (let i = 0; i < 100; i++) {
        expect(p2.attack(p1.gameboard)[0]).toBe(true);
    }
});

test('computer players will try to attack an adjacent tile following successful hit', () => {
    const p1 = new Player('Player 1');
    const p2 = new CPU_Player('Player 2');
    p1.gameboard.placeShip(SHIP_TYPES.CARRIER, SHIP_DIRECTIONS.WEST, [4, 4]);

    p2.attack(p1.gameboard, [4, 4]);

    const possibleTargets = [[5, 4], [3, 4], [4, 3], [4, 5]];

    const nextAttack = p2.attack(p1.gameboard)[1];
    const isPresent = possibleTargets.some(coord =>
        coord[0] === nextAttack[0] && coord[1] === nextAttack[1]
    );

    expect(isPresent).toBe(true);
});