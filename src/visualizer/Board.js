import React, { Component } from 'react';
import Node from './Node';
import { dijkstra } from '../algorithm/dijkstraAlgoritm';
import './Board.css';

const START_ROW = 10;
const START_COL = 8;
const FINISH_ROW = 10;
const FINISH_COL = 45;
const BOARD_LENGTH = 50;
const BOARD_HEIGHT = 25

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
    };

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < BOARD_HEIGHT; row++) {
            const currentRow = [];
            for(let col = 0; col < BOARD_LENGTH; col++){
                let currentNode = {
                    col,
                    row,
                    isStart: row === START_ROW && col === START_COL,
                    isFinish: row === FINISH_ROW && col === FINISH_COL,
                    distance: row === START_ROW && col === START_COL ? 0 : Infinity,
                    isVisited: false,
                    previousNode: null
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({ nodes: nodes});
    }

    visualizeDijkstra() {
        const { nodes } = this.state;
        const startNode = nodes[START_ROW][START_COL];
        const finishNode = nodes[FINISH_ROW][FINISH_COL];

        const visitedNodes = dijkstra(nodes, startNode, finishNode);
        
        for(let node of visitedNodes) {
            nodes[node.row][node.col].isVisited = node.isVisited;
            this.setState({ nodes });
        }

    }

    render() {
        const { nodes } = this.state;

        return (
            <React.Fragment>
                <button onClick={() => this.visualizeDijkstra()}>Find Sortest Path</button>
                <div className='grid'>
                    {
                        nodes.map((row, rowIdx) => {
                            return <div key={rowIdx}>
                                {
                                    row.map((col, colIdx) => {
                                        return <Node key={colIdx} isStart={col.isStart} isFinish={col.isFinish} isVisited={col.isVisited}></Node>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}
