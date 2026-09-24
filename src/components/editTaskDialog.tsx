import { Controller } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useBoard } from "@/hooks/useBoard";
import type { Task } from "@/domain/board";
import { useUpdateTask } from "@/hooks/useUpdateTask";

type EditTaskDialogProps = {
  task: Task;
  boardId: string;
  onOpenChange: (open: boolean) => void;
};

export function EditTaskDialog({
  task,
  boardId,
  onOpenChange,
}: EditTaskDialogProps) {
  const {
    state: { boards },
    dispatch,
  } = useBoard();

  const board = boards.find((b) => b.id === boardId)!;

  const { form, fields, onSubmit, remove, append } = useUpdateTask(
    boardId,
    task,
    dispatch,
    onOpenChange,
  );

  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-task-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="edit-task-title"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-task-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="edit-task-description"
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    className="min-h-28 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldGroup className="gap-3">
              <FieldLabel>Subtasks</FieldLabel>

              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`subtasks.${index}.title`}
                  control={form.control}
                  render={({ field: inputField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Input
                        {...inputField}
                        id={`edit-task-subtask-${index}`}
                        aria-invalid={fieldState.invalid}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label="Remove subtask"
                        className="text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <X className="size-4" />
                      </button>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}

              <Button
                type="button"
                className="w-full rounded-full bg-add-column-bg text-add-column-fg hover:bg-add-column-bg/80"
                onClick={() => append({ title: "" })}
              >
                + Add New Subtask
              </Button>
            </FieldGroup>

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-task-status">Status</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="edit-task-status"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {board.columns.map((column) => (
                        <SelectItem key={column.id} value={column.name}>
                          {column.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full rounded-full">
              Save Changes
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
