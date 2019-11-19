import {joinGame ,getPlayers, getMyPlayer, updatePosition, sendMessage} from './networking/ConnectionHandler';
import {update} from './core/Renderer';
import {getNewPosition} from './game-logic/PlayerMovement';

$('#join-modal').modal('show');

document.getElementById("sendMsg").addEventListener("click", function(event){
    var message = document.getElementById("msg").value;
    sendMessage(message);
    document.getElementById("msg").value = "";
});

document.getElementById("join-btn").addEventListener("click", function(event){
    var name = document.getElementById("name").value;
    $('#join-modal').modal('hide');
    document.getElementById("name").value = "";
    joinGame(name);
});

//for calculating delta time
var startTime = new Date();

//main function
function main(){
    var endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
    startTime = new Date();

    var players = getPlayers();
    var player = getMyPlayer();

    player = getNewPosition(player, timeDiff);

    updatePosition({x:player.x,y:player.y,orientation:player.orientation});
    update(players, player);
}

//Set the main loop
//45 fps
setInterval(main,1000/45);