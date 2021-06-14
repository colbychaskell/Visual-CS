import { Board } from './board.js';
import { BoardSquare } from './boardSquare.js';
import { PriorityQueue } from './priorityQueue.js';
/*
* TODO:
*
* - Add weighted squares
*
*
*/
export function dijkstras(board) {
  let startNodeID = board.start;

  //These use the square ids as key values
  let distanceToNode = {};
  let visited = {};
  let nodeBefore = {};

  //Nodes to animate
  let nodesToShow = [];

  //the queue stores boardsquare objects
  let pQueue = new PriorityQueue();

  visited[startNodeID] = true;
  distanceToNode[startNodeID] = 0;
  let startSquare = board.getSquare(board.start);
  startSquare.hueristic = 0; //In dijkstras, hueristic is distance to node (cost)
  pQueue.add(startSquare);

  while(!pQueue.isEmpty()) {
    let currNode = pQueue.pop();
    nodesToShow.push(currNode.id);

    if(currNode.id != board.end) {
      let neighbors = currNode.neighbors;
      for (let i=0; i< neighbors.length; i++) {
        let coordinates = neighbors[i].split("-");
        let r = parseInt(coordinates[0]);
        let c = parseInt(coordinates[1]);

        if(r >= 0 && r < board.height && c>=0 && c< board.width) { //ignore neighbors outside board limits

          if(!board.isWall(neighbors[i]) && ((visited[neighbors[i]] != true) || ((distanceToNode[currNode.id]+1) < distanceToNode[neighbors[i]]))) { //Node is unexplored or edge is a shorter path
            distanceToNode[neighbors[i]] = distanceToNode[currNode.id] + 1;
            nodeBefore[neighbors[i]] = currNode.id;

            if(visited[neighbors[i]] != true) {
              visited[neighbors[i]] = true;
              let childSquare = board.getSquare(neighbors[i]);
              childSquare.hueristic = distanceToNode[neighbors[i]];
              pQueue.add(childSquare);
            }
            else {
              let childSquare = board.getSquare(neighbors[i]);
              childSquare.hueristic = distanceToNode[neighbors[i]];
              pQueue.add(childSquare);
            }
          }
        }
      }
    }
    else { //Target has been popped from queue and search is done
      return [nodeBefore, nodesToShow]; //returns the list of predecessors
    }
  }
  console.log('Dijkstras failed to find target node');

}
