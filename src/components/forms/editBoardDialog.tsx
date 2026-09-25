import { Controller, useWatch } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { COLUMN_OPTIONS, type Board } from "@/domain/schema";
import { useUpdateBoard } from "@/hooks/useUpdateBoard";
import { useBoard } from "@/hooks/useBoard";

type EditBoardDialogProps = {
  board: Board;
};

export function EditBoardDialog({ board }: EditBoardDialogProps) {
  const { setShowEditBoard } = useBoard();
  const { form, fields, onSubmit, remove, append } = useUpdateBoard(board);

  const columns = useWatch({ control: form.control, name: "columns" }) ?? [];
  const usedNames = columns.map((c) => c.name);
  const nextAvailable = COLUMN_OPTIONS.find((o) => !usedNames.includes(o));

  const columnsError =
    form.formState.errors.columns?.root?.message ??
    form.formState.errors.columns?.message;

  return (
    <Dialog open={!!board} onOpenChange={() => setShowEditBoard(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Edit Board</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-board-name">Board Name</FieldLabel>
                  <Input
                    {...field}
                    id="edit-board-name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldGroup className="gap-3">
              <FieldLabel>Board Columns</FieldLabel>

              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`columns.${index}.name`}
                  control={form.control}
                  render={({ field: selectField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Select
                        name={selectField.name}
                        value={selectField.value}
                        onValueChange={selectField.onChange}
                      >
                        <SelectTrigger
                          id={`edit-board-column-${index}`}
                          aria-invalid={fieldState.invalid}
                          aria-label={`Column ${index + 1}`}
                          className="flex-1"
                        >
                          <SelectValue placeholder="Select a column" />
                        </SelectTrigger>
                        <SelectContent>
                          {COLUMN_OPTIONS.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              disabled={
                                option !== selectField.value &&
                                usedNames.includes(option)
                              }
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label={`Remove column ${index + 1}`}
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

              {columnsError && <FieldError>{columnsError}</FieldError>}

              <Button
                type="button"
                className="w-full rounded-full bg-add-column-bg py-5 text-add-column-fg hover:bg-add-column-bg/80"
                disabled={!nextAvailable}
                onClick={() => nextAvailable && append({ name: nextAvailable })}
              >
                + Add New Column
              </Button>
            </FieldGroup>

            <Button type="submit" className="w-full rounded-full py-5">
              Save Changes
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
