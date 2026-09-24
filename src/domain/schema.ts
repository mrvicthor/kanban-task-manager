import { z } from "zod";

export const COLUMN_OPTIONS = [
  "Todo",
  "Doing",
  "Done",
  "Now",
  "Next",
  "Later",
] as const;

export const subtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isComplete: z.boolean().default(false),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  subtasks: z.array(subtaskSchema).optional,
});

export const columnSchema = z.object({
  name: z.string().min(1, "Column name is required"),
  tasks: z.array(taskSchema).optional(),
});

export const boardSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  columns: z.array(columnSchema).min(1, "At least one column is required"),
});

export type BoardFormDTO = z.infer<typeof boardSchema>;

export const addBoardSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  columns: z
    .array(
      z.object({
        name: z.enum(COLUMN_OPTIONS, { message: "Select a column" }),
      }),
    )
    .min(1, "At least one column is required")
    .refine(
      (columns) => new Set(columns.map((c) => c.name)).size === columns.length,
      { message: "Columns must be unique" },
    ),
});

export type AddBoardFormValues = z.infer<typeof addBoardSchema>;

export const addTaskSchema = z.object({
  title: z.string().min(1, "Can't be empty"),
  description: z.string().optional(),
  subtasks: z.array(z.object({ title: z.string().min(1, "Can't be empty") })),
  status: z.string().min(1, "Status is required"),
});

export type AddTaskFormValues = z.infer<typeof addTaskSchema>;

export const editTaskSchema = addTaskSchema.extend({
  subtasks: z.array(
    z.object({
      id: z.string().optional(), // existing subtasks carry their real id; new ones omit it
      title: z.string().min(1, "Can't be empty"),
      isCompleted: z.boolean().optional(), // existing subtasks carry true/false; new ones default false on submit
    }),
  ),
});

export type EditTaskFormValues = z.infer<typeof editTaskSchema>;
