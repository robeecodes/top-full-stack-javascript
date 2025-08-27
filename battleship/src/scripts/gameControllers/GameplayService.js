import GAME_STATE from "../gameEnums/gameState";
import GameplayView from "../gameViews/GameplayView";
import CPU_Player from "../gameObjects/CPU_Player";
import Player from "../gameObjects/Player";

export const GameplayService = (deps) => {
    deps = deps || {};

    const onGameOver = deps.onGameOver || null;

    let p1, p2, p1board, p2board, enemyBoard, view;

    let gameState = GAME_STATE.PLAYER1_TURN;

    let clickHandlers = new Map();

    const _cleanupEventListeners = () => {
        clickHandlers.forEach((handler, button) => {
            button.removeEventListener('click', handler);
        });
        clickHandlers.clear();
    };

    const _handleAttackUpdate = (x, y, currentEnemy, button) => {
        currentEnemy.board[y][x].hit = true;

        if (currentEnemy.board[y][x].ship) {
            if (currentEnemy.board[y][x].ship.isSunk) {
                view.update(gameState, currentEnemy.board[y][x], button, currentEnemy.board[y][x].ship.type);
            } else {
                view.update(gameState, currentEnemy.board[y][x], button);
            }
        } else {
            view.update(gameState, currentEnemy.board[y][x], button);
        }

        setTimeout(() => {
            _update();
        }, 1000);
    }

    const _handleAttack = (position, currentEnemy, button) => {
        const [x, y] = position;

        if (currentEnemy.receiveAttack([x, y])) {
            _handleAttackUpdate(x, y, currentEnemy, button);
        }
    };

    const _handleCpuAttack = (cpuPlayer, targetBoard) => {
        let validAttack = cpuPlayer.attack(targetBoard);
        let counter = 1;

        while (validAttack[0] === false && counter < 100) {
            validAttack = cpuPlayer.attack(targetBoard);
            counter++;
        }

        if (!validAttack[0]) throw new Error('No more valid attacks for CPU player');
        else {
            const [x, y] = validAttack[1];
            const button = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
            _handleAttackUpdate(x, y, targetBoard, button);
        }
    }

    const _initTurn = () => {
        _cleanupEventListeners();
        view.render(gameState);

        const currentEnemy = gameState === GAME_STATE.PLAYER1_TURN ? p2board : p1board;
        const currentPlayer = gameState === GAME_STATE.PLAYER1_TURN ? p1 : p2;

        if (currentPlayer.constructor.name === "CPU_Player") {
            enemyBoard = document.querySelector("#enemy-board");
            enemyBoard.style.pointerEvents = 'none';
            setTimeout(() => {
                _handleCpuAttack(currentPlayer, currentEnemy);
            }, Math.random() * (2000 - 500) + 500);
        } else {
            document.querySelectorAll('button:not([disabled])').forEach(button => {
                const x = Number.parseInt(button.getAttribute('data-x'));
                const y = Number.parseInt(button.getAttribute('data-y'));
                const handler = () => _handleAttack([x, y], currentEnemy, button);
                clickHandlers.set(button, handler);
                button.addEventListener('click', handler);
            });
        }
    };

    const init = () => {
        p1 = new Player('Player', deps.p1board);
        p2 = new CPU_Player('Computer');

        p1board = p1.gameboard;
        p2board = p2.gameboard;

        p2board.calculateRandomPlacements({});

        view = GameplayView(p1, p2);

        _initTurn();
    };

    const _update = () => {
        const p1Left = p1board.remainingShips();
        const p2Left = p2board.remainingShips();

        if (p1Left === 0 || p2Left === 0) {
            gameState = GAME_STATE.GAME_OVER;
            _cleanupEventListeners();

            if (onGameOver) {
                const winner = p1Left === 0 ? p2 : p1;
                const loser = p1Left === 0 ? p1 : p2;
                onGameOver({ winner: winner, loser: loser, state: gameState });
            }
            return;
        }

        gameState = gameState === GAME_STATE.PLAYER1_TURN
            ? GAME_STATE.PLAYER2_TURN
            : GAME_STATE.PLAYER1_TURN;

        if (gameState === GAME_STATE.PLAYER1_TURN || gameState === GAME_STATE.PLAYER2_TURN) {
            _initTurn();
        }
    }

    return { init, p1, p2 };
}