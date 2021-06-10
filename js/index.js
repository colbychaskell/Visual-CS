window.addEventListener('load', init, false);

function init(){
  document.getElementById('topicBtn').onclick = showDropdown;
  document.getElementById('data').onclick = setTopicData;
  document.getElementById('graph').onclick = setTopicGraph;
  document.getElementById('trees').onclick = setTopicTrees;
  document.getElementById('wall-btn').onclick = toggleWallAdding;
  document.getElementById('move-car-btn').onclick = toggleMoveCar;

}

  //.onclick = function() {
  //   return false;
  // }

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

function setTopicData() {
  let dropDown = document.getElementById("dropMenu");
  let topicBtn = document.getElementById('topicBtn');
  let visual = document.getElementById('data-visual');
  let visualSection = document.getElementById('visuals');

  visualSection.style.display = "block";
  dropDown.style.display = "none";
  topicBtn.innerHTML = "Data Structures";
  topicBtn.style.backgroundColor = "#9D2235";
  visualSection.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

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
  visualSection.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

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
  visualSection.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

  //Fade in visual
  hideVisuals();
  fadeIn(visual);

}

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

function toggleWallAdding() {
  document.getElementById("grid").classList.toggle("addWall");
  document.getElementById("grid").classList.remove("moveCar");
  let squares = document.getElementsByTagName("td");
}

function toggleMoveCar() {
  document.getElementById("grid").classList.toggle("moveCar");
  document.getElementById("grid").classList.remove("addWall");
}
