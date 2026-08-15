function TextTool(){
    this.icon = "assets/text.jpg";
    this.name = "Text";

    // tool state
    var content = "Enter text here";
    var fontSize = 24;
    var fontColor = "#000000";
    var fontFamily = '"Didot", "Bodoni MT", "Cinzel", serif';

    // internal flags for preview/commit
    var savedBaseline = false; // whether we've saved the current pixels for preview
    var startedOnCanvas = false;
    var previouslyPressed = false;

    // draw is called every frame while this tool is selected
    this.draw = function(){
        // ensure we have a baseline pixel snapshot to restore each frame
        if(!savedBaseline){
            loadPixels();
            savedBaseline = true;
        }

        // restore the saved pixels so previews don't leave trails
        updatePixels();

        // draw a live preview at the mouse position (does not commit)
        push();
        noStroke();
        fill(fontColor);
        textFont(fontFamily);
        textSize(fontSize);
        textAlign(LEFT, TOP);
        text(content, mouseX, mouseY);
        pop();

        // track press start inside the canvas
        if(mouseIsPressed && !previouslyPressed){
            startedOnCanvas = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
        }

        // commit only on release inside the canvas after starting on the canvas
        if(!mouseIsPressed && previouslyPressed){
            if(startedOnCanvas && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
                push();
                noStroke();
                fill(fontColor);
                textFont(fontFamily);
                textSize(fontSize);
                textAlign(LEFT, TOP);
                text(content, mouseX, mouseY);
                pop();
                // save pixels including the newly placed text so future previews start from this state
                loadPixels();
            }
            startedOnCanvas = false;
        }

        previouslyPressed = mouseIsPressed;
    };

    this.unselectTool = function(){
        select('.options').html("");
        // restore the canvas to the last saved baseline before leaving the tool
        if (savedBaseline) {
            updatePixels();
        }
        // reset baseline so that when reselected it captures the latest canvas
        savedBaseline = false;
        previouslyPressed = false;
        startedOnCanvas = false;
    };

    this.populateOptions = function(){
        // populate options from the hidden template in index.html
        var templateHtml = select('#text-tool-template').html();
        select('.options').html(templateHtml);

        // set initial values (template has empty fields)
        select('#textContent').value(content);
        select('#textSize').value(fontSize);
        select('#textColor').value(fontColor);

        // wire up inputs
        select('#textContent').input(function(){ content = this.value(); });
        select('#textSize').input(function(){ var v = parseInt(this.value(), 10); if(!isNaN(v)) fontSize = v; });
        select('#textColor').input(function(){ fontColor = this.value(); });
        select('#clearText').mouseClicked(function(){ content = ""; select('#textContent').value(''); });
    };
}
