const app = require('./server/FileServer');
const uuidv4 = require('uuid/v4');
const PORT = process.env.PORT || 3000;
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});

serv.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT + "/");
});

var Player = function(id, name){
    var self = {
        id:id,
        x:250,
        y:250,
        orientation:0,
        name:name
    };
    return self;
}

//list of players and socket info
var SOCKET_LIST={};
var PLAYER_LIST={};

io.sockets.on('connection', function(socket){
    //create id for the socket connection
    socket.id = uuidv4();
    PLAYER_LIST[socket.id] = {}
    
    //add socket to list
    SOCKET_LIST[socket.id] = socket;

    socket.on('createPlayer', function(data){
        PLAYER_LIST[socket.id] = Player(socket.id, data.name);
        socket.emit('newConnection', PLAYER_LIST[socket.id]);
    });

    //update the player's position
    socket.on('updatePlayer', function(data){
        if(PLAYER_LIST[socket.id] != {}){
            PLAYER_LIST[socket.id].x = data.x;
            PLAYER_LIST[socket.id].y = data.y;
        }
    });

    //sending and recieving a message from the server
    socket.on('SendMessage', function(data){
        if(PLAYER_LIST[socket.id].x != null && PLAYER_LIST[socket.id].y != null){
            socket.emit('GetMessage', data);
        }
    });

    socket.on('disconnect', function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
});

setInterval(function(){
    var pack = [];

    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];

        pack.push({
            x:player.x,
            y:player.y,
            id:player.id,
            name:player.name
        });
    }

    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPosition', pack);
    }
}, 1000/45);