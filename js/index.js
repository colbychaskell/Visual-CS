import { Board } from './board.js';
import { dijkstras } from './dijkstras.js';

window.addEventListener('load', init, true);

let newBoard = null;

//Initialize click handlers for dropdown buttons
function init(){
  document.getElementById('topicBtn').onclick = showDropdown;
  document.getElementById('data').onclick = setTopicData;
  document.getElementById('graph').onclick = setTopicGraph;
  document.getElementById('trees').onclick = setTopicTrees;
  document.getElementById('algorithm-btn').onclick = function (e) {
    setAlgorithm(e.target.innerHTML);
  }
  document.getElementById('run-btn').onclick = showPath;
}

//Shows the dropdown to select a topic
function showDropdown() {
  let dropDown = document.getElementById("dropMenu");
  let topBtn = document.getElementById('topicBtn');

  console.log(document.body);
  if(dropDown.style.display != "block") {
    dropDown.style.display = "block";
    topBtn.style.backgroundColor = "black";
  }
  else {
    dropDown.style.display = "none";
    topBtn.style.backgroundColor = "#9D2235";
  }
}

//Set the topic to data, change the button, and show the visual
function setTopicData() {
  let dropDown = document.getElementById("dropMenu");
  let topicBtn = document.getElementById('topicBtn');
  let visual = document.getElementById('data-visual');
  let visualSection = document.getElementById('visuals');

  visualSection.style.display = "block";
  dropDown.style.display = "none";
  topicBtn.innerHTML = "Data Structures";
  topicBtn.style.backgroundColor = "#9D2235";

  //Fade in visual
  hideVisuals()
  fadeIn(visual);
}

function setTopicGraph() {
  let dropDown = document.getElementById("dropMenu");
  let topicBtn = document.getElementById('topicBtn');
  let visual = document.getElementById('graph-visual');
  let visualSection = document.getElementById('visuals');

  visualSection.style.display = "block";
  dropDown.style.display = "none";
  topicBtn.innerHTML = "Graph Search Algorithms";
  topicBtn.style.backgroundColor = "#9D2235";

  //Create the board based on screen size
  let navbarHeight = document.getElementById("nav").clientHeight;
  let textHeight = document.getElementById("graph-button-bar").clientHeight + document.getElementById("graph-info-bar").clientHeight;
  let boardHeight = Math.floor((document.documentElement.clientHeight - navbarHeight - textHeight - 500) / 25);
  let boardWidth = Math.floor(document.documentElement.clientWidth / 25);
  newBoard = new Board(boardHeight, boardWidth);

  //Fade in visual
  hideVisuals();
  fadeIn(visual);

}

function setTopicTrees() {
  let dropDown = document.getElementById("dropMenu");
  let topicBtn = document.getElementById('topicBtn');
  let visual = document.getElementById('trees-visual');
  let visualSection = document.getElementById('visuals');

  visualSection.style.display = "block";
  dropDown.style.display = "none";
  topicBtn.innerHTML = "Trees";
  topicBtn.style.backgroundColor = "#9D2235";

  //Fade in visual
  hideVisuals();
  fadeIn(visual);

}

//Fade in selected element in visuals section
function fadeIn(element) {
  element.style.display = "block";
  var opacity = 0;
  let delay = 0;
  var intervalID = setInterval(function() {
      if(delay > 350) {
        if (opacity < 1) {
            opacity = opacity + 0.05;
            element.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
      }
      else {
        delay += 50;
      }
  }, 50);
}

//Hides all visuals
function hideVisuals() {
  let visuals = document.getElementsByClassName('visual')
  for(let i=0; i< visuals.length; i++) {
    visuals[i].style.opacity = "0";
    visuals[i].style.display = "none";
  }
}

//Change the selected algorithm
//Called from button, value passed based on button selected
function setAlgorithm(algoName) {
  let algoLabel = document.getElementById('algo-Name');
  algoLabel.innerHTML = algoName;
  newBoard.algorithm = algoName;
}

function showPath() {
  let preNodes = dijkstras(newBoard);
  let pathNode = preNodes[newBoard.end]; //node before end node along shortest path
  while(pathNode != newBoard.start) {
    document.getElementById(pathNode).style.backgroundColor = "green";
    pathNode = preNodes[pathNode];
  }
}
