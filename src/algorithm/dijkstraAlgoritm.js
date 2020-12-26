
export const dijkstra = (grid, startNode, finishNode) => {
    if(!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    const visitedNodes = [];
    const unvisitedNodes = getUnvisitedNodes(grid);

    while(!!unvisitedNodes.length) {

        unvisitedNodes.sort((a,b) => a.distance - b.distance);
        //get current node
        let currentNode = unvisitedNodes.shift();
        console.log(currentNode);
        currentNode.isVisited = true;

        // update distance of neighbors node
        let neighborsNode = getNeighborNode(grid, currentNode);
        for(const neighbor of neighborsNode) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
        }
    

        // mark current node as visited
        currentNode.isVisited = true;

        //save visited node to array
        visitedNodes.push(currentNode);

        console.log(currentNode);

        if (currentNode === finishNode) {
            return visitedNodes;
        }
        
    }


}

const getNeighborNode = (grid, currentNode) => {
    const neighborsNode = [];
    const { row, col } = currentNode;
    
    //get tetangga atas
    if (row > 0) {
        neighborsNode.push(grid[row - 1][col]);
    }

    //tetangga bawah
    if (row < grid.length - 1){
        neighborsNode.push(grid[row + 1][col]);
    }

    //tetangga kiri
    if (col > 0) {
        neighborsNode.push(grid[row][col - 1]);
    }

    //tetangga kanan 
    if (col < grid[0].length - 1) {
        neighborsNode.push(grid[row][col + 1]);
    }
    neighborsNode.filter(x => !x.isVisited);
    return neighborsNode;
}

const getUnvisitedNodes = (nodes) => {
    let unvisitedNodes = [];

    for(const row of nodes){
        for(const node of row){
            unvisitedNodes.push(node);
        }
    }

    // to get start point into the first item in array
    unvisitedNodes.sort((a, b) => {
        return a.distance - b.distance
    })

    return unvisitedNodes;
}