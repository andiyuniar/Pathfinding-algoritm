import React from 'react';
import './node.css';


const Node = (props) => {
    const { isStart, isFinish, isVisited } = props;
    const otherClass = isStart ? 'startNode' : isFinish ? 'finishNode': isVisited ? 'visitedNode': '';

    return (
        <div className={`nodeBox ${otherClass}`}>

        </div>)
}

export default Node;