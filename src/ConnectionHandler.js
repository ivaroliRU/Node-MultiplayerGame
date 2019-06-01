import io from 'socket.io-client';
import {reciveMessage} from './Messanger';

var allPlayers = {};
var player = {};

var socket = io();

socket.on('newPosition', function(data){
    allPlayers = data;
});

socket.on('newConnection', function(data){
    player = data;
});

socket.on('GetMessage', function(data){
    reciveMessage(data);
});

export function updatePosition(pos){
    socket.emit('updatePlayer', pos);
}

export function sendMessage(message){
    socket.emit('SendMessage', message);
}

export function getPlayers(){
    return allPlayers;
}

export function getMyPlayer(){    
    return player;
}

export function joinGame(name){    
    socket.emit('createPlayer', {name:name});
}