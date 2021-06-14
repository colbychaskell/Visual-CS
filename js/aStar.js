import { Board } from './board.js';
import { BoardSquare } from './boardSquare.js';
import { PriorityQueue } from './priorityQueue.js';

export function aStar(board) {
  let startNode = board.start;
  let endNode = board.end

  //These use the square ids as key values
  let distanceToNode = {};
  let distanceToEnd = {};
  let visited = {};
  let parentNodes = {};

  //Nodes to animate
  let nodesToShow = [];

  //the queue stores boardsquare objects
  let pQueue = new PriorityQueue();

  let startSquare = board.getSquare(board.start);
  startSquare.distance = 0;
  startSquare.distanceToEnd = calcDist(startNode, endNode);
  startSquare.hueristic = startSquare.distanceToEnd;

  pQueue.add(startSquare);
  distanceToNode[startNode] = 0;
  distanceToEnd[startNode] = startSquare.distanceToEnd;

  while(!pQueue.isEmpty()) {
    let currNode = pQueue.pop(); //Should pop the node with lowest huerisitc + cost
    nodesToShow.push(currNode.id);
    console.log('Next Node: ' + currNode.id);

    if(currNode.id != board.end) {
      visited[currNode] = true;
      let neighbors = currNode.neighbors;

      let tempNewDist = currNode.distance + 1;

      //go through neighbors of current node
      for(let i=0; i<neighbors.length; i++) {
        let coordinates = neighbors[i].split("-");
        let r = parseInt(coordinates[0]);
        let c = parseInt(coordinates[1]);

        if(r >= 0 && r < board.height && c>=0 && c< board.width) {
          if(!board.isWall(neighbors[i])) {
            if(visited[neighbors[i]] === false) { //unvisited but seen

              if(distanceToNode[neighbors[i]] > tempNewDist) { //Check if current node is closer parent
                distanceToNode[neighbors[i]] = tempNewDist;

                parentNodes[neighbors[i]] = currNode.id;

                let childSquare = board.getSquare(neighbors[i]);
                childSquare.distance = distanceToNode[neighbors[i]];
                childSquare.hueristic = distanceToNode[neighbors[i]] + distanceToEnd[neighbors[i]];
                console.log('Neighbor: ' + neighbors[i] + 'Hueristic:' + childSquare.hueristic);
                pQueue.add(childSquare); //add to queue w/ updated hueristic value

                parentNodes[neighbors[i]] = currNode.id;
              }
            }
            else if(visited[neighbors[i]] === true) { //visited
              if(distanceToNode[neighbors[i]] > tempNewDist) {
                visited[neighbors[i]] = false;
                distanceToNode[neighbors[i]] = tempNewDist;
                parentNodes[neighbors[i]] = currNode.id;

                let childSquare = board.getSquare(neighbors[i]);
                childSquare.distance = distanceToNode[neighbors[i]];
                childSquare.hueristic = distanceToNode[neighbors[i]] + distanceToEnd[neighbors[i]];
                console.log('Neighbor: ' + neighbors[i] + 'Hueristic:' + childSquare.hueristic);
                pQueue.add(childSquare);
              }
            }
            else { //unseen node
              visited[neighbors[i]] = false;
              parentNodes[neighbors[i]] = currNode.id;
              distanceToNode[neighbors[i]] = tempNewDist;
              distanceToEnd[neighbors[i]] = calcDist(neighbors[i], endNode);

              let childSquare = board.getSquare(neighbors[i]);
              childSquare.distance = distanceToNode[neighbors[i]];
              childSquare.hueristic = distanceToNode[neighbors[i]] + distanceToEnd[neighbors[i]];
              console.log('Neighbor: ' + neighbors[i] + 'Hueristic:' + childSquare.hueristic);
              pQueue.add(childSquare);
            }
          }
          else {
            console.log('Wall at' + neighbors[i]);
          }
        }
      }
    }
    else { //Target has been popped from queue and search is done
      return [parentNodes, nodesToShow]; //returns the list of predecessors
    }
  }
  alert('A* Search failed to find target node');

}

function calcDist(squareID, endID) {
  let squareCoords = squareID.split("-");
  let squareRow = parseInt(squareCoords[0]);
  let squareCol = parseInt(squareCoords[1]);

  let endCoords = endID.split("-");
  let endRow = parseInt(endCoords[0]);
  let endCol = parseInt(endCoords[1]);

  //return Math.sqrt(Math.pow(endRow-squareRow, 2) + Math.pow(endCol-squareCol, 2));
  let rDist = Math.abs(squareRow-endRow);
  let cDist = Math.abs(squareCol - endCol);

  return rDist + cDist;
}
