import {WINNER_COMBOS} from "../constans";

export const checkWinner = (boardToCheck: string[]) => {
  // check all winner combos to see who won between x and o
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // x or o
    }
  }

  return null;
};

export const checkEndGame = (boardToCheck: string[]) => {
  return boardToCheck.every(square => square);
};
