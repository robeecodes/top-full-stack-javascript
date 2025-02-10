const Player = function (shape) {
    return { shape };
};

const Gameboard = (function () {
    const gameboard = document.getElementById('board');
    const tiles = Array.from(document.querySelectorAll('.tile'))
        .reduce((grid, tile, index) => {
            const row = Math.floor(index / 3);
            if (!grid[row]) grid[row] = [];
            grid[row].push(tile);
            return grid;
        }, []);

    const winConfigs = [
        [tiles[0][0], tiles[0][1], tiles[0][2]],  // Rows
        [tiles[1][0], tiles[1][1], tiles[1][2]],
        [tiles[2][0], tiles[2][1], tiles[2][2]],
        [tiles[0][0], tiles[1][0], tiles[2][0]],  // Columns
        [tiles[0][1], tiles[1][1], tiles[2][1]],
        [tiles[0][2], tiles[1][2], tiles[2][2]],
        [tiles[0][0], tiles[1][1], tiles[2][2]],  // Diagonals
        [tiles[0][2], tiles[1][1], tiles[2][0]]
    ];

    let onTileClickCallback;

    const addEventListeners = () => {
        tiles.flat().forEach(tile => {
            tile.addEventListener('click', () => {
                if (tile.textContent !== '' || !onTileClickCallback) return;

                onTileClickCallback(tile);
            });
        });
    };

    const checkWinner = () => {
        for (const config of winConfigs) {
            if (config.every(tile => tile.textContent === config[0].textContent && tile.textContent !== '')) {
                return config[0].textContent;
            }
        }

        if (tiles.flat().every(tile => tile.textContent !== '')) {
            return 'draw';
        }

        return null;  // Game is still ongoing
    };

    const resetBoard = () => {
        tiles.flat().forEach(tile => {
            tile.textContent = '';
            tile.disabled = false;
            tile.classList.remove('playerX', 'playerO');
            gameboard.classList.remove('playerX', 'playerO');
            gameboard.classList.add('playerX');
        });
    };

    const disableAll = () => {
        tiles.flat().forEach(tile => (tile.disabled = true));
    };

    const setOnTileClick = (callback) => {
        onTileClickCallback = callback;
    };

    addEventListeners();

    return { gameboard, checkWinner, resetBoard, disableAll, setOnTileClick };
})();

const Game = (function () {
    let gameState = 'playing';
    const gameStateReport = document.getElementById('gameStateReport');

    const playerX = Player('X');
    const playerO = Player('O');
    let currPlayer = playerX;

    const nextPlayer = () => {
        const winner = Gameboard.checkWinner();

        if (winner) {
            gameState = winner === 'draw' ? 'draw' : 'winner';
            Gameboard.disableAll();
            gameStateReport.innerText = winner === 'draw' ? `It's a draw!` : `${currPlayer.shape} Wins!`;
            return;
        }

        currPlayer = currPlayer === playerX ? playerO : playerX;
        gameStateReport.innerText = `It's ${currPlayer.shape}'s turn.`;
    };

    const getCurrentPlayer = () => (gameState === 'playing' ? currPlayer : null);

    const resetGame = () => {
        gameState = 'playing';
        currPlayer = playerX;
        gameStateReport.innerText = `It's ${currPlayer.shape}'s turn.`;
        Gameboard.resetBoard();
    };


    // Set the tile click handler in Gameboard
    const handleTileClick = (tile) => {
        if (gameState !== 'playing') return;

        if (tile.textContent !== '' || Game.getCurrentPlayer() === null) return;

        const currentPlayer = Game.getCurrentPlayer();
        tile.textContent = currentPlayer.shape;

        tile.classList.add((currentPlayer.shape === "X") ? "playerX" : "playerO");

        Gameboard.gameboard.classList.toggle('playerX');
        Gameboard.gameboard.classList.toggle('playerO');

        tile.disabled = true;

        nextPlayer();
    };

    Gameboard.setOnTileClick(handleTileClick);

    document.getElementById('resetGame').addEventListener('click', resetGame);

    return { nextPlayer, getCurrentPlayer };
})();
