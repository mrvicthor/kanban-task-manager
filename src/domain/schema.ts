import { z } from "zod";

export const COLUMN_OPTIONS = [
  "Todo",
  "Doing",
  "Done",
  "Now",
  "Next",
  "Later",
] as const;

export type ColumnName = (typeof COLUMN_OPTIONS)[number];

const columnName = z.enum(COLUMN_OPTIONS, { message: "Select a column" });
const boardName = z.string().min(1, "Board name is required");

export const subtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isCompleted: z.boolean().default(false),
});

const columnsArray = <T extends z.ZodType<{ name: string }>>(item: T) =>
  z
    .array(item)
    .refine(
      (columns) => new Set(columns.map((c) => c.name)).size === columns.length,
      { message: "Columns must be unique" },
    );

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  subtasks: z.array(subtaskSchema).default([]),
});

export const columnSchema = z.object({
  name: columnName,
  tasks: z.array(taskSchema).default([]),
});

export const boardSchema = z.object({
  name: boardName,
  columns: columnsArray(columnSchema),
});

export type BoardFormDTO = z.infer<typeof boardSchema>;

const boardColumnFields = columnSchema.pick({ name: true });

export const addBoardSchema = z.object({
  name: boardName,
  columns: columnsArray(boardColumnFields),
});

export type AddBoardFormValues = z.infer<typeof addBoardSchema>;

export const addTaskSchema = z.object({
  title: z.string().min(1, "Can't be empty"),
  description: z.string().optional(),
  subtasks: z.array(z.object({ title: z.string().min(1, "Can't be empty") })),
  status: z.string().min(1, "Status is required"),
});

export const editBoardSchema = addBoardSchema.extend({
  columns: columnsArray(
    boardColumnFields.extend({
      id: z.string().optional(),
    }),
  ),
});

export type EditBoardFormValues = z.infer<typeof editBoardSchema>;

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

export const subtaskEntitySchema = subtaskSchema.extend({
  id: z.string(),
});

export const taskEntitySchema = taskSchema.extend({
  id: z.string(),
  subtasks: z.array(subtaskEntitySchema).default([]),
});

export const columnEntitySchema = columnSchema.extend({
  id: z.string(),
  tasks: z.array(taskEntitySchema).default([]),
});

export const boardEntitySchema = boardSchema.extend({
  id: z.string(),
  columns: columnsArray(columnEntitySchema),
});

export type Board = z.infer<typeof boardEntitySchema>;
export type Column = Board["columns"][number];
export type Task = Column["tasks"][number];
export type Subtask = Task["subtasks"][number];
