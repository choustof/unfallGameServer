var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');

// Chargement de socket.io
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;

// Chargement de fs
var fs = require("fs");

// Chargement des routes
var User = require('./routes/user')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//test connexion to database
var connection = require('./Database/database_model');

connection.getConnection(function(err, connection) {
    if (err) {
        throw err;
    } else {
        console.log('connected to the database')
    }
});




// utilisation des routes
app.use('/user', User);

//premiere route
app.get('/', function(req, res) {
    res.send('Unfall REST API');
    console.log("Unfall REST API")
});


app.get('/listScores', function(req, res) {
    fs.readFile(__dirname + "/" + "scores.json", 'utf8', function(err, data) {
        console.log(data);
        console.log(data.length);
        res.send(data);
    });
})

var clients = [];

io.sockets.on('connection', function(socket, pseudo) {


    console.log('socket connected: ' + socket.id);



    var currentPlayer = {};

	currentPlayer.pseudo = 'unknown';

	socket.on('player connect', function() {
		console.log(currentPlayer.pseudo+'  player connect');
		for(var i =0; i<clients.length;i++) {
			var playerConnected = {
				pseudo:clients[i].pseudo,
				position:clients[i].position,
				rotation:clients[i].position,
				health:clients[i].health
			};
			// in your current game, we need to tell you about the other players.
			socket.emit('other player connected', playerConnected);
			console.log(currentPlayer.pseudo+'  other players connected: '+JSON.stringify(playerConnected.pseudo));
		}
	});

	socket.on('play', function(data) {
		
		
		// we always will send the enemies when the player joins
		currentPlayer = {
			pseudo:  data.pseudo,
			position: data.position,
			rotation: data.rotation,
			score: data.score,
            socketId:socket.id
		};
		clients.push(currentPlayer);
        console.log(currentPlayer.pseudo+'  play: '+JSON.stringify(data));
		// in your current game, tell you that you have joined
		
		//socket.emit('play', currentPlayer);
		// in your current game, we need to tell the other players about you.
		console.log(' tell other players connected that : '+currentPlayer.pseudo+' is connected');
		socket.broadcast.emit('other player connected', currentPlayer);
	});



    socket.on('player move', function(data) {
        console.log(' move: '+currentPlayer.pseudo);
        currentPlayer.position = data.position;
        socket.broadcast.emit('player move', currentPlayer);
    });



    socket.on('player turn', function(data) {
        console.log('turn: '+currentPlayer.pseudo);
        currentPlayer.rotation = data.rotation;
        socket.broadcast.emit('player turn', currentPlayer);
    });




    socket.on('player shoot', function(data) { 
        console.log(currentPlayer.pseudo+'  shoot'); 
        var data = {
            pseudo: currentPlayer.pseudo,
            position : data.position
        };
        //socket.emit('player shoot', data);
        socket.broadcast.emit('player shoot', data);
    });



    socket.on('player hit', function(data) {
        console.log(currentPlayer.pseudo+' shoot '+data.pseudo);
        socket.broadcast.emit('touch',data);
        
    });

   



    socket.on('disconnect', function() {
        console.log(currentPlayer.pseudo+' has disconnect '+currentPlayer.pseudo);
        socket.broadcast.emit('other player disconnected', currentPlayer);
        socket.emit('disconnect1', currentPlayer);
        console.log(' tell other players that '+currentPlayer.pseudo+' has disconnected ');
        for(var i=0; i<clients.length; i++) {
            if(clients[i].pseudo === currentPlayer.pseudo) {
                clients.splice(i,1);
            }
        }

        for(var i =0; i<clients.length;i++) {
            console.log(clients[i].pseudo+'  is still connected: ');
        }
        console.log(clients);
    });

    socket.on('test-event1', function() {
        console.log('got test-event1');
    });


    socket.on('test-event3', function(data, callback) {
        console.log('got test-event3');
        console.log(data);

        callback({
            test: 123456,
            test2: "test3"
        });
    });

});

// Start server
server.listen(port, function() {
    console.log('------- server is running -----')
});