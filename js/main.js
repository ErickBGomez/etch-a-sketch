// Default settings
const DEFAULT_TOOL = "pencil";

// Select nodes
const allTools = document.querySelectorAll("button.tool-button");

// Other variables
let currentTool = null;

// First loading settings
selectTool(DEFAULT_TOOL);

// Set Events
allTools.forEach(tool => {
    tool.addEventListener("click", selectTool);
});

// Functions
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

function setButtonState(button, newState) {
    button.dataset.state = newState;
}