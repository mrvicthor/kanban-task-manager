const MATCHING_COLORS: Record<string, string> = {
  Todo: "#49C4E5",
  Doing: "#8471F2",
  Done: "#67E2AE",
  Now: "#E5B115",
  Next: "#0505FB",
  Later: "#04F4FC",
};

export const getStatusColor = (value: string) => MATCHING_COLORS[value];
