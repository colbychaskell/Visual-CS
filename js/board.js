import { BoardSquare } from './boardSquare.js';

export class Board {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.start = null;
    this.end = null;
    this.algorithm = null;
    this.boardArray = [];
    this.selected = null;
    this.numNodes = height * width;
    this.createGrid();
    this.createEventListeners();
  }

  //Created the HTML to display the grid
  createGrid() {
    let tableHTML = "";
    /* Create HTML for the entire table */
    for (let r = 0; r < this.height; r++) {
      let currentRow = [];
      let currentHTMLRow = `<tr id="row ${r}">`;
      /*Create html for each row */
      for (let c = 0; c < this.width; c++) {
        let squareID = `${r}-${c}`
        let squareStatus = null;
        let newSquare = null;

        if (r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)) {
          squareStatus = "car";
          this.start = `${squareID}`;
        } else if (r === Math.floor(this.height / 2) && c === Math.floor(3 * this.width / 4)) {
          squareStatus = "house";
          this.end = `${squareID}`;
        } else {
          squareStatus = "empty";
        }

        newSquare = new BoardSquare(squareID, squareStatus, r, c);
        currentRow.push(newSquare);
        currentHTMLRow += `<td id="${squareID}" class="${squareStatus}"></td>`;
      }
      this.boardArray.push(currentRow);
      tableHTML += `${currentHTMLRow}</tr>`;
    }


    let grid = document.getElementById("grid");
    grid.innerHTML = tableHTML;
  }

  //Create Event Listeners for each square in the grid
  createEventListeners() {
    let board = this;
    for (let row = 0; row < board.height; row++) {
      for (let col = 0; col < board.width; col++) {
        let squareID = `${row}-${col}`;
        let squareElement = document.getElementById(squareID);
        let grid = document.getElementById('grid');
        if(squareElement != null) {
          //Handle mouse press on board
          squareElement.onmousedown = (e) => {
            e.preventDefault();
            if(this.selected == null) {
              //Adding and Removing Walls
              if(board.getSquare(squareID).status == "empty") {
                board.getSquare(squareID).setWall();
              }
              else if(board.getSquare(squareID).status == "wall") {
                board.getSquare(squareID).clearWall();
              }
              //Moving the start car
              if(board.getSquare(squareID).status == "car") {
                grid.classList.add('moveCar');
                this.selected = "car";
                squareElement.classList.remove('car');
                squareElement.classList.add('empty');
              }
              else if(board.getSquare(squareID).status == "house") {
                grid.classList.add('moveHouse');
                this.selected="house";
                squareElement.classList.remove('house');
                squareElement.classList.add('empty');
              }
            }
            else if(this.selected == "car") {
              this.selected = null;
              document.getElementById('grid').classList.remove('moveCar');
              this.setStart(squareID);
            }
            else if(this.selected == "house") {
              this.selected = null;
              document.getElementById('grid').classList.remove('moveHouse');
              this.setHouse(squareID);
            }
          }


        }
      }
    }
  }

  // Returns board Array element for the square id given
  getSquare(squareID) {
    let coordinates = squareID.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);
    return this.boardArray[r][c];
  }

  isWall(squareID) {
    return this.getSquare(squareID).status == 'wall';
  }

  setHouse(squareID) {
    let squareElm = document.getElementById(`${squareID}`);
    this.getSquare(squareID).status = "house";
    squareElm.classList.remove('empty');
    squareElm.classList.add('house');
  }

  //Set specified square to the start/car square
  setStart(squareID) {
    let squareElm = document.getElementById(`${squareID}`);
    this.getSquare(squareID).status = 'car';
    this.start = squareID;
    squareElm.classList.remove('empty', 'wall');
    squareElm.classList.add('car');
  }

  //Returns ids of all neighboring squares
  neighborNodes(squareID) {
    return this.getSquare(squareID).neighbors;
  }

  setVisited(squareID) {
    document.getElementById(squareID).classList.add('visited');
  }

  setPath(squareID) {
    document.getElementById(squareID).classList.add('path');
  }
  clearBoard(squareID) {
    let squares = document.getElementsByTagName('td');
    for (let i=0; i<squares.length; i++) {
      squares[i].classList.remove('path');
      squares[i].classList.remove('visited');
    }
  }

}
