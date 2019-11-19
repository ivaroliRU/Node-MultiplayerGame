//set up and get canvas
const canvas = document.getElementById("game-screen");
const background = document.getElementById("background-screen");
const scale = 1;

var testImg = new Image();
testImg.src = "../assets/player1.png";

//reset height
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;//window.innerHeight;

background.style.width = canvas.width.toString()+"px";
background.style.height = canvas.height.toString()+"px";

//get the middle of the canvas
const xOffset = canvas.width/2;
const yOffset = canvas.height/2;

//get drawing context
var ctx = canvas.getContext('2d');
//var background = backgroundCanvas.getContext('2d');

//scaling for pixle game
ctx.scale(scale, scale)
//background.scale(scale, scale)

//an update function that runs every frame
export function update(players, currentPlayer){
    //ctx.font = '100 18px Arial';
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i in players){
        if(players[i].x == null || players[i].y == null){
            continue;
        }

        if(players[i].id == currentPlayer.id){
            renderImage(testImg, xOffset / scale, yOffset / scale, players[i].orientation);
            continue;
        }
        else{
            var xPos = players[i].x - currentPlayer.x + xOffset;
            var yPos = players[i].y - currentPlayer.y + yOffset;

            renderImage(testImg, xPos / scale, yPos / scale, players[i].orientation);
            continue;
        }
        
    }
}

function renderImage ( img, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);        
    ctx.rotate(angle * (Math.PI/180));
    
    ctx.drawImage(img,-img.width/2,-img.height/2);        
    ctx.restore(); 
}


//sdraw offset background in secondary canvas
/*function drawBackground(offX, offY){
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
}*/