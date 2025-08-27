export const _createGameContainer = document.createElement('div');
_createGameContainer.classList.add('container');
_createGameContainer.id = 'create-game-container';
_createGameContainer.innerHTML = `
    <h1>Battleship</h1>
    <h2 id="status-text">Place your ships</h2>

    <div id="your-board"></div>
    
    <div id="buttons">
        <button id="randomise-btn">↺</button>
        <button id="start-btn">Start</button>
    </div>
`;

export default _createGameContainer;