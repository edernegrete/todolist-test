/* eslint-disable @typescript-eslint/no-redeclare */
export const STATES = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const;

export type STATES = typeof STATES[keyof typeof STATES]

export type ColumnType = {
  [key in STATES]: {
    id: STATES,
    title: string;
    taskList: string[];
  };
}
export const COLUMNS: ColumnType = {
  [STATES.TODO]: {
    id: STATES.TODO,
    title: 'To Do',
    taskList: []
  },
  [STATES.IN_PROGRESS]: {
    id: STATES.IN_PROGRESS,
    title: 'In Progress',
    taskList: []
  },
  [STATES.DONE]: {
    id: STATES.DONE,
    title: 'Done',
    taskList: []
  },
}
