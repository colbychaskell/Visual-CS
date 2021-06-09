window.addEventListener('load', init, false);

function init(){
  document.getElementById('topicBtn').onclick = showDropdown;
  document.getElementById('data').onclick = setTopicData;
  document.getElementById('graph').onclick = setTopicGraph;
  document.getElementById('trees').onclick = setTopicTrees;

}

function showDropdown() {
  var dropDown = document.getElementById("dropMenu");
  console.log(document.body);
  if(dropDown.style.display != "block") {
    dropDown.style.display = "block";
    dropDown.style.marginBottom = "20px";
  }
  else {
    dropDown.style.display = "none";
  }
}

function setTopicData() {
  var dropDown = document.getElementById("dropMenu");
  dropDown.style.display = "none";
  var topicBtn = document.getElementById('topicBtn');

  topicBtn.innerHTML = "Data Structures";

}

function setTopicGraph() {
  var dropDown = document.getElementById("dropMenu");
  dropDown.style.display = "none";
  var topicBtn = document.getElementById('topicBtn');

  topicBtn.innerHTML = "Graph Search Algorithms";

}

function setTopicTrees() {
  var dropDown = document.getElementById("dropMenu");
  dropDown.style.display = "none";
  var topicBtn = document.getElementById('topicBtn');

  topicBtn.innerHTML = "Trees";

}
