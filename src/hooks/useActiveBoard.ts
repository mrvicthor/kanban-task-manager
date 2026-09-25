import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useBoard } from "./useBoard";

export const useActiveBoard = () => {
  const {
    state: { boards },
  } = useBoard();

  const [searchParams, setSearchParams] = useSearchParams();

  const activeBoardName = searchParams.get("board");

  useEffect(() => {
    const boardExists = boards.some((b) => b.name === activeBoardName);
    if (!activeBoardName || !boardExists) {
      if (boards.length > 0) {
        setSearchParams({ board: boards[0].name }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  }, [activeBoardName, boards, setSearchParams]);

  return {
    activeBoardName,
    setSearchParams,
  };
};
