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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBoard } from "@/hooks/useBoard";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useAddTask } from "@/hooks/useAddTask";

type Props = {
  activeBoardName: string;
};

export function AddTaskDialog({ activeBoardName }: Props) {
  const {
    state: { boards },
    showTaskForm,
    setShowTaskForm,
  } = useBoard();
  const board = boards.find((b) => b.name === activeBoardName)!;

  const { form, onSubmit, remove, append, fields } = useAddTask(board);

  return (
    <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
      <DialogTrigger
        render={<Button className="rounded-full">+ Add New Task</Button>}
      ></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add New Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs text-muted-foreground">
                  Title
                </FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Take coffee break"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs text-muted-foreground">
                  Description
                </FieldLabel>

                <Textarea
                  id={field.name}
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                  className="min-h-28 resize-none"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col gap-3">
            <FieldLabel className="text-xs text-muted-foreground">
              Subtasks
            </FieldLabel>

            {fields.map((field, index) => (
              <Controller
                key={field.id}
                control={form.control}
                name={`subtasks.${index}.title`}
                render={({ field: inputField, fieldState }) => (
                  <Field>
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="e.g. Make coffee"
                        aria-invalid={!!fieldState.error}
                        className={
                          fieldState.error
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                        {...inputField}
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label="Remove subtask"
                        className="text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
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
          </div>

          <Controller
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-xs text-muted-foreground">
                  Status
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
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
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
