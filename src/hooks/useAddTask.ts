import {
  addTaskSchema,
  type AddTaskFormValues,
  type Board,
} from "@/domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useBoard } from "./useBoard";

export function useAddTask(board: Board) {
  const { dispatch } = useBoard();
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ title: "" }, { title: "" }],
      status: board.columns[0]?.name ?? "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const onSubmit = (values: AddTaskFormValues) => {
    dispatch({
      type: "add_task",
      boardId: board.id as string,
      status: values.status,
      task: {
        id: crypto.randomUUID(),
        title: values.title,
        description: values.description ?? "",
        status: values.status,
        subtasks: values.subtasks
          .filter((s) => s.title.trim() !== "")
          .map((s) => ({
            id: crypto.randomUUID(),
            title: s.title,
            isCompleted: false,
          })),
      },
    });
    form.reset();
  };

  return {
    form,
    fields,
    append,
    remove,
    onSubmit,
  };
}
