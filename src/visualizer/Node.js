import React from 'react';
import './node.css';


const Node = (props) => {
    const { isStart, isFinish, id } = props;
    const otherClass = isStart ? 'startNode' : isFinish ? 'finishNode': '';
    //const routeClass = isRoute ? 'routeNode' : ''

    return (
        <div id={id} className={`nodeBox ${otherClass}` }>

        </div>)
}

export default Node;