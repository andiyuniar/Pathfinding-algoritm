import React from 'react';
import './node.css';


const Node = (props) => {
    const { isStart, isFinish, id, onMouseDown, onMouseUp, onMouseEnter, isWall } = props;
    const otherClass = isStart ? 'startNode' : isFinish ? 'finishNode': '';
    const wallClass = isWall ? 'wallNode' : '';
    //const routeClass = isShortRoute ? 'routeNode' : ''

    return (
        <div id={id} className={`nodeBox ${otherClass} ${wallClass}`} onMouseDown={onMouseDown} 
            onMouseUp={onMouseUp} onMouseEnter={onMouseEnter}>
        </div>)
}

export default Node;