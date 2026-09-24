import "./App.css";
import { createPortal } from "react-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useSlide } from "./hooks/useSlide";
import OpenEye from "@/assets/icon-show-sidebar.svg";
import { useBoard } from "@/hooks/useBoard";
import { AddBoardDialog } from "./components/forms/addBoardDialog";
import Board from "./components/board";

import { AddTaskDialog } from "./components/forms/addTaskDialog";
import { ViewTaskDialog } from "./components/viewTaskDialog";
import { useActiveBoard } from "./hooks/useActiveBoard";
import { DeleteTaskDialog } from "./components/deleteTaskDialog";
import { useDeleteTask } from "./hooks/useDeleteTask";
import { EditTaskDialog } from "./components/editTaskDialog";

function App() {
  const { currentSlide, setCurrentSlide } = useSlide(); // Ensure the slide context is used in the App component
  const {
    openAddBoardForm,
    showTaskForm,
    taskId,
    state: { boards },
    viewTask,
    onEdit,
    setOnEdit,
    dispatch,
    setConfirmDeleteOpen,
    confirmDeleteOpen,
    setTaskId,
  } = useBoard();
  const { activeBoardName } = useActiveBoard();
  const board = boards.find((b) => b.name === activeBoardName)!;
  const selectedTask =
    board.columns.flatMap((c) => c.tasks).find((t) => t.id === taskId) ?? null;

  const { handleDelete } = useDeleteTask(
    board.id,
    selectedTask!,
    dispatch,
    setConfirmDeleteOpen,
  );

  return (
    <>
      <Sidebar />
      <Header />
      <main
        className={`${currentSlide > 0 ? "ml-0" : "ml-75"} transition-all duration-300 ease-in-out`}
      >
        {currentSlide > 0 && (
          <button
            onClick={() => setCurrentSlide(0)}
            className="fixed bottom-10 -left-4 w-14 cursor-pointer flex items-center justify-center px-4 py-3 text-white rounded-2xl bg-primary"
          >
            <img
              src={OpenEye}
              alt="hide sidebar"
              className="w-3 h-3 brightness-0 invert"
            />
          </button>
        )}
        <Board />
      </main>
      {openAddBoardForm && createPortal(<AddBoardDialog />, document.body)}
      {showTaskForm && createPortal(<AddTaskDialog />, document.body)}
      {viewTask &&
        selectedTask &&
        createPortal(
          <ViewTaskDialog task={selectedTask} boardId={board.id} />,
          document.body,
        )}
      {confirmDeleteOpen &&
        selectedTask &&
        createPortal(
          <DeleteTaskDialog
            open={confirmDeleteOpen}
            onOpenChange={() => setConfirmDeleteOpen(false)}
            taskTitle={selectedTask.title}
            onConfirm={handleDelete}
          />,
          document.body,
        )}
      {onEdit &&
        selectedTask &&
        createPortal(
          <EditTaskDialog
            task={selectedTask}
            boardId={board.id}
            onOpenChange={() => {
              setOnEdit(false);
              setTaskId(null);
            }}
          />,
          document.body,
        )}
    </>
  );
}

export default App;
