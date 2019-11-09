var playerSpeed = 1000;

var keysDown = {
    w:false,
    a:false,
    s:false,
    d:false
}

document.onkeydown = function(event){
    switch(event.keyCode){
        case 87:
            keysDown.w = true;
        break;
        case 68:
            keysDown.a = true;
        break;
        case 83:
            keysDown.s = true;
        break;
        case 65:
            keysDown.d = true;
        break;
    }
}

document.onkeyup = function(event){
    switch(event.keyCode){
        case 87:
            keysDown.w = false;
        break;
        case 68:
            keysDown.a = false;
        break;
        case 83:
            keysDown.s = false;
        break;
        case 65:
            keysDown.d = false;
        break;
    }
}

export function getNewPosition(player, deltaTime){    
    var wantedPosition = {x:0,y:0};
    var normFactor = 0;

    if(keysDown.w == true){wantedPosition.y-=playerSpeed * deltaTime;normFactor++;}
    if(keysDown.a == true){wantedPosition.x+=playerSpeed * deltaTime;normFactor++;}
    if(keysDown.s == true){wantedPosition.y+=playerSpeed * deltaTime;normFactor++;}
    if(keysDown.d == true){wantedPosition.x-=playerSpeed * deltaTime;normFactor++;}

    if(normFactor > 0){
        wantedPosition.x = wantedPosition.x/normFactor + player.x;
        wantedPosition.y = wantedPosition.y/normFactor + player.y;
    }
    else{
        wantedPosition.x = player.x;
        wantedPosition.y = player.y;
    }

    var calculatedPosition = lerp(player, wantedPosition, 0.5);
    
    //update the position with respect to delta time
    player.x = calculatedPosition.x;
    player.y = calculatedPosition.y;
    

    return player;
}

function lerp(a,  b,  c) {
    return {
        x:a.x + c * (b.x - a.x),
        y:a.y + c * (b.y - a.y)
    };
}