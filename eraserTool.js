function EraserTool(){
    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    var previousMouseX = -1;
    var previousMouseY = -1;
    var eraserSize = 10;

    this.draw = function(){
        if(mouseIsPressed){
            if(previousMouseX == -1){
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                push();
                stroke(255);
                strokeWeight(eraserSize);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                pop();
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        else{
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    this.unselectTool = function(){
        select('.options').html('');
        previousMouseX = -1;
        previousMouseY = -1;
    };

    this.populateOptions = function(){
        select('.options').html("<label>Eraser size</label><input id='eraserSize' type='range' min='1' max='100' value='"+eraserSize+"'>");
        select('#eraserSize').input(function(){
            eraserSize = select('#eraserSize').value();
        });
    };
}
