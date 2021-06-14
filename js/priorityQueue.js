import { BoardSquare } from './boardSquare.js'

//Priority Queue based on a min heap
export class PriorityQueue {
  constructor() {
    this.contents = [];
    this.size = 0;

  }

  //Fix heap to maintain min-heap property, private method
  trickleUp(pos) {
    if(pos> 0) {
      //compare pos to its parent node, swap if > parent
      let parentPos = Math.ceil((pos-1)/2);
      if ((this.contents[pos].hueristic <= this.contents[parentPos].hueristic)) {
        [this.contents[pos], this.contents[parentPos]] = [this.contents[parentPos], this.contents[pos]];
        this.trickleUp(parentPos); //repeat on new position
      }
    }
  }

  //add item to the queue and maintain heap properties
  add(boardSquare) {
    this.size++;
    this.contents[this.size-1] = boardSquare;
    this.trickleUp(this.size-1);
  }

  //Fixes heap on removals
  trickleDown(pos) {
    if ((2*pos+1) < this.size) { //Check if node has children
      let i = null; //position of highest priority child node
      if(2*pos+2 < this.size) {  //two children
        if(this.contents[2*pos+2].hueristic <= this.contents[2*pos+1].hueristic) {
          i = 2*pos+2;
        }
        else {
          i = 2*pos+1;
        }
      }
      else { //one child
        i=2*pos+1;
      }
      if (this.contents[i].hueristic < this.contents[pos].hueristic) { //swap if value of parent is greater than child
        [this.contents[pos], this.contents[i]] = [this.contents[i], this.contents[pos]];
        this.trickleDown(i); //recurse on new location
      }
    }
  }

  //retrieves top element from queue
  peak() {
    return this.contents[0];
  }

  //retrieve and delete top element from queue
  pop() {
    let top = this.contents[0];
    [this.contents[0], this.contents[this.size-1]] = [this.contents[this.size-1], this.contents[0]];
    this.size--;
    this.trickleDown(0);
    return top;
  }

  isEmpty() {
    return (this.size==0);
  }

  //Add method for changing priority of an element if needed later
}
