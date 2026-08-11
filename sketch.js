//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var undoStack = [];
var redoStack = [];

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");
	noSmooth();

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new RectangleTool());
	toolbox.addTool(new TextTool());
	toolbox.addTool(new EllipseTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new MirrorDrawTool());
	background(255);
	// save initial state for undo/redo
	saveState();

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

function mouseReleased() {
	// only record state when release happens over the canvas
	if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
		markChange();
	}
}

function saveState(){
	if (canvas) {
		console.log('saveState', undoStack.length, redoStack.length);
		undoStack.push(get(0,0,width,height));
		if (undoStack.length > 20) {
			undoStack.shift();
		}
	}
}

function undo(){
	console.log('undo called', undoStack.length, redoStack.length);
	if (undoStack.length > 1) {
		redoStack.push(undoStack.pop());
		var previous = undoStack[undoStack.length - 1];
		clear();
		background(255);
		image(previous, 0, 0, width, height);
		loadPixels();
	}
}

function redo(){
	if (redoStack.length > 0) {
		var next = redoStack.pop();
		undoStack.push(next);
		clear();
		background(255);
		image(next, 0, 0, width, height);
		loadPixels();
	}
}

function markChange(){
	// call after a permanent drawing action finishes
	if (mouseIsPressed === false) {
		if (redoStack.length > 0) {
			redoStack = [];
		}
		saveState();
	}
}

function clearCanvasState(){
	background(255);
	loadPixels();
	undoStack = [];
	redoStack = [];
	saveState();
}
