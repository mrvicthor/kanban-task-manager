import {
  type Board,
  type EditBoardFormValues,
  editBoardSchema,
} from "@/domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useBoard } from "./useBoard";

export function useUpdateBoard(board: Board) {
  const { dispatch } = useBoard();
  const form = useForm<EditBoardFormValues>({
    resolver: zodResolver(editBoardSchema),
    defaultValues: {
      name: board.name,
      columns: board.columns.map(({ id, name }) => ({
        id,
        name,
      })),
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = (values: EditBoardFormValues) => {
    dispatch({
      type: "update_board",
      boardId: board.id,
      boardName: values.name,
      columns: values.columns,
    });
  };

  return {
    form,
    fields,
    remove,
    append,
    onSubmit,
  };
}
