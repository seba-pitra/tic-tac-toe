export const saveGameToStorage = ({
  board,
  turn,
}: {
  board: string[];
  turn: string;
}) => {
  // save board to local storage
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", JSON.stringify(turn));
};

export const removeGameFromStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
