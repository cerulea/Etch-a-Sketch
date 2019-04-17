let ROWS = COLUMNS = 7;
let MAIN_CONTAINER_DIMENSIONS = 500; // width and height of main container box, in px

const container = document.querySelector("#main-container");
setContainerDimensions(container);

newSketchButton = document.querySelector('#new-sketch-button');
newSketchButton.addEventListener('click', onNewSketchButtonClick);

sketchModeCheckbox = document.getElementById('sketch-mode-checkbox');

coloringStyleSelection = document.getElementById('coloring-style-selection');

generateGrid();

function setContainerDimensions(container) {
    container.style.width = container.style.height = MAIN_CONTAINER_DIMENSIONS.toString() + "px";
}

function generateGrid() {

    // set grid square's dimension based on MAIN_CONTAINER_DIMENSIONS
    const gridSquareDimensions = MAIN_CONTAINER_DIMENSIONS / ROWS;

    for (let r = 1; r <= ROWS; ++r) {
        for (let c = 1; c <= COLUMNS; ++c) {
    
            let gridSquare = document.createElement("div");

            gridSquare.style.width
                = gridSquare.style.height
                = gridSquareDimensions.toString() + "px";
    
            if (c === 1) {
                gridSquare.classList.add('clear-left');
            }
    
            gridSquare.classList.add('grid-square');
            gridSquare.addEventListener('mouseover', changeColor);
    
            container.appendChild(gridSquare);
        }
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function getNormalColor() {
    return 'rgb(73, 67, 183)';
}

function darkenSquare(target) {
    console.log(target.style.opacity);

    let opacity = +target.style.opacity;
    opacity += 0.1;
    if (opacity > 1) opacity = 1;
    target.style.opacity = opacity;
    
    console.log(target.style.opacity);
}

function changeColor(e) {

    if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "normal") {
        e.target.style.backgroundColor = getNormalColor();
        e.target.style.opacity = "";
    }
    else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "random-colors") {
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.opacity = "";
    }
    else if (sketchModeCheckbox.checked && coloringStyleSelection.value === "normal") {

        e.target.style.backgroundColor = getNormalColor();

        if (+e.target.style.opacity < 0.01) // opacity = 0 or opacity is the empty string
            e.target.style.opacity = "0.05";
        else
            darkenSquare(e.target);
    }
    else { // sketchModeCheckbox.checked && coloringStyleSelection.value === "random-colors"
        if (+e.target.style.opacity < 0.01
            || e.target.style.backgroundColor === getNormalColor()) {

            e.target.style.backgroundColor = getRandomColor();
            e.target.style.opacity = "0.05";

        }
        else {
            darkenSquare(e.target);
        }
    }
}

function getUserInputForDimensions() {
    while (true) {
        let userInput = +prompt("Enter dimensions of grid (1 - 100):");

        if (userInput !== NaN
            && userInput !== undefined
            && userInput >= 1
            && userInput <= 100
            && Math.floor(userInput) === userInput) {
                return userInput;
            }
        else {
            alert("Invalid input; enter an integer number in the range [1, 100].");
        }
    }
}

function deleteGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    for (let i = 0; i < gridSquares.length; ++i) {
        gridSquares[i].parentNode.removeChild(gridSquares[i]);
    }
}

function onNewSketchButtonClick() {
    ROWS = COLUMNS = getUserInputForDimensions();
    deleteGrid();
    generateGrid();
}
