import { GameplayService } from "./GameplayService";
import GAME_STATE from "../gameEnums/gameState";
import GameOverView from "../gameViews/GameOverView";
import CreateGameView from "../gameViews/CreateGameView";

export const GameController = () => {
    let gameState = GAME_STATE.PLAYER1_TURN;
    let gameplayService = null;
    let createGameView = null;

    const controller = {
        createGame: () => {
            createGameView = new CreateGameView((p1board) => {
                controller.playGame(p1board);
            });
            createGameView.init();
        },
        gameOver: (result) => {
            gameState = GAME_STATE.GAME_OVER;
            GameOverView(result, () => controller.createGame());
        },
        playGame: (p1board) => {
            gameplayService = new GameplayService({
                p1board: p1board,
                onGameOver: (detail) => controller.gameOver(detail)
            });
            gameplayService.init();
        },
    };

    return controller;
}

export default GameController;