import React from 'react';
import './node.css';


const Node = (props) => {
    const { id, isStart, isFinish, isVisited, isRoute, onClick } = props;
    const otherClass = isStart ? 'startNode' : isFinish ? 'finishNode': isVisited ? 'visitedNode': '';
    const routeClass = isRoute ? 'routeNode' : ''

    return (
        <div id={id} className={`nodeBox ${otherClass} ${routeClass}`} onClick={onClick}>
        </div>)
}

export default Node;