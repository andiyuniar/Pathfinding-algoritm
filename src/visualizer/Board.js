import React, { useState } from 'react';
import Node from './Node';
import { dijkstra, getShortestRoute } from '../algorithm/dijkstraAlgoritm';
import './Board.css';

const BOARD_LENGTH = 60;
const BOARD_HEIGHT = 25;
const START_ROW = 10;
const START_COL = 3;
const FINISH_ROW = 23;
const FINISH_COL = 34;

const createNodes = () => {
    const nodes = [];
    let num = 0;
    for (let row = 0; row < BOARD_HEIGHT; row++){
        const currentRow = [];
        for(let col = 0; col < BOARD_LENGTH; col++){
            num += 1;
            const currentNode = {
                id: `div-${num}`,
                row,
                col,
                isStart: row === START_ROW && col === START_COL,
                isFinish: row === FINISH_ROW && col === FINISH_COL,
                distance: row === START_ROW && col === START_COL ? 0 : Infinity,
                previousNode: null,
                isVisited: false,
                isShortRoute: false,
            }
            currentRow.push(currentNode);
        }
        nodes.push(currentRow);
    }
    return nodes;
}

const Board = () => {
    const [nodes, setNodes] = useState(createNodes());

    const visualizeAlgoritm = () => {
        const cloneNode = [...nodes];
        const startNode = cloneNode[START_ROW][START_COL];
        const finishNode = cloneNode[FINISH_ROW][FINISH_COL];

        const visitedNodes = dijkstra(cloneNode, startNode, finishNode);
        const routes = getShortestRoute(finishNode);
        // visualize searching route
        for(let node of visitedNodes) {
            cloneNode[node.row][node.col].isVisited = node.isVisited;
            setTimeout(() => {
                document.getElementById(node.id).style['background-color'] = 'yellow';
            }, 3000);
        }
        //visualize short route
        for(let node of routes) {
            cloneNode[node.row][node.col].isRoute = node.isRoute;
            setTimeout(() => {
                document.getElementById(node.id).style['background-color'] = 'blue';
            }, 3000)
        }
        setNodes(cloneNode);

        //console.table(visitedNodes);
        console.log('Visualize end');
}

    return(
        <React.Fragment>
            <button onClick={visualizeAlgoritm}>Find Sortest Route</button>
            <div className='grid'>
                {
                    nodes.map((rows, rowIdx) => {
                        return(
                            <div key={rowIdx}>
                                {
                                    rows.map((col, colIdx) => {
                                        return (
                                            <Node id={col.id} key={colIdx} isStart={col.isStart} isFinish={col.isFinish} isVisited={col.isVisited} isRoute={col.isRoute}></Node>
                                        )
                                    })
                                }
                            </div> 
                        )
                    })
                }
            </div>
        </React.Fragment>
    );
}

export default Board;
