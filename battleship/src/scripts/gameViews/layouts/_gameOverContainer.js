export default function _gameOverContainer(winner) {
    const container = document.createElement('div');
    container.classList.add('container');
    container.id = 'gameover-container';
    container.innerHTML = `
        <h1>Game Over!</h1>
        <h2>${winner} Wins!</h2>
        <button>Restart?</button>
    `;
    return container;
}
