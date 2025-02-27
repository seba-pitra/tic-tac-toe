import React from "react";
import {Square} from "./Square";

interface Props {
  winner: string | boolean | null;
  resetGame: () => void;
}

export const WinnerModal: React.FC<Props> = ({winner, resetGame}) => {
  if (winner === null) return null;

  const winnerText = winner ? `${winner} wins!` : "It's a draw!";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">
          {winner && <Square>{winner.toString()}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Reset</button>
        </footer>
      </div>
    </section>
  );
};
