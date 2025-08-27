export default class Ship {
    constructor(type) {
        this._type = type.name;
        this._length = type.length;
        this._hits = 0;
    }

    get type() {
        return this._type;
    }

    get hits() {
        return this._hits;
    }

    hit() {
        this._hits++;
    }

    get isSunk() {
        return this._hits >= this._length;
    }
}