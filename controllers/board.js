
var winston=require('winston');
// Initiate room and create drawing board for the game
exports.createGame=function(io)
{
	return function(req,res)
	{

		io.on('connection', function (socket) 
	 	{
	 		var roomName= 'room'+ req.params.roomId
	 		// console.log(roomName);
	 		

	 		// socket.on('connect', function(data){
	 			
			// });

			socket.on( 'connectman', function(session ) 
			{
				console.log(roomName);
				socket.room=roomName;
				socket.join(roomName);
			});

			winston.log('info','client connected');
			socket.on( 'drawLine', function(data, session ) 
			{
                  //  socket.broadcast.to(room).emit('new fan');
		            var room=socket.room
		            io.sockets.in(room).emit('drawLine',data);
		        
	  		});
		});
		res.render('board');
	};
};

// Add users to the Game
exports.addUsers=function()
{

}


// function to generate a random temporary room ID 
function randomRoom()
{

}