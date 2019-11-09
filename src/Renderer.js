//set up and get canvas
const canvas = document.getElementById("game-screen");
const backgroundCanvas = document.getElementById("background-screen");
const scale = 4;

var testImg = new Image();
testImg.src = "../assets/priest3_v2_4.png";

//reset height
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;//window.innerHeight;
backgroundCanvas.width = canvas.width;
backgroundCanvas.height = canvas.height;
//get the middle of the canvas
const xOffset = canvas.width/2;
const yOffset = canvas.height/2;

//get drawing context
var ctx = canvas.getContext('2d');
var background = backgroundCanvas.getContext('2d');

//scaling for pixle game
ctx.scale(4, 4)
background.scale(4, 4)

//an update function that runs every frame
export function update(players, currentPlayer){
    //ctx.font = '100 18px Arial';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground(currentPlayer.x, currentPlayer.y);

    drawBackground(xOffset);

    for(var i in players){
        if(players[i].x == null || players[i].y == null){
            continue;
        }

        if(players[i].id == currentPlayer.id){                
            //drawCircle(15, xOffset / scale, yOffset / scale, '#00FF00');
            ctx.drawImage(testImg, xOffset / scale, yOffset / scale);
            continue;
        }
        else{
            var xPos = players[i].x - currentPlayer.x + xOffset;
            var yPos = players[i].y - currentPlayer.y + yOffset;

            drawCircle(15, xPos / scale, yPos / scale, '#FF0000');
            continue;
        }
        
    }
}

export function deltaTime(){

}

//darw a cicle
function drawCircle(width, x, y, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, width, 0, 2 * Math.PI);
    ctx.fill();
}

//sdraw offset background in secondary canvas
function drawBackground(offX, offY){    
    if(offX == NaN || offY == NaN || offY == undefined){
        return;
    }

    var cols = 12, rows = 12, size = 60;

    background.clearRect(0,0,canvas.width,canvas.height);

    for(var x = 0; x < cols; x++){
        for(var y = 0; y < rows; y++){
            var xPos = ((x * size) - offX)/ scale;
            var yPos = ((y * size) - offY)/ scale;

            if(xPos >= 0 || xPos <= canvas.width + size ||
               yPos >= 0 || yPos <= canvas.height + size){                
                background.fillStyle = '#0000FF';
                
                background.fillRect(xPos, yPos, size, size);
            }
        }        
    }
}