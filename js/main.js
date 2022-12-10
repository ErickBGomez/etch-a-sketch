// Variables with default settings
let currentTool = "pencil";
let currentCanvasSize = 8;
let gridVisibilityState = true;

// Select nodes
const allTools = document.querySelectorAll("button.tool-button");

const canvas = document.querySelector("div#canvas");

const canvasSizeLabel = document.querySelector("span.canvas-size-label");
const canvasSizeSlider = document.querySelector("input#slider");

const showGridButton = document.querySelector("button#show-grid");
const clearCanvasButton = document.querySelector("button#clear-canvas");


// First loading settings
resetCanvas();
selectTool(currentTool);
updateCanvasSizeLabel(currentCanvasSize);


// Set Events
allTools.forEach(tool => {
    tool.addEventListener("click", selectTool);
});

canvasSizeSlider.addEventListener("onchange", () => console.log("a"));

showGridButton.addEventListener("click", toggleGridVisibility);
// Arrow function to avoid Event Parameter (e)
clearCanvasButton.addEventListener("click", () => resetCanvas());

// Functions

function resetCanvas(newCanvasSize = currentCanvasSize) {
    clearCanvas();
    setCanvasSize(newCanvasSize);
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

function updateCanvasSizeLabel(newValue) {
    currentCanvasSize = newValue;
    canvasSizeLabel.textContent = `${newValue} \u00D7 ${newValue}`;
}

function setButtonState(button, newState) {
    button.dataset.state = newState;
}

function getButtonState(button) {
    return button.dataset.state;
}