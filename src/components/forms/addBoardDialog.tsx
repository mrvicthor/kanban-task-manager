import { useBoard } from "@/hooks/useBoard";
import { Controller } from "react-hook-form";
import { X } from "lucide-react";
import { COLUMN_OPTIONS } from "@/domain/schema";

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
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input";
import { useAddBoard } from "@/hooks/useAddBoard";

export function AddBoardDialog() {
  const { setOpenAddBoardForm, openAddBoardForm, dispatch } = useBoard();
  const { form, onSubmit, fields, remove, append } = useAddBoard(
    setOpenAddBoardForm,
    dispatch,
  );

  return (
    <Dialog open={openAddBoardForm} onOpenChange={setOpenAddBoardForm}>
      <DialogTrigger render={<Button>+ Add New Board</Button>}></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add New Board</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs text-muted-foreground">
                  Name
                </FieldLabel>
                <Input
                  placeholder="e.g. Web Design"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col gap-3">
            <FieldLabel className="text-xs text-muted-foreground">
              Columns
            </FieldLabel>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Controller
                  control={form.control}
                  name={`columns.${index}.name`}
                  render={({ field, fieldState }) => (
                    <Field className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>

                        <SelectContent>
                          {COLUMN_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label="Remove column"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}

            <Button
              type="button"
              className="w-full rounded-full bg-add-column-bg text-add-column-fg hover:bg-add-column-bg/80 cursor-pointer"
              onClick={() => append({ name: "Todo" })}
            >
              + Add New Column
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Create New Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
