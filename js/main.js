// Default settings
const DEFAULT_TOOL = "pencil";
const DEFAULT_CANVAS_SIZE = 16;
const DEFAULT_GRID_VISIBILITY = false;

// Select nodes
const allTools = document.querySelectorAll("button.tool-button");

const canvas = document.querySelector("div#canvas");

const showGridButton = document.querySelector("button#show-grid");
const clearCanvasButton = document.querySelector("button#clear-canvas");

// Other variables
let currentTool = DEFAULT_TOOL;
let currentCanvasSize = DEFAULT_CANVAS_SIZE;
let gridVisibilityState = DEFAULT_GRID_VISIBILITY;

// First loading settings
resetCanvas();
selectTool(currentTool);

console.log(canvas.childElementCount); // Test

// Set Events
allTools.forEach(tool => {
    tool.addEventListener("click", selectTool);
});

showGridButton.addEventListener("click", toggleGridVisibility);
clearCanvasButton.addEventListener("click", resetCanvas);

// Functions

function resetCanvas() {
    clearCanvas();
    setCanvasSize(currentCanvasSize); // Change to "actual canvas size"
    setGridVisibility(gridVisibilityState);
}

function setCanvasSize(newSize) {

    let newPixel = null;

    canvas.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${newSize}, 1fr)`;

    for (let i = 0; i < newSize**2; i++) {
        newPixel = document.createElement("div");
        newPixel.classList.add("pixel");

        canvas.appendChild(newPixel);
    }
}

function clearCanvas() {
    if (canvas.hasChildNodes()) {
        // Remove all pixels
        canvas.innerHTML = "";
    }
}

function selectTool(newTool) {
    // If a PointerEvent (object) is received, save only its ID string
    // Otherwise, save just the string
    const toolIdSelected = (typeof newTool === "object") ? newTool.target.id : newTool;

    allTools.forEach(tool => {
        setButtonState(tool, "unselected");

        if (tool.id === toolIdSelected) {
            setButtonState(tool, "selected");
            currentTool = toolIdSelected;
        }
    });
}

function setGridVisibility(state) {
    gridVisibilityState = state;

    if (state === true) {
        setButtonState(showGridButton, "selected");

        canvas.childNodes.forEach(pixel => pixel.classList.add("pixel-border"));
    } else {
        setButtonState(showGridButton, "unselected");

        canvas.childNodes.forEach(pixel => pixel.classList.remove("pixel-border"));
    }
}

// Function is defined just for showGridButton
function toggleGridVisibility() {
    setGridVisibility(!gridVisibilityState);
}

function setButtonState(button, newState) {
    button.dataset.state = newState;
}

function getButtonState(button) {
    return button.dataset.state;
}