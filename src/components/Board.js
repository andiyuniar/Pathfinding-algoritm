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
                isWall: false,
            }
            currentRow.push(currentNode);
        }
        nodes.push(currentRow);
    }
    return nodes;
}

const Board = () => {
    const [nodes, setNodes] = useState(createNodes());
    const [mousePressed, setMousePressed] = useState(false);
    const [drawSelection, setDrawSelection] = useState('WALL');
    const [message, setMessage] = useState('Click and drag on nodes to create a wall');

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
            cloneNode[node.row][node.col].isShortRoute = node.isShortRoute;
            setTimeout(() => {
                document.getElementById(node.id).style['background-color'] = '#05f5a5';
            }, 3000)
        }
        setNodes(cloneNode);

        //console.table(visitedNodes);
        console.log('Visualize end');
    }

    /// update node into wall
    const UpdateWall = (node) => {
        const cloneNode = [...nodes];
        const selectedNode = cloneNode[node.row][node.col];
        const newNode = {
            ...selectedNode,
            isWall: !selectedNode.isWall
        }
        cloneNode[node.row][node.col] = newNode;
        setNodes(cloneNode);
    }

    const updateStart = (node) => {
        const cloneNode = [...nodes];
        const previousStart = cloneNode.filter(node => {
            return node.isStart === true;
        });
        console.log(previousStart)
    }

    const mouseDownHandler = (node) => {
        setMousePressed(true);
        switch(drawSelection) {
            case 'WALL':
                UpdateWall(node);
                break;
            case 'START':
                updateStart(node);
                break;
            case 'FINISH':
                break;
            default:
                break;
        }
    }

    const mouseUpHandler = () => {
        setMousePressed(false);
    }

    const mouseEnterHandler = (node) => {
        if (!mousePressed) return;

        UpdateWall(node);
    }

    const startChangeHandler = () => {
        setDrawSelection('START');
        setMessage('Click on node to define START point');
    }

    const finishtChangeHandler = () => {
        setDrawSelection('FINISH');
        setMessage('Click on node to define FINISH point');
    }

    const wallChangeHandler = () => {
        setDrawSelection('WALL');
        setMessage('Click and drag on nodes to create a wall');
    }

    return(
        <React.Fragment>
            <button onClick={visualizeAlgoritm}>Find Sortest Route</button>
            <p>
                <input type="radio" name="draw_selection" value="START" onChange={() => startChangeHandler()} 
                    checked={drawSelection === 'START'}></input>START node
                <input type="radio" name="draw_selection" value="FINISH" onChange={() => finishtChangeHandler()} 
                    checked={drawSelection === 'FINISH'}></input>FINISH node
                <input type="radio" name="draw_selection" value="WALL" onChange={() =>wallChangeHandler()} 
                    checked={drawSelection === 'WALL'}></input>WALL node
            </p>
            <p>{message}</p>
            <div className='grid'>
                {
                    nodes.map((rows, rowIdx) => {
                        return(
                            <div key={rowIdx} >
                                {
                                    rows.map((col, colIdx) => {
                                        return (
                                            <Node id={col.id} key={colIdx} isStart={col.isStart} 
                                                isFinish={col.isFinish} isVisited={col.isVisited} 
                                                onMouseDown={() => mouseDownHandler(col)}
                                                onMouseUp={mouseUpHandler} isWall={col.isWall}
                                                onMouseEnter={() => mouseEnterHandler(col)}
                                            ></Node>
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
