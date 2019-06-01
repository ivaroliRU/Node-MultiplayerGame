//set up and get canvas
const canvas = document.getElementById("game-screen");

//reset height
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;//window.innerHeight;

//get the middle of the canvas
const xOffset = canvas.width/2;
const yOffset = canvas.height/2;

var ctx = canvas.getContext('2d');

//an update function that runs every frame
export function update(players, currentPlayer){
    //ctx.font = '100 18px Arial';
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i in players){
        if(players[i].x == null || players[i].y == null){
            continue;
        }

        if(players[i].id == currentPlayer.id){                
            drawCircle(15, xOffset, yOffset, '#00FF00');
            continue;
        }
        else{
            var xPos = players[i].x - currentPlayer.x + xOffset;
            var yPos = players[i].y - currentPlayer.y + yOffset;

            drawCircle(15, xPos, yPos, '#FF0000');
            continue;
        }
        
    }
}

//darw a cicle
function drawCircle(width, x, y, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, width, 0, 2 * Math.PI);
    ctx.fill();
}