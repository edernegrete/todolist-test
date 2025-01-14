import React from 'react'
import {StateColumnItem} from './StateColumnItem'

type StateColumnPropsType = {
  title: string;
  taskList: string[];
  columnIndex: number;
  isFirst: boolean;
  isLast: boolean;
  handleTaskTransition: (currentIndex: number, moveIndex: number, elementIndex: number) => void;
}
export const StateColumn = ({
  title,
  taskList,
  handleTaskTransition,
  columnIndex,
  isFirst,
  isLast,
}: StateColumnPropsType) => {

  const createMoveHandler = (direction: number) => (taskIndex: number) => {
    handleTaskTransition(columnIndex, columnIndex + direction, taskIndex);
  };

  const handleMoveLeft = createMoveHandler(-1);
  const handleMoveRight = createMoveHandler(1);

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}> {title} </h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {taskList.map((task, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <StateColumnItem
              task={task}
              handleMoveLeft={() => handleMoveLeft(index)}
              handleMoveRight={() => handleMoveRight(index)}
              disableLeft={isFirst}
              disableRigth={isLast}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};