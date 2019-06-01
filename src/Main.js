import {joinGame ,getPlayers, getMyPlayer, updatePosition, sendMessage} from './ConnectionHandler';
import {update} from './Renderer';
import {getNewPosition} from './PlayerMovement';

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

setInterval(function(){
    var players = getPlayers();
    var player = getMyPlayer();

    player = getNewPosition(player);

    updatePosition({x:player.x,y:player.y});
    update(players, player);
},1000/45);