let player = prev => (prev === 1 ? 2 : 1);

let board = (prev, index, value) => {
  if (!prev) return Array(9).fill(0);
  else return prev.map((v, i) => (i === index ? value : v));
};

let winnerLine = line => {
  if (line[0] === line[1] && line[1] === line[2]) {
    return line[0];
  }

  return 0;
};

let row = width => index => b => {
  let start = width * index;
  return b.slice(start, start + width);
};

let col = width => index => b => {
  return [b[index], b[index + width], b[index + 2 * width]];
};

let crossR = b => {
  return [b[2], b[4], b[6]];
};
let crossL = b => {
  return [b[0], b[4], b[8]];
};

let winner = b => {
  // col || row || cross
  // row
  let row3 = row(3);
  let col3 = col(3);
  let wl = winnerLine;
  let rowW = wl(row3(0)(b)) || wl(row3(1)(b)) || wl(row3(2)(b));
  let colW = wl(col3(0)(b)) || wl(col3(1)(b)) || wl(col3(2)(b));
  let crossW = wl(crossR(b)) || wl(crossL(b));
  return rowW || colW || crossW;
};

let isDraw = b => b.every(v => v !== 0);

// 1 2 2
// 2 1 2
// 2 2 1

let state = (prev, select) => {
  if (!prev)
    return {
      board: board(),
      player: player(),
      winner: 0,
      isDraw: false
    };

  let nextPlayer = player(prev.player);
  let nextBoard = board(prev.board, select, prev.player);
  let nextWinner = winner(nextBoard);
  let nextIsDraw = nextWinner ? false : isDraw(nextBoard);
  return {
    board: nextBoard,
    player: nextPlayer,
    winner: nextWinner,
    isDraw: nextIsDraw
  };
};

module.exports = {
  player,
  board,
  isDraw,
  winnerLine,
  row,
  col,
  crossR,
  crossL,
  winner,
  state
};
