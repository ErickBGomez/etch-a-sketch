// Default settings
const DEFAULT_TOOL = "pencil";
const DEFAULT_SIZE = 16;

// Select nodes
const allTools = document.querySelectorAll("button.tool-button");

const canvas = document.querySelector("div#canvas");

const showGridButton = document.querySelector("button#show-grid");

// Other variables
let currentTool = null;

// First loading settings
setCanvasSize(DEFAULT_SIZE);
selectTool(DEFAULT_TOOL);
setButtonState(showGridButton, "unselected");

console.log(canvas.childElementCount); // Test

// Set Events
allTools.forEach(tool => {
    tool.addEventListener("click", selectTool);
});

showGridButton.addEventListener("click", toggleGridVisibility);

// Functions

function setCanvasSize(newSize) {
    clearCanvas();

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

function toggleGridVisibility(e) {
    if (getButtonState(e.target) === "unselected"){
        setButtonState(e.target, "selected");

        canvas.childNodes.forEach(pixel => pixel.classList.add("pixel-border"));
    } else {
        setButtonState(e.target, "unselected");

        canvas.childNodes.forEach(pixel => pixel.classList.remove("pixel-border"));
    }
}

function setButtonState(button, newState) {
    button.dataset.state = newState;
}

function getButtonState(button) {
    return button.dataset.state;
}