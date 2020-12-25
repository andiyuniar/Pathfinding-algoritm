import React, { Component } from 'react';
import Node from './Node';
import './Board.css';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
    };

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for(let col = 0; col < 15; col++){
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
        this.setState({ nodes: nodes});
    }

    render() {
        const { nodes } = this.state;
        console.log(nodes)

        return (
            <div className='grid'>
                {
                    nodes.map((row, rowIdx) => {
                        return <div key={rowIdx}>
                            {
                                row.map((col, colIdx) => {
                                    return <Node></Node>
                                })
                            }
                           
                        </div>
                    })
                }
            </div>
        );
    }
}
