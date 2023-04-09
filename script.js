"use strict";
// Settings
const cellSize = 40;
const cellDist = 5;
const groupsDist = 5;
const gridTop = 10;
const gridLeft = 10;

// Dom Elements
var grid, numbers;

// Other global variables
var selectedNumber = 0;
const cells = [];

window.onload = function () {
  grid = document.getElementById("grid");
  numbers = document.getElementById("numbers");
  createNumbers();
  createGrid();
  fillCells();
  document.addEventListener("keydown", keyPress);
};

function fillCells() {
  for (let i = 0; i < 9; i++) {
    cells.push([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  }
}

function createGrid() {
  for (var gc = 0; gc < 3; gc++) {
    for (var gr = 0; gr < 3; gr++) {
      var group = document.createElement("div");
      group.id = "gc" + gc + "gr" + gr;
      group.classList.add("group");
      group.style.left = gridLeft + cellSize + gc * ((cellSize + groupsDist) * 3) + "px";
      group.style.top = gridTop + gr * ((cellSize + groupsDist) * 3) + "px";
      group.style.width = cellSize * 3 + "px";
      group.style.height = cellSize * 3 + "px";
      for (var c = 0; c < 3; c++) {
        for (var r = 0; r < 3; r++) {
          var cell = document.createElement("div");
          cell.id = "c" + (gc * 3 + c) + "r" + (gr * 3 + r);
          cell.classList.add("cell");
          cell.style.left = c * cellSize + "px";
          cell.style.top = r * cellSize + "px";
          cell.style.width = cellSize - cellDist + "px";
          cell.style.height = cellSize - cellDist + "px";
          cell.onclick = clickCell;
          group.appendChild(cell);
        }
      }
      grid.appendChild(group);
    }
  }
}

function createNumbers() {
  for (var n = -1; n <= 9; n++) {
    var numb = document.createElement("div");
    numb.id = "n" + n;
    numb.classList.add("number");
    if (n == selectedNumber) numb.classList.add("number-selected");
    numb.style.left = gridLeft + "px";
    numb.style.top = gridTop + (n + 1) * (cellSize + groupsDist) + "px";
    numb.style.width = cellSize - cellDist + "px";
    numb.style.height = cellSize - cellDist + "px";
    numb.innerText = n >= 0 ? n : "cl";
    numb.onclick = selectNumber;
    numbers.appendChild(numb);
  }
}

function selectNumber(e) {
  var previous = document.getElementById("n" + selectedNumber);
  previous.classList.remove("number-selected");
  e.target.classList.add("number-selected");
  selectedNumber = e.target.innerText;
}

function keyPress(e) {
  var key = e.keyCode == 32 ? -1 : e.keyCode - 48;
  if (key >= -1 && key <= 9) {
    var previous = document.getElementById("n" + selectedNumber);
    previous.classList.remove("number-selected");
    var newSelected = document.getElementById("n" + key);
    newSelected.classList.add("number-selected");
    selectedNumber = key;
  }
}

function clickCell(e) {
  var cell = e.target;
  if (selectedNumber == -1) {
    cell.innerText = "";
    cell.classList.remove("cell-filled");
  } else {
    cell.innerText = selectedNumber;
    cell.classList.add("cell-filled");
  }
  const id = e.target.id;
  var col = parseInt(id.substring(1, id.indexOf("r")));
  var row = parseInt(id.substring(id.indexOf("r") + 1, id.length));
  cells[row][col] = parseInt(selectedNumber);
  console.log(id);
  console.log("Col: " + col + "; Row: " + row);
  console.log(cells);
}
