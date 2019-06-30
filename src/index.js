const ttt = require("./tictactoe.js");

let onLoad = e => {
  main();
};

let main = () => {
  let state = [ttt.state()];
  let _buttons = buttons();
  let _drawBoard = drawBoard(_buttons);

  drawStatus(`Player${current(state).player}'s turn`);
  _drawBoard(current(state).board);

  let onClickButton = index => e => {
    if (current(state).winner || current(state).isDraw) {
      return;
    }

    if (current(state).board[index]) {
      return;
    }

    state.push(ttt.state(current(state), index));
    drawStatus(`Player${current(state).player}'s turn`);
    _drawBoard(current(state).board);

    if (current(state).winner) {
      drawStatus(`Winner: player${current(state).winner}`);
      return;
    }

    if (current(state).isDraw) {
      drawStatus(`Draw game`);
      return;
    }
  };

  _buttons.map((v, i) => v.addEventListener("click", onClickButton(i)));
};

let current = state => {
  return state[state.length - 1];
};

let drawStatus = msg => {
  document.getElementById("status").innerText = msg;
};

let drawBoard = buttons => board => {
  buttons.map((v, i) => {
    if (board[i]) {
      v.innerText = board[i];
    } else {
      v.innerText = "";
    }
  });
};

let buttons = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => button(v));
};

let button = num => {
  return document.getElementById(`button${num}`);
};

window.addEventListener("load", onLoad);
