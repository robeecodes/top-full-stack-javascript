import _createGameContainer from "./layouts/_createGameContainer";
import Gameboard from "../gameObjects/Gameboard";

export const CreateGameView = (onConfirm) => {
    document.body.innerHTML = '';
    document.body.appendChild(_createGameContainer);

    const boardRoot = document.getElementById("your-board");
    const randomiseBtn = document.getElementById("randomise-btn");
    const startBtn = document.getElementById("start-btn");

    let shadowBoard = new Gameboard();
    let tiles = [];

    const _clearBoard = () => {
        tiles.length = 0;
        if (boardRoot) boardRoot.innerHTML = '';
    };

    const _createTile = () => {
        return document.createElement('div');
    };

    const _setTileAttributes = (tile, x, y) => {
        tile.setAttribute('data-x', x);
        tile.setAttribute('data-y', y);
    };

    const _updateTileState = (tile, cell) => {
        // Reflect ship presence visually with same class used in GameplayView
        if (cell.ship) {
            tile.classList.add('ship');
        }
        // Clear any hit class in placement view; hits are irrelevant here
        tile.classList.remove('hit');
    };

    const _initBoard = (board) => {
        if (!boardRoot) return;

        board.forEach((row, y) => {
            row.forEach((cell, x) => {
                const tile = _createTile();
                _setTileAttributes(tile, x, y);

                _updateTileState(tile, cell);
                tiles.push(tile);
                boardRoot.appendChild(tile);
            });
        });

    };

    const render = () => {
        _clearBoard();
        _initBoard(shadowBoard.board);
    };

    const randomisePlacements = () => {
        shadowBoard = new Gameboard();

        shadowBoard.calculateRandomPlacements();

        render();
    };

    if (randomiseBtn) {
        randomiseBtn.addEventListener("click", () => {
                randomisePlacements();

        });
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            if (typeof onConfirm === "function") {
                onConfirm(shadowBoard);
            }
        });
    }

    return {
        init: () => {
            randomisePlacements();
            render();
        },
    };
};

export default CreateGameView;