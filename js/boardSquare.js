export class BoardSquare {
  constructor(id, status, row, col) {
    this.id = id;
    this.row = row;
    this.col = col;
    this.status = status;
    this.distance = Infinity;
    this.neighbors = []; //stores the Ids of all neighbor nodes

    this.neighbors.push(`${row}-${col-1}`);
    this.neighbors.push(`${row}-${col+1}`);
    this.neighbors.push(`${row-1}-${col}`);
    this.neighbors.push(`${row+1}-${col}`);
  }
  setWall() {
    this.status = "wall";
    document.getElementById(this.id).classList.add("wall");
  }
  clearWall() {
    this.status = "empty";
    document.getElementById(this.id).classList.remove("wall");
  }
}
