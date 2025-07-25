// export const Board = (width, height) => {
//     const board = new Array(height);
//
//     for (let i = 0; i < board.length; i++) {
//         board[i] = new Array(width);
//         for (let j = 0; j < board[i].length; j++) {
//             board[i][j] = [i, j];
//         }
//     }
//
//     return board;
// }

export const Board = (width, height) => ({
    width,
    height
});

export default Board;