import type { SetURLSearchParams } from "react-router";
import { useBoard } from "./useBoard";

export function useDeleteBoard(
  boardId: string,
  setSearchParams: SetURLSearchParams,
  activeBoardName: string,
) {
  const {
    state: { boards },
    setShowDeleteBoard,
    dispatch,
  } = useBoard();

  const deleteBoard = () => {
    const boardBeingDeleted = boards.find((b) => b.id === boardId);
    const isViewingDeletedBoard = boardBeingDeleted?.name === activeBoardName;
    if (isViewingDeletedBoard) {
      const remainingBoards = boards.filter(
        (b) => b.id !== boardBeingDeleted?.id,
      );
      if (remainingBoards.length > 0) {
        setSearchParams({ board: remainingBoards[0].name }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
    setTimeout(() => {
      dispatch({
        type: "delete_board",
        boardId,
      });
    }, 100);

    setShowDeleteBoard(false);
  };

  return { deleteBoard };
}
