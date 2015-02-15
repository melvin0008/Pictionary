var app = require('../app');
var http = require('http');
var winston = require('winston');
var gameSocket;
var server = http.createServer(app);
var serverforsocket=server.listen(port);


var io = require('socket.io').listen(server);

// pict


// Initiate room and create drawing board for the game
exports.createGame=function(req,res)
{
	// io = sio;
	// console.log('Illara');
 //    gameSocket = socket;
 //    gameSocket.emit('connected', { message: "You are connected!" });
 	io.on('connection', function (socket) 
 	{
		winston.log('info','client connected');
		socket.on( 'drawLine', function( data, session ) 
		{
		    console.log("Illandra");
		    socket.broadcast.emit( 'drawLine', data );
  		});
	});
	res.render('index');
}

// Add users to the Game
exports.addUsers=function()
{

}


// function to generate a random temporary room ID 
function randomRoom()
{

}