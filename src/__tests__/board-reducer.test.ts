import { expect, test, describe } from "vitest";
import { boardReducer, type ActionType } from "../domain/board";

describe("boardReducer", () => {
  test("should throw an error for unknown action type", () => {
    const state = {
      boards: [],
    };
    const action = { type: "unknown_action" } as unknown as ActionType;

    expect(() => boardReducer(state, action)).toThrow(
      "Unknown action type: unknown_action",
    );
  });
});
