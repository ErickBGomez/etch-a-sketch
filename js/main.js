// Variables with default settings
let currentTool = "pencil";
let mouseDownOnBody = false; // Flag that helps us to constantly paint several pixels
let currentColor = "#3BB0F2";
let currentCanvasSize = 8;
let gridVisibilityState = true;

// Select nodes
const allTools = document.querySelectorAll("button.tool-button");

const canvas = document.querySelector("div#canvas");

const canvasSizeLabel = document.querySelector("span.canvas-size-label");
const canvasSizeSlider = document.querySelector("input#slider");

const colorInput = document.querySelector("input#color-input");
const hexColorInput = document.querySelector("input#hex-color-input");

const showGridButton = document.querySelector("button#show-grid");
const clearCanvasButton = document.querySelector("button#clear-canvas");


// First loading settings
resetCanvas();
selectTool(currentTool);
updateColor(currentColor);
updateCanvasSizeLabel(currentCanvasSize);


// Set Events
allTools.forEach(tool => {
    tool.addEventListener("click", selectTool);
});

/* This event helps to detect that the user is holding the click down on any
part of the page. */
document.body.onmousedown = () => mouseDownOnBody = true;
document.body.onmouseup = () => mouseDownOnBody = false;

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
        newPixel.addEventListener("mouseover", useTool);
        newPixel.addEventListener("mousedown", useTool);

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

function useTool(e) {
    if (e.type === "mousedown" ||                      // Clicking 1 pixel
       (e.type === "mouseover" && mouseDownOnBody)) {  // Holding click down and hovering several pixels

        switch (currentTool) {
            case "pencil":
                usePencilTool(e.target);
                break;
            
            case "rainbow":
                useRainbowTool(e.target);
                break;
            
            default:
                alert("Invalid tool");
        }
    }  
}

function usePencilTool(pixel) {
    pixel.style.backgroundColor = currentColor;
}

function useRainbowTool(pixel) {
    const randomRed = getRandomInteger(256);
    const randomGreen = getRandomInteger(256);
    const randomBlue = getRandomInteger(256);

    pixel.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function getRandomInteger(maxInteger) {
    return Math.floor(Math.random() * maxInteger);
}

// Fix later: Any string can be introduced where, not just hex colors.
// Possible solution: Regex
function updateColor(newColor) {
    if (newColor.length === 7) {
        currentColor = newColor;
        colorInput.value = newColor;
        hexColorInput.value = newColor; // Later: Set hex color text to uppercase
    } else {
        alert("Invalid color");
        updateColor("#000000");
    }
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