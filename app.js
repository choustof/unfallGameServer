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
var Score = require('./routes/score');
var Pseudo = require('./routes/pseudo');

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
app.use('/score', Score);
app.use('/pseudo', Pseudo);

//first route default
app.get('/', function(req, res) {
    res.send('send back');
    console.log(" first route")
});


// route test
/*app.post('/user/pseudo', function (req, res) { 
    res.send('thank you');
    console.log(req.body)
    console.log("mon premier post")
});*/

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
			score: data.score
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

    socket.on('test-event2', function(data) {
        console.log('got test-event2');
        console.log(data);

        socket.emit('test-event', {
            test: 12345,
            test2: 'test emit event'
        });
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