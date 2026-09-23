import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useBoard } from "./useBoard";

export const useActiveBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBoardName = searchParams.get("board");

  const {
    state: { boards },
  } = useBoard();

  useEffect(() => {
    const boardExists = boards.some((b) => b.name === activeBoardName);
    if (!activeBoardName || !boardExists) {
      if (boards.length > 0) {
        setSearchParams({ board: boards[0].name }, { replace: true });
      }
    }
  }, [activeBoardName, boards, setSearchParams]);

  return {
    activeBoardName,
    setSearchParams,
  };
};
