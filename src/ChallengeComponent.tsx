import React from 'react';
import { StateColumn } from './components/StateColumn';
import { COLUMNS, STATES, ColumnType } from './utils/constants';

const TASK_DEFAULT_COLUMN = STATES.TODO;
const LIST_COLUMNS = Object.keys(COLUMNS) as STATES[];

export function ChallengeComponent() {
  const [userInputTask, setUserInputTask] = React.useState<string>('');
  const [columns, setColumns] = React.useState<ColumnType>(COLUMNS);
  const columnEntries = React.useMemo(() => Object.entries(columns), [columns]);

  const addTaskToColumn = (column: STATES, task: string) => {
    setColumns(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        taskList: [...prev[column].taskList, task],
      },
    }));
  };

  const handleAddTask = () => {
    if (!userInputTask.trim()) return;
    addTaskToColumn(TASK_DEFAULT_COLUMN, userInputTask.trim());
    setUserInputTask('');
  };

  const moveTaskBetweenColumns = (fromColumn: STATES, toColumn: STATES, taskIndex: number) => {
    const task = columns[fromColumn].taskList[taskIndex];

    setColumns(prev => ({
      ...prev,
      [fromColumn]: {
        ...prev[fromColumn],
        taskList: prev[fromColumn].taskList.filter((_, index) => index !== taskIndex),
      },
      [toColumn]: {
        ...prev[toColumn],
        taskList: [...prev[toColumn].taskList, task],
      },
    }));
  };

  const handleTaskTransition = (currentIndex: number, direction: number, taskIndex: number) => {
    const fromColumn = LIST_COLUMNS[currentIndex];
    const toColumn = LIST_COLUMNS[currentIndex + direction];
    moveTaskBetweenColumns(fromColumn, toColumn, taskIndex);
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
       }}>
        {columnEntries.map(([_, { id, title, taskList }], index) => (
          <StateColumn
            key={id}
            title={title}
            taskList={taskList}
            handleTaskTransition={(direction, taskIndex) => handleTaskTransition(index, direction, taskIndex)}
            isFirst={index === 0}
            isLast={index === columnEntries.length - 1}
          />
        ))}
      </div>
      <div>
        <input
          value={userInputTask}
          onChange={e => setUserInputTask(e.target.value)}
          placeholder="Enter a task"
          style={{ marginRight: '8px', padding: '8px' }}
        />
        <button onClick={handleAddTask} style={{ padding: '8px 16px' }}>
          Add Task
        </button>
      </div>
    </div>
  );
}