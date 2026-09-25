import type { ActionType } from "@/domain/board";
import {
  editTaskSchema,
  type EditTaskFormValues,
  type Task,
} from "@/domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionDispatch } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export function useUpdateTask(
  boardId: string,
  task: Task,
  dispatch: ActionDispatch<[action: ActionType]>,
  onOpenChange: (open: boolean) => void,
) {
  const form = useForm<EditTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      subtasks: task.subtasks,
      status: task.status,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const onSubmit = (values: EditTaskFormValues) => {
    dispatch({
      type: "update_task",
      boardId,
      oldStatus: task.status,
      taskId: task.id as string,
      task: {
        ...task,
        title: values.title,
        description: values.description ?? "",
        status: values.status,
        subtasks: values.subtasks.map((s) => ({
          id: s.id ?? crypto.randomUUID(),
          title: s.title,
          isCompleted: s.isCompleted ?? false,
        })),
      },
    });
    onOpenChange(false);
  };

  return {
    form,
    fields,
    append,
    remove,
    onSubmit,
  };
}
