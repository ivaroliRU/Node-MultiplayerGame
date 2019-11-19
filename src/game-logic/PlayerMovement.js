const accelaration = 20;
const angularAccelaration = 5;
const maxSpeed = 1000;
const maxAngularSpeed = 250;

var velocity = 0;
var angularVelocity = 0;

var keysDown = {
    w:false,
    a:false,
    s:false,
    d:false,
    q:false,
    e:false
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
    var wantedPosition = {x:player.x,y:player.y};
    var vector = {x:0,y:0};

    if(keysDown.w == true && velocity < maxSpeed){
        velocity+=accelaration;
    }
    else{
        if(velocity > 0){
            velocity-=accelaration;
        }
        else if(velocity < 0){
            velocity = 0;
        }
    }
    if(keysDown.a == true && angularVelocity<maxAngularSpeed){
        angularVelocity+=angularAccelaration;
    }
    
    if(keysDown.d == true && angularVelocity>-maxAngularSpeed){
        angularVelocity-=angularAccelaration;
    }

    if(!keysDown.d && !keysDown.a){
        if(angularVelocity > 0){
            angularVelocity-=angularAccelaration;
        }
        else if (angularVelocity < 0){
            angularVelocity+=angularAccelaration;
        }
    }

    vector.x = Math.cos(player.orientation*(Math.PI/180) - (Math.PI/2))*velocity;
    vector.y = Math.sin(player.orientation*(Math.PI/180) - (Math.PI/2))*velocity;

    wantedPosition.x += vector.x * deltaTime;
    wantedPosition.y += vector.y * deltaTime;
    var calculatedPosition = lerp(player, wantedPosition, 0.5);
    
    //update the position with respect to delta time
    player.x = calculatedPosition.x;
    player.y = calculatedPosition.y;
    player.orientation = player.orientation + angularVelocity * deltaTime;
    
    return player;
}

function lerp(a,  b,  c) {
    return {
        x:a.x + c * (b.x - a.x),
        y:a.y + c * (b.y - a.y)
    };
}