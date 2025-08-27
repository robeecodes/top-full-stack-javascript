import _gameOverContainer from "./layouts/_gameOverContainer";

export const GameOverView = (result, onRestart) => {
    document.body.innerHTML = '';
    document.body.appendChild(_gameOverContainer(result.winner.name));

    document.querySelector('button').addEventListener('click', () => {
        onRestart();
    });
}

export default GameOverView;