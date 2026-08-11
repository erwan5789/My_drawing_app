function EllipseTool(){
    this.icon = "assets/ellipse.jpg";
    this.name = "Ellipse";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    this.draw = function(){
        if(mouseIsPressed){
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                //save the current pixel array so we can preview without
                //leaving trails
                loadPixels();
            } else {
                //restore the saved pixels to clear previous preview
                updatePixels();
                noFill();
                //calculate radius as distance from start to current
                var diametreX = abs(mouseX - startMouseX) * 2;
                var diametreY = abs(mouseY - startMouseY) * 2;
				ellipse(startMouseX, startMouseY, diametreX, diametreY);
            }
        }

        else if(drawing){
            //finalize drawing by saving the pixels and resetting state
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };
}
