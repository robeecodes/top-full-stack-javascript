import GAME_STATE from "../gameEnums/gameState";
import _gameplayContainer from "./layouts/_gameplayContainer";

export const GameplayView = (player1, player2) => {
    document.body.innerHTML = '';
    document.body.appendChild(_gameplayContainer);
    const statusText = document.getElementById('status-text');
    const enemyBoard = document.getElementById('enemy-board');
    const yourBoard = document.getElementById('your-board');
    const popupText = document.querySelector("#popup-text");

    const p1Board = player1.gameboard.board;
    const p2Board = player2.gameboard.board;

    const p1Tiles = [];
    const p2Tiles = [];

    return {
        init: function (gameState) {
            this._clearBoards();

            const boards = [
                {
                    board: p1Board,
                    tiles: p1Tiles,
                    isCurrentPlayer: gameState === GAME_STATE.PLAYER1_TURN
                },
                {
                    board: p2Board,
                    tiles: p2Tiles,
                    isCurrentPlayer: gameState === GAME_STATE.PLAYER2_TURN
                }
            ];

            boards.forEach(({board, tiles, isCurrentPlayer}) => {
                this._initBoard(board, tiles, isCurrentPlayer, gameState);
            });

            enemyBoard.style.pointerEvents = 'initial';
        },

        _clearBoards() {
            p1Tiles.length = 0;
            p2Tiles.length = 0;
            yourBoard.innerHTML = '';
            enemyBoard.innerHTML = '';
        },

        _initBoard(board, tiles, isCurrentPlayer, gameState) {
            const element = isCurrentPlayer ? yourBoard : enemyBoard;
            board.forEach((row, y) => {
                row.forEach((cell, x) => {
                    const tile = this._createTile(isCurrentPlayer);
                    this._setTileAttributes(tile, x, y);
                    this._updateTileState(tile, cell, isCurrentPlayer, gameState);
                    tiles.push(tile);
                    element.appendChild(tile);
                });
            });
        },

        _createTile(isCurrentPlayer) {
            return isCurrentPlayer ?
                document.createElement('div') :
                document.createElement('button');
        },

        _setTileAttributes(tile, x, y) {
            tile.setAttribute('data-x', x);
            tile.setAttribute('data-y', y);
        },

        _updateTileState(tile, cell, isCurrentPlayer, gameState) {
            if (cell.ship && isCurrentPlayer) {
                tile.classList.add('ship');
            }

            if (cell.hit) {
                tile.classList.add('hit');
                if (cell.ship) {
                    tile.classList.add('ship');
                }
                const isOpponentTurn = !isCurrentPlayer;
                if (isOpponentTurn) {
                    tile.disabled = true;
                }
            }
        },
        render: function(gameState) {
            this.init(gameState);

            const currentPlayer = gameState === GAME_STATE.PLAYER1_TURN ? player1 : player2;
            const isCPUPlayer = currentPlayer.constructor.name === "CPU_Player";

            if (isCPUPlayer) {
                document.querySelector('#your-status').style.display = 'none';
            } else {
                document.querySelector('#your-status').removeAttribute('style');
            }

            statusText.innerText = `${currentPlayer.name}'s turn`;

            if (currentPlayer === player1) {
                if (!isCPUPlayer) {
                    p1Tiles.forEach(tile => {
                        yourBoard.appendChild(tile);
                    });
                }

                p2Tiles.forEach(tile => {
                    enemyBoard.appendChild(tile);
                });

            } else if (currentPlayer === player2) {

                if (!isCPUPlayer) {
                    p2Tiles.forEach(tile => {
                        yourBoard.appendChild(tile);
                    });
                }

                p1Tiles.forEach(tile => {
                    enemyBoard.appendChild(tile);
                });
            }
        },
        update: function(gameState, hitCell, button, sunkShip = null) {
            if (sunkShip !== null) {
                popupText.classList.add('show');
                popupText.innerHTML = `<p>${sunkShip} sunk!</p>`.toUpperCase();
                setTimeout(() => {
                    popupText.classList.remove('show');
                }, 1000);
            }

            enemyBoard.style.pointerEvents = 'none';
            button.classList.add('hit');
            if (hitCell.ship) button.classList.add('ship');
        }
    }
}

export default GameplayView;