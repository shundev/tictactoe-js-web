const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

const ttt = require("./tictactoe.js");

let main = () => {
  askInput(ttt.state());
};

let printState = state => {
  let b = state.board;
  console.log(`------------`);
  console.log(`|${b[0]}|${b[1]}|${b[2]}|`);
  console.log(`|${b[3]}|${b[4]}|${b[5]}|`);
  console.log(`|${b[6]}|${b[7]}|${b[8]}|`);
  console.log(`------------`);
};

let askInput = prevState => {
  printState(prevState);
  rl.question(`Player${prevState.player}: `, answer => {
    let select = Number(answer);
    let state = ttt.state(prevState, select);
    if (state.winner) {
      printState(state);
      console.log(`Winner: player${state.winner}`);
      rl.close();
      return;
    }

    if (state.isDraw) {
      printState(state);
      console.log(`Draw game`);
      rl.close();
      return;
    }

    askInput(state);
  });
};

main();
