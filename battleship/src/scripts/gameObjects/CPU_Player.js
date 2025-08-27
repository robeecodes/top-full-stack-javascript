import Player from "./Player";

export default class CPU_Player extends Player {
    constructor(props) {
        super(props);
        this._toAttack = this._buildAttackOptions();
        this._prevSuccess = null;
    }

    // Possible tiles to attack are initialised in an array for quick access
    _buildAttackOptions() {
        const toAttack = [];

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                toAttack.push([x, y]);
            }
        }

        return toAttack;
    }

    attack(gameboard, position = this._getPosition()) {
        if (!super.attack(gameboard, position))
            return false;

        if (gameboard.board[position[1]][position[0]].ship) {
            this._prevSuccess = position;
        } else {
            // console.log(`${this._name} missed!`);
        }

        return [true, position];
    }

    _getPosition() {
        if (this._prevSuccess !== null) {
            const randomPos = this._getAdjacentPosition();
            if (randomPos !== null) return randomPos;
        }

        const randomIdx = Math.floor(Math.random() * this._toAttack.length);
        const randomPos = this._toAttack[randomIdx];

        this._toAttack.splice((randomIdx) | 0, 1);

        return randomPos;
    }

    _getAdjacentPosition() {
        const [x, y] = this._prevSuccess;
        const possibilities = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
        ]

        for (let i = 0; i < 4; i++) {
            const pos = possibilities[i];

            const isPresent = this._toAttack.findIndex(coord =>
                coord[0] === pos[0] && coord[1] === pos[1]
            );

            if (isPresent !== -1) {
                this._toAttack.splice(isPresent, 1);
                return pos
            }
        }

        this._prevSuccess = null;
        return null;
    }

}