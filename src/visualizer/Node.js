import React from 'react';
import './node.css';


const Node = (props) => {
    const { isStart, isFinish, isVisited, isRoute } = props;
    const otherClass = isStart ? 'startNode' : isFinish ? 'finishNode': isVisited ? 'visitedNode': '';
    const routeClass = isRoute ? 'routeNode' : ''

    return (
        <div className={`nodeBox ${otherClass} ${routeClass}`}>

        </div>)
}

export default Node;