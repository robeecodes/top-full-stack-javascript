import Ship from "../../src/scripts/gameObjects/Ship";
import SHIP_TYPES from "../../src/scripts/gameEnums/shipTypes";

// hit will increase the amount of hits
test('hit', () => {
    const ship = new Ship(SHIP_TYPES.CARRIER);
    for (let i = 0; i < SHIP_TYPES.CARRIER.length; i++) {
        ship.hit();
        expect(ship.hits).toBe(i + 1);
    }
});

// isSunk should be true when hits == length
test('isSunk', () => {
    const ship = new Ship(SHIP_TYPES.SUBMARINE);
    for (let i = 0; i < SHIP_TYPES.SUBMARINE.length; i++) {
        ship.hit();
    }
    expect(ship.isSunk).toBe(true);
});

// reference ship type
test('type', () => {
    const ship = new Ship(SHIP_TYPES.CARRIER);
    expect(ship.type).toBe('Carrier');
});