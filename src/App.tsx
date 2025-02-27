import {useState} from "react";
import confetti from "canvas-confetti";
import {Square} from "./components/Square";
import {WinnerModal} from "./components/WinnerModal";
import {TURNS} from "./constans";
import {checkEndGame, checkWinner} from "./logic/board";
import {removeGameFromStorage, saveGameToStorage} from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board");
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState<string>(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn");
    if (turnFromLocalStorage) return JSON.parse(turnFromLocalStorage);
    return TURNS.X;
  });
  const [winner, setWinner] = useState<null | boolean | string>(null); // null is no winner, false is a draw

  const updateBoard = (index: number) => {
    // if the square is already filled, return
    if (board[index] || winner) return;

    // update board
    const newBoard = [...board];
    newBoard[index] = turn; // x or o
    setBoard(newBoard);

    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({board: newBoard, turn: newTurn});

    // check for winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    removeGameFromStorage();
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        {board.map((_: string[], index: number) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
