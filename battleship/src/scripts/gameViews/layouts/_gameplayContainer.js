export const gameplayContainer = document.createElement('div');
gameplayContainer.classList.add('container');
gameplayContainer.id = 'gameplay-container';
gameplayContainer.innerHTML = `
    <h1>Battleship</h1>
    <h2 id="status-text">Player 1's Turn</h2>

    <div id="enemy-board"></div>
    <div id="your-status">
        <h3>Current Status:</h3>
        <div id="your-board"></div>
    </div>

    <div id="popup-text">
        <p>SHIP SUNK!</p>
    </div>
`;

export default gameplayContainer;