import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { useBoard } from "@/hooks/useBoard";
import type { Board } from "@/domain/schema";
import { BoardColumn } from "./boardColumn";
import { cardClasses } from "./sortableTaskCard";
import { TaskCardContent } from "./taskCardContent";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

type BoardUIProps = {
  board: Board;
};

const BoardUI = ({ board }: BoardUIProps) => {
  const { setShowEditBoard } = useBoard();
  const {
    sensors,
    handleDragStart,
    handleDragOver,
    openTask,
    handleDragEnd,
    activeTask,
    setActiveTask,
  } = useDragAndDrop(board);

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveTask(null)}
        >
          <ul className="flex gap-6">
            {board.columns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                onOpenTask={openTask}
              />
            ))}

            <li className="flex flex-col w-70 shrink-0 group min-h-[80vh]">
              <span className="mb-6 h-4.25" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setShowEditBoard(true)}
                className="text-2xl font-bold text-muted-foreground group-hover:text-primary flex-1 rounded-[6px] bg-linear-to-b from-border/40 to-border/20 flex items-center justify-center cursor-pointer hover:from-border/60 hover:to-border/30 transition-colors"
              >
                + New Column
              </button>
            </li>
          </ul>

          <DragOverlay>
            {activeTask && (
              <div
                className={`${cardClasses} rotate-2 shadow-xl cursor-grabbing`}
              >
                <TaskCardContent task={activeTask} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </section>
  );
};

export default BoardUI;
