import { Board } from './board.js';
import { BoardSquare } from './boardSquare.js';
import { PriorityQueue } from './priorityQueue.js';
/*
* TODO:
* - Add Checking for Walls
* - Add weighted squares
*
*
*/
export function dijkstras(board) {
  let startNodeID = board.start;
  console.log(board.start);

  //These use the square ids as key values
  let distanceToNode = {};
  let visited = {};
  let nodeBefore = {};

  //the queue stores boardsquare objects
  let pQueue = new PriorityQueue();

  visited[startNodeID] = true;
  distanceToNode[startNodeID] = 0;
  let startSquare = board.getSquare(board.start);
  console.log(startSquare);
  startSquare.distance = 0;
  pQueue.add(startSquare);

  console.log('target: ');
  console.log(board.end);
  while(!pQueue.isEmpty()) {
    let currNode = pQueue.pop();
    if(currNode.id != board.end) {
      let neighbors = currNode.neighbors;
      for (let i=0; i< neighbors.length; i++) {
        let coordinates = neighbors[i].split("-");
        let r = parseInt(coordinates[0]);
        let c = parseInt(coordinates[1]);
        //ignore neighbors outside
        if(r > 0 && r < board.height && c>0 && c< board.width) {
          console.log(neighbors[i])
          if((visited[neighbors[i]] != true) || ((distanceToNode[currNode.id]+1) < distanceToNode[neighbors[i]])) { //Node is unexplored or edge is a shorter path
            distanceToNode[neighbors[i]] = distanceToNode[currNode.id] + 1;
            nodeBefore[neighbors[i]] = currNode.id;

            if(visited[neighbors[i]] != true) {
              visited[neighbors[i]] = true;
              let childSquare = board.getSquare(neighbors[i])
              childSquare.distance = distanceToNode[neighbors[i]]
              pQueue.add(childSquare);
            }
            else {
              let childSquare = board.getSquare(neighbors[i])
              childSquare.distance = distanceToNode[neighbors[i]]
              pQueue.add(childSquare);
            }
          }
        }
      }
    }
    else { //Target has been popped from queue and search is done
      return nodeBefore; //returns the list of predecessors
    }
  }
  console.log('Dijkstras failed to find target node');

}
