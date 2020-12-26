import React, { Component } from 'react';
import Node from './Node';
import { dijkstra, getShortestRoute } from '../algorithm/dijkstraAlgoritm';
import './Board.css';

const START_ROW = 10;
const START_COL = 3;
const FINISH_ROW = 23;
const FINISH_COL = 34;
const BOARD_LENGTH = 60;
const BOARD_HEIGHT = 25;

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
                    previousNode: null,
                    isRoute: false
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({ nodes: nodes});
    }

    visualizeAlgoritm() {
        const { nodes } = this.state;
        const startNode = nodes[START_ROW][START_COL];
        const finishNode = nodes[FINISH_ROW][FINISH_COL];

        const visitedNodes = dijkstra(nodes, startNode, finishNode);
        
        // visualize searching route
        for(let node of visitedNodes) {
            setTimeout(() => {
                nodes[node.row][node.col].isVisited = node.isVisited;
                this.setState({ nodes });
            }, 5000);
            
        }

        //visualize short route
        // console.log(finishNode)
        const routes = getShortestRoute(finishNode);
        for(let node of routes) {
            nodes[node.row][node.col].isRoute = node.isRoute;
            this.setState({ nodes });
        }

        //console.table(visitedNodes);
        console.log('Visualize end');
    }

    render() {
        const { nodes } = this.state;

        return (
            <React.Fragment>
                <button onClick={() => this.visualizeAlgoritm()}>Find Sortest Path</button>
                <div className='grid'>
                    {
                        nodes.map((row, rowIdx) => {
                            return <div key={rowIdx}>
                                {
                                    row.map((col, colIdx) => {
                                        return <Node key={colIdx} isStart={col.isStart} isFinish={col.isFinish} isVisited={col.isVisited} isRoute={col.isRoute}></Node>
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
