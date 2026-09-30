import type { ActionType } from "@/domain/board";
import {
  createAddBoardSchema,
  type AddBoardFormValues,
  type Board,
} from "@/domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionDispatch, Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export function useAddBoard(
  setOpenAddBoardForm: Dispatch<SetStateAction<boolean>>,
  dispatch: ActionDispatch<[action: ActionType]>,
  boards: Board[],
) {
  const form = useForm<AddBoardFormValues>({
    resolver: zodResolver(
      createAddBoardSchema(boards.map((board) => board.name)),
    ),
    defaultValues: {
      name: "",
      columns: [{ name: "Todo" }, { name: "Doing" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = (values: AddBoardFormValues) => {
    dispatch({
      type: "add_board",
      boardName: values.name,
      columns: values.columns.map((col) => ({
        id: crypto.randomUUID(),
        name: col.name,
        tasks: [],
      })),
    });
    form.reset();
    setOpenAddBoardForm(false);
  };

  return {
    form,
    fields,
    append,
    remove,
    onSubmit,
  };
}
