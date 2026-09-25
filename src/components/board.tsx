import { useBoard } from "@/hooks/useBoard";
import { getStatusColor } from "@/helpers/getStatusColor";

type BoardProps = {
  activeBoardName: string;
};
const Board = ({ activeBoardName }: BoardProps) => {
  const {
    state: { boards },
    setTaskId,
    setViewTask,
    setShowEditBoard,
  } = useBoard();
  const board = boards.find((board) => board.name === activeBoardName)!;

  if (!board) {
    return (
      <p className="p-6 text-muted-foreground">
        No boards yet — create one to get started.
      </p>
    );
  }
  return (
    <section className="px-6 pb-6 pt-28.25 h-screen box-border overflow-x-auto">
      {board.columns.length === 0 ? (
        <div className="flex flex-col gap-8 justify-center items-center h-[80dvh] w-full">
          <p className="text-muted-foreground text-lg">
            This board is empty. Create a new column to get started
          </p>
          <button
            onClick={() => setShowEditBoard(true)}
            className="bg-primary text-white py-3 px-4 rounded-full capitalize hover:bg-primary-hover font-bold text-[15px] cursor-pointer"
          >
            + add new column
          </button>
        </div>
      ) : (
        <ul className="flex gap-6">
          {board.columns.map((column) => (
            <li key={column.id} className="flex flex-col w-70 shrink-0">
              <span className="flex items-center gap-3 uppercase text-muted-foreground font-bold text-xs tracking-[2.4px] mb-6">
                <span
                  style={{ backgroundColor: getStatusColor(column.name) }}
                  className="block rounded-full size-3.75 shrink-0"
                />
                {column.name} ({column.tasks.length})
              </span>

              <ul className="flex flex-col gap-5">
                {column.tasks.map((task) => (
                  <li
                    key={task.id}
                    onClick={() => {
                      setTaskId(task.id);
                      setViewTask(true);
                    }}
                    className="bg-card group rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] px-4 py-6 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <p className="text-[15px] font-bold text-foreground mb-1 group-hover:text-primary">
                      {task.title}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
                      {task.subtasks.length} subtasks
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className="flex flex-col w-70 shrink-0 group min-h-[85vh]">
            <span className="mb-6 h-4.25" aria-hidden="true" />{" "}
            <div className="flex-1 rounded-[6px] bg-linear-to-b from-border/40 to-border/20 flex items-center justify-center cursor-pointer hover:from-border/60 hover:to-border/30 transition-colors">
              <span
                onClick={() => setShowEditBoard(true)}
                className="text-2xl font-bold text-muted-foreground group-hover:text-primary"
              >
                + New Column
              </span>
            </div>
          </li>
        </ul>
      )}
    </section>
  );
};

export default Board;
