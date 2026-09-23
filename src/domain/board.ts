export type Subtask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export type Column = {
  id: string;
  name: string;
  tasks: Task[];
};

export type Board = {
  id: string;
  name: string;
  columns: Column[];
};

export type BoardData = {
  boards: Board[];
};

export type ActionType =
  | {
      type: "add_board";
      boardName: string;
      columns: Column[];
    }
  | { type: "delete_board"; boardId: string }
  | {
      type: "update_board";
      boardId: string;
      boardName: string;
      columns: Column[];
    }
  | {
      type: "add_task";
      boardId: string;
      status: string;
      task: Task;
    }
  | {
      type: "update_task";
      boardId: string;
      oldStatus: string;
      taskId: string;
      task: Task;
    }
  | {
      type: "delete_task";
      boardId: string;
      status: string;
      taskId: string;
    };

export function boardReducer(state: BoardData, action: ActionType) {
  switch (action.type) {
    case "add_board": {
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: crypto.randomUUID(),
            name: action.boardName,
            columns: action.columns,
          },
        ],
      };
    }
    case "delete_board": {
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.boardId),
      };
    }
    case "update_board": {
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.boardId) {
            return {
              ...board,
              name: action.boardName,
              columns: action.columns,
            };
          }
          return board;
        }),
      };
    }
    case "add_task": {
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.boardId) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.name === action.status) {
                  return { ...column, tasks: [...column.tasks, action.task] };
                }
                return column;
              }),
            };
          }
          return board;
        }),
      };
    }
    case "update_task": {
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id !== action.boardId) return board;
          const isMovingColumns = action.oldStatus !== action.task.status;

          return {
            ...board,
            columns: board.columns.map((column) => {
              if (isMovingColumns && column.name === action.oldStatus) {
                return {
                  ...column,
                  tasks: column.tasks.filter(
                    (task) => task.id !== action.taskId,
                  ),
                };
              }
              if (column.name === action.task.status) {
                const taskExists = column.tasks.some(
                  (task) => task.id === action.taskId,
                );
                return {
                  ...column,
                  tasks: taskExists
                    ? column.tasks.map((task) =>
                        task.id === action.taskId
                          ? { ...task, ...action.task }
                          : task,
                      )
                    : [...column.tasks, action.task],
                };
              }
              return column;
            }),
          };
        }),
      };
    }
    case "delete_task": {
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.boardId) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.name === action.status) {
                  return {
                    ...column,
                    tasks: column.tasks.filter(
                      (task) => task.id !== action.taskId,
                    ),
                  };
                }
                return column;
              }),
            };
          }
          return board;
        }),
      };
    }
  }
}
