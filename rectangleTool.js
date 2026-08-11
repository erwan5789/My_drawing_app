function RectangleTool(){
    this.icon = "assets/rectangle.jpg";
    this.name = "Rectangle";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    this.draw = function(){
        if(mouseIsPressed){
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                // save pixels so preview doesn't leave trails
                loadPixels();
            } else {
                updatePixels();
                noFill();
                rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
            }
        }

        else if(drawing){
            // finalize
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };
}
