function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the undo button
	document.getElementById('undoButton').addEventListener('click', function() {
		console.log('Undo button clicked', undoStack.length, redoStack.length);
		undo();
	});

	//event handler for the redo button
	document.getElementById('redoButton').addEventListener('click', function() {
		console.log('Redo button clicked', undoStack.length, redoStack.length);
		redo();
	});

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		clearCanvasState();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});
}
