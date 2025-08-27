import Gameboard from "./Gameboard";

export default class Player {
    constructor(name, board = new Gameboard()) {
        this._name = name;
        this._gameboard = board;
    }

    get name() {
        return this._name;
    }

    get gameboard() {
        return this._gameboard;
    }

    attack(gameboard, position) {
        return gameboard.receiveAttack(position);
    }
}