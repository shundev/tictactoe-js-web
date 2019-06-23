const assert = require("assert");

let ttt = require("../src/tictactoe.js");

let arrEq = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

let testPlayer = () => {
  console.log("testPlayer");
  let p = ttt.player();
  let p2 = ttt.player(p);
  let p3 = ttt.player(p2);
  let p4 = ttt.player(p3);

  assert(p === 1);
  assert(p2 === 2);
  assert(p3 === 1);
  assert(p4 === 2);
};

let testBoard = () => {
  console.log("testBoard");
  let b = ttt.board();
  let b2 = ttt.board(b, 0, 4);
  let b3 = ttt.board(b2, 8, 10);
  let b4 = ttt.board(b3, 4, 1);

  assert(arrEq(b, [0, 0, 0, 0, 0, 0, 0, 0, 0]));
  assert(arrEq(b2, [4, 0, 0, 0, 0, 0, 0, 0, 0]));
  assert(arrEq(b3, [4, 0, 0, 0, 0, 0, 0, 0, 10]));
  assert(arrEq(b4, [4, 0, 0, 0, 1, 0, 0, 0, 10]));
};

let testIsDraw = () => {
  console.log("testIsDraw");
  let draw = ttt.isDraw;
  let b = ttt.board();
  let b2 = ttt.board(b, 0, 4);
  let b3 = ttt.board(b2, 8, 10);
  let b4 = ttt.board(b3, 4, 1);
  let b5 = [1, 1, 2, 2, 1, 1, 1, 1, 2];
  let b6 = [1, 1, 2, 2, 1, 1, 0, 1, 2];

  assert(!draw(b));
  assert(!draw(b2));
  assert(!draw(b3));
  assert(!draw(b4));
  assert(draw(b5));
  assert(!draw(b6));
};

let testWinnerLine = () => {
  console.log("testWinnerLine");
  let wl = ttt.winnerLine;

  assert(wl([0, 0, 0]) === 0);
  assert(wl([1, 1, 1]) === 1);
  assert(wl([2, 2, 2]) === 2);
  assert(wl([2, 0, 2]) === 0);
  assert(wl([0, 2, 2]) === 0);
  assert(wl([1, 1, 0]) === 0);
  assert(wl([1, 1, 2]) === 0);
};

let testRow = () => {
  console.log("testRow");
  let row = ttt.row;
  let row3 = row(3);

  // prettier-ignore
  let b = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  assert(arrEq(row3(0)(b), [0, 1, 2]));
  assert(arrEq(row3(1)(b), [3, 4, 5]));
  assert(arrEq(row3(2)(b), [6, 7, 8]));
};

let testCol = () => {
  console.log("testCol");
  let col = ttt.col;
  let col3 = col(3);

  // prettier-ignore
  let b = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  assert(arrEq(col3(0)(b), [0, 3, 6]));
  assert(arrEq(col3(1)(b), [1, 4, 7]));
  assert(arrEq(col3(2)(b), [2, 5, 8]));
};

let testCrosses = () => {
  console.log("testCrosses");

  let r = ttt.crossR;
  let l = ttt.crossL;
  // prettier-ignore
  let b = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  assert(arrEq(r(b), [2, 4, 6]));
  assert(arrEq(l(b), [0, 4, 8]));
};

let testWinner = () => {
  console.log("testWinner");
  let w = ttt.winner;

  // prettier-ignore
  let b = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  // prettier-ignore
  let b1 = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ];

  // prettier-ignore
  let b2 = [
    1, 0, 1,
    0, 0, 0,
    1, 0, 1,
  ];

  // prettier-ignore
  let b3 = [
    1, 2, 1,
    2, 0, 2,
    1, 2, 1,
  ];

  // prettier-ignore
  let b4 = [
    1, 1, 1,
    2, 0, 2,
    1, 2, 1,
  ];

  // prettier-ignore
  let b5 = [
    1, 2, 1,
    2, 0, 2,
    1, 1, 1,
  ];

  // prettier-ignore
  let b6 = [
    1, 2, 1,
    1, 0, 2,
    1, 2, 1,
  ];

  // prettier-ignore
  let b7 = [
    0, 2, 2,
    0, 0, 2,
    0, 2, 2,
  ];

  // prettier-ignore
  let b8 = [
    1, 2, 2,
    0, 1, 1,
    0, 2, 1,
  ];

  // prettier-ignore
  let b9 = [
    1, 1, 2,
    0, 2, 1,
    2, 2, 1,
  ];

  assert(w(b) === 0);
  assert(w(b1) === 0);
  assert(w(b2) === 0);
  assert(w(b3) === 0);
  assert(w(b4) === 1);
  assert(w(b5) === 1);
  assert(w(b6) === 1);
  assert(w(b7) === 2);
  assert(w(b8) === 1);
  assert(w(b9) === 2);
};

let testState = () => {
  let s = ttt.state();

  assert(arrEq(s.board, [0, 0, 0, 0, 0, 0, 0, 0, 0]));
  assert(s.player === 1);
  assert(s.winner === 0);
  assert(s.isDraw === false);

  let s1 = ttt.state(s, 0);
  assert(arrEq(s1.board, [1, 0, 0, 0, 0, 0, 0, 0, 0]));
  assert(s1.player === 2);
  assert(s1.winner === 0);
  assert(s1.isDraw === false);

  let s2 = ttt.state(s1, 8);
  assert(arrEq(s2.board, [1, 0, 0, 0, 0, 0, 0, 0, 2]));
  assert(s2.player === 1);
  assert(s2.winner === 0);
  assert(s2.isDraw === false);

  let s3 = ttt.state(s2, 1);
  let s4 = ttt.state(s3, 7);
  let s5 = ttt.state(s4, 2);
  assert(arrEq(s5.board, [1, 1, 1, 0, 0, 0, 0, 2, 2]));
  assert(s5.player === 2);
  assert(s5.winner === 1);
  assert(s5.isDraw === false);

  let s6 = ttt.state();
  // mock
  s6.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let s7 = ttt.state(s6, 0);
  assert(s7.winner === 0);
  assert(s7.isDraw);
};

let runAll = () => {
  testPlayer();
  testBoard();
  testIsDraw();
  testWinnerLine();
  testRow();
  testCol();
  testCrosses();
  testWinner();
  testState();
  console.log("ok");
};

runAll();
