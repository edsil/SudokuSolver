"use strict";
// Settings
const cellSize = 40;
const cellDist = 5;
const groupsDist = 5;
const gridTop = 10;
const gridLeft = 10;

// Dom Elements
var grid, numbers, commands;

// Other global variables
var selectedNumber = 1;
var cells = [];
var sol = [];
var puzzle1 = [[-1, -1, 5, 4, -1, -1, -1, 6, 9],
[4, -1, -1, -1, 7, -1, -1, -1, 3],
[-1, 9, -1, 5, -1, 8, 4, -1, -1],
[-1, -1, 1, 6, -1, -1, 3, 9, -1],
[6, -1, -1, -1, 5, -1, -1, -1, 8],
[-1, 4, 8, -1, -1, 7, 6, -1, -1],
[-1, -1, 4, 3, -1, 2, -1, 1, -1],
[1, -1, -1, -1, 4, -1, -1, -1, 5],
[2, 3, -1, -1, -1, 5, 9, -1, -1]];
var puzzle2 = [[-1, 7, 3, 9, -1, -1, -1, 8, -1],
[-1, -1, -1, -1, 5, -1, 1, -1, 6],
[-1, 4, 5, -1, 3, 8, -1, -1, -1],
[-1, -1, -1, 3, -1, 5, -1, 4, -1],
[3, -1, -1, -1, -1, -1, -1, -1, 5],
[-1, 5, -1, 6, -1, 9, -1, -1, -1],
[-1, -1, -1, 2, 9, -1, 4, 1, -1],
[2, -1, 9, -1, 6, -1, -1, -1, -1],
[-1, 3, -1, -1, -1, 7, 6, 2, -1]];

var puzzles = [[[-1, -1, 5, 4, -1, -1, -1, 6, 9],
[4, -1, -1, -1, 7, -1, -1, -1, 3],
[-1, 9, -1, 5, -1, 8, 4, -1, -1],
[-1, -1, 1, 6, -1, -1, 3, 9, -1],
[6, -1, -1, -1, 5, -1, -1, -1, 8],
[-1, 4, 8, -1, -1, 7, 6, -1, -1],
[-1, -1, 4, 3, -1, 2, -1, 1, -1],
[1, -1, -1, -1, 4, -1, -1, -1, 5],
[2, 3, -1, -1, -1, 5, 9, -1, -1]], [[-1, 7, 3, 9, -1, -1, -1, 8, -1],
[-1, -1, -1, -1, 5, -1, 1, -1, 6],
[-1, 4, 5, -1, 3, 8, -1, -1, -1],
[-1, -1, -1, 3, -1, 5, -1, 4, -1],
[3, -1, -1, -1, -1, -1, -1, -1, 5],
[-1, 5, -1, 6, -1, 9, -1, -1, -1],
[-1, -1, -1, 2, 9, -1, 4, 1, -1],
[2, -1, 9, -1, 6, -1, -1, -1, -1],
[-1, 3, -1, -1, -1, 7, 6, 2, -1]],
[[-1, -1, 5, -1, 6, 8, 7, -1, -1],
[4, -1, -1, -1, -1, 9, -1, 6, 5],
[8, 7, -1, -1, -1, 5, -1, -1, 3],
[-1, 6, 9, 1, -1, -1, -1, -1, -1],
[-1, 8, -1, -1, 5, -1, -1, 2, -1],
[-1, -1, -1, -1, -1, 2, 1, 8, -1],
[6, -1, -1, 8, -1, -1, -1, 9, 7],
[1, 2, -1, 9, -1, -1, -1, -1, 8],
[-1, -1, 8, 5, 2, -1, 6, -1, -1]]];

window.onload = function () {
    grid = document.getElementById("grid");
    numbers = document.getElementById("numbers");
    commands = document.getElementById("commands");
    createNumbers();
    createGrid();
    fillCells();
    createSolveButton();
    createLoadPuzzles();
    document.addEventListener("keydown", keyPress);
    displayCellArray();
};

