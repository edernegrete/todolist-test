import React from 'react'

type StateColumnItemPropsType = {
  task: string;
  disableRigth: boolean;
  disableLeft: boolean;
  handleMoveLeft: () => void;
  handleMoveRight: () => void;
}
export const StateColumnItem = ({ 
  task, 
  handleMoveLeft, 
  handleMoveRight, 
  disableRigth, 
  disableLeft 
}: StateColumnItemPropsType ) => (
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
    <button disabled={disableLeft} onClick={handleMoveLeft}>Move Left</button>
    <h3>{task}</h3>
    <button disabled={disableRigth} onClick={handleMoveRight}>Move Right</button>
  </div>
)