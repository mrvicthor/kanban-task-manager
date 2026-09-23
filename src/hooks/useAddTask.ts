import { useState } from "react";

export function useAddTask() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return {
    showTaskForm,
    setShowTaskForm,
  };
}