function fillCells() {
    if (cells.length == 0) {
        for (let i = 0; i < 9; i++) {
            cells.push([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
        }
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

function createSolveButton() {
    var solveBtn = document.createElement("button");
    solveBtn.style.top = (gridTop + (cellSize + cellDist) * 9 + groupsDist * 3) + "px";
    solveBtn.style.left = (gridLeft) + "px";
    solveBtn.style.width = ((cellSize + cellDist) * 3) + "px";
    solveBtn.innerText = "Solve";
    solveBtn.onclick = solveAndDisplay;
    solveBtn.classList.add("solveBtn");
    commands.appendChild(solveBtn);
}

function createLoadPuzzles() {
    var selection = document.createElement("select");
    selection.id = "selection";
    selection.onchange = loadPuzzle;
    selection.style.top = (gridTop + (cellSize + cellDist) * 9 + groupsDist * 3) + "px";
    selection.style.left = ((cellSize + cellDist) * 3 + groupsDist * 3) + "px";
    selection.style.width = ((cellSize + cellDist) * 4 + groupsDist * 3) + "px";
    selection.classList.add("loadBtn");
    var option = document.createElement("option");
    option.value = -1;
    option.innerText = "Select Puzzle";
    selection.appendChild(option);
    for (var i = 0; i < puzzles.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = "Puzzle " + (i + 1);
        selection.appendChild(option);
    }
    var option = document.createElement("option");
    option.value = -2;
    option.innerText = "Clear Puzzle";
    selection.appendChild(option);
    commands.appendChild(selection);
}

function loadPuzzle() {
    var index = document.getElementById("selection").value;
    if (index == -1) return;
    if (index == -2) {
        cells = [];
        fillCells();
        displayCellArray();
        return;
    }
    cells = [];
    puzzles[index].forEach(c => cells.push([...c]));
    displayCellArray();
}

function createNumbers() {
    for (var n = -1; n <= 9; n++) {
        if (n == 0) continue;
        var numb = document.createElement("div");
        numb.id = "n" + n;
        numb.classList.add("number");
        if (n == selectedNumber) numb.classList.add("number-selected");
        numb.style.left = gridLeft + "px";
        numb.style.top = gridTop + Math.floor((n + 1) * (cellSize + groupsDist) * 0.9 * 0.9) + "px";
        numb.style.width = Math.floor((cellSize - cellDist) * 0.9) + "px";
        numb.style.height = Math.floor((cellSize - cellDist) * 0.9) + "px";
        numb.innerText = n >= 0 ? n : "cl";
        numb.onclick = selectNumber;
        numbers.appendChild(numb);
    }
}

function selectNumber(e) {
    var previous = document.getElementById("n" + selectedNumber);
    previous.classList.remove("number-selected");
    e.target.classList.add("number-selected");
    if (e.target.innerText == "cl") {
        selectedNumber = -1;
    } else selectedNumber = e.target.innerText;

}

function keyPress(e) {
    var key = e.keyCode == 32 ? -1 : e.keyCode - 48;
    if (key >= 1 && key <= 9) {
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
    //console.log(id);
    //console.log("Col: " + col + "; Row: " + row);
    //console.log(cells);
}

function displayCellArray() {
    for (var c = 0; c < 9; c++) {
        for (var r = 0; r < 9; r++) {
            var cid = "c" + c + "r" + r;
            var cell = document.getElementById(cid);
            cell.classList.remove("cellSolver");
            if (cells[r][c] == -1) {
                cell.innerText = "";
                cell.classList.remove("cell-filled");
            } else {
                cell.innerText = cells[r][c];
                cell.classList.add("cell-filled");

            }
        }
    }
}

function displaySolArray(s) {
    for (var c = 0; c < 9; c++) {
        for (var r = 0; r < 9; r++) {
            var cid = "c" + c + "r" + r;
            var cell = document.getElementById(cid);
            var txt = [...s[r][c]].join(" ");
            cell.innerText = txt;
            if (s[r][c].size == 1) {
                cell.classList.remove("cellSolver");
                cell.classList.add("cell-filled");
            } else {
                cell.classList.remove("cell-filled");
                cell.classList.add("cellSolver");
            }
        }
    }
}

function solveAndDisplay() {
    solver(cells);
    displayCellArray()
}

function showSol(s) {
    console.log("-----");
    console.log("-----");
    for (var r = 0; r < 9; r++) {
        var line = "";
        for (var c = 0; c < 9; c++) {
            var ce = [...s[r][c]].sort().join(".");
            ce = ce.padEnd(17, "_");
            line += ce;
        }
        console.log(line);
    }
}


function solver(a) {
    sol = [];
    var run = 0;
    function solve(a) {
        init(a);
        var changed = true;
        while (changed) {
            run++;
            // console.log("Run: " + run);
            // console.log("__________________________");
            changed = false;
            for (var i = 0; i < 9; i++) {
                changed = horizon(a, i) || changed;
                changed = vertica(a, i) || changed;
                changed = gridGroup(a, i) || changed;
                changed = oneInRow(a, i) || changed;

                changed = oneInCol(a, i) || changed;
                changed = twoInBedHor(a, i) || changed;
                changed = twoInBedVer(a, i) || changed;
                changed = twoInBedGrid(a, i) || changed;
                // showSol(sol);
                // console.log("Run: " + run + "; i: " + i);
            }
            displayCellArray();
            displaySolArray(sol);
        }
    }

    function init(a) {
        for (var r = 0; r < 9; r++) {
            var row = [];
            for (var c = 0; c < 9; c++) {
                var cell = new Set();
                if (a[r][c] > 0) {
                    cell.add(a[r][c]);
                } else {
                    for (var i = 1; i < 10; i++) cell.add(i);
                }
                row.push(cell);
            }
            sol.push(row);
        }
    }

    function horizon(a, row) {
        var rerun = false;
        var changed = false;
        for (var i = 0; i < 9; i++) {
            if (sol[row][i].size == 1) {
                for (var j = 0; j < 9; j++) {
                    if (j !== i && sol[row][j].has([...sol[row][i]][0])) {
                        sol[row][j].delete([...sol[row][i]][0]);
                        changed = true;
                        if (sol[row][j].size == 1) {
                            rerun = true;
                            a[row][j] = [...sol[row][j]][0];
                        }
                    }
                }
            }
        }
        if (rerun) return horizon(a, row) || changed;
        return changed;
    }

    function oneInRow(a, row) {
        var changed = false;
        for (var i = 1; i < 10; i++) {
            var pos = -1;
            for (var j = 0; j < 9; j++) {
                if (sol[row][j].has(i)) {
                    if (sol[row][j].size == 1 || pos !== -1) {
                        pos = 10;
                        break;
                    }
                    pos = j;
                }
            }
            if (pos >= 0 && pos <= 9) {
                a[row][pos] = i;
                sol[row][pos].clear();
                sol[row][pos].add(i);
                changed = true;
            };
        }
        return changed;
    }

    function oneInCol(a, col) {
        var changed = false;
        for (var i = 1; i < 10; i++) {
            var pos = -1;
            for (var j = 0; j < 9; j++) {
                if (sol[j][col].has(i)) {
                    if (sol[j][col].size == 1 || pos !== -1) {
                        pos = 10;
                        break;
                    }
                    pos = j;
                }
            }
            if (pos >= 0 && pos <= 9) {
                a[pos][col] = i;
                sol[pos][col].clear();
                sol[pos][col].add(i);
                changed = true;
            };
        }
        return changed;
    }

    function vertica(a, col) {
        var rerun = false;
        var changed = false;
        for (var i = 0; i < 9; i++) {
            if (sol[i][col].size == 1) {
                for (var j = 0; j < 9; j++) {
                    if (j !== i && sol[j][col].has([...sol[i][col]][0])) {
                        sol[j][col].delete([...sol[i][col]][0]);
                        changed = true;
                        if (sol[j][col].size == 1) {
                            rerun = true;
                            a[j][col] = [...sol[j][col]][0];
                        }
                    }
                }
            }
        }
        if (rerun) return horizon(a, col) || changed;
        return changed;
    }

    function gridGroup(a, gg) {
        var rerun = false;
        var changed = false;
        var stRow = (Math.floor(gg / 3)) * 3;
        var stCol = (gg % 3) * 3;
        for (var r = stRow; r < stRow + 3; r++) {
            for (var c = stCol; c < stCol + 3; c++) {
                if (sol[r][c].size == 1) {
                    for (var r2 = stRow; r2 < stRow + 3; r2++) {
                        for (var c2 = stCol; c2 < stCol + 3; c2++) {
                            if ((r !== r2 || c !== c2) && sol[r2][c2].has([...sol[r][c]][0])) {
                                changed = true;
                                sol[r2][c2].delete([...sol[r][c]][0]);
                                if (sol[r2][c2].size == 1) {
                                    rerun = true;
                                    a[r2][c2] = [...sol[r2][c2]][0];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (rerun) return gridGroup(a, gg) || changed;;
        return changed;
    }

    function twoInBedGrid(a, gg) {
        var rerun = false;
        var changed = false;
        var stRow = (Math.floor(gg / 3)) * 3;
        var stCol = (gg % 3) * 3;
        for (var r = stRow; r < stRow + 3; r++) {
            for (var c = stCol; c < stCol + 3; c++) {
                if (sol[r][c].size == 2) {
                    for (var r2 = stRow; r2 < stRow + 3; r2++) {
                        for (var c2 = stCol; c2 < stCol + 3; c2++) {
                            if ((r !== r2 || c !== c2) && sol[r2][c2].size == 2 && difference(sol[r][c], sol[r2][c2]).size == 0) {
                                for (var r3 = stRow; r3 < stRow + 3; r3++) {
                                    for (var c3 = stCol; c3 < stCol + 3; c3++) {
                                        if ((r3 !== r || c3 !== c) && (r3 !== r2 || c3 !== c2) && (sol[r3][c3].has([...sol[r][c]][0]) || sol[r3][c3].has([...sol[r][c]][1]))) {
                                            changed = true;
                                            sol[r3][c3].delete([...sol[r][c]][0]);
                                            sol[r3][c3].delete([...sol[r][c]][1]);
                                            if (sol[r3][c3].size == 1) {
                                                rerun = true;
                                                a[r3][c3] = [...sol[r3][c3]][0];
                                            }

                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (rerun) return twoInBedGrid(a, gg) || changed;
        return changed;
    }

    function twoInBedHor(a, row) {
        var rerun = false;
        var changed = false;
        for (var i = 0; i < 9; i++) {
            if (sol[row][i].size == 2) {
                for (var j = 0; j < 9; j++) {
                    if (j !== i && sol[row][j].size == 2 && difference(sol[row][i], sol[row][j]).size == 0) {
                        for (var m = 0; m < 9; m++) {
                            if (m !== i && m !== j && (sol[row][m].has([...sol[row][i]][0]) || sol[row][m].has([...sol[row][i]][1]))) {
                                changed = true;
                                sol[row][m].delete([...sol[row][i]][0]);
                                sol[row][m].delete([...sol[row][i]][1]);
                                if (sol[row][m].size == 1) {
                                    rerun = true;
                                    a[row][m] = [...sol[row][m]][0];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (rerun) return twoInBedHor(a, row) || changed;;
        return changed;
    }

    function twoInBedVer(a, col) {
        var rerun = false;
        var changed = false;
        for (var i = 0; i < 9; i++) {
            if (sol[i][col].size == 2) {
                for (var j = 0; j < 9; j++) {
                    if (j !== i && sol[j][col].size == 2 && difference(sol[i][col], sol[j][col]).size == 0) {
                        for (var m = 0; m < 9; m++) {
                            if (m !== i && m !== j && (sol[m][col].has([...sol[i][col]][0]) || sol[m][col].has([...sol[i][col]][1]))) {
                                changed = true;
                                sol[m][col].delete([...sol[i][col]][0]);
                                sol[m][col].delete([...sol[i][col]][1]);
                                if (sol[m][col].size == 1) {
                                    rerun = true;
                                    a[m][col] = [...sol[m][col]][0];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (rerun) return twoInBedVer(a, col) || changed;
        return changed;
    }


    function difference(setA, setB) {
        const _difference = new Set(setA);
        for (const elem of setB) {
            _difference.delete(elem);
        }
        return _difference;
    }

    solve(a);

    return a;
}
