var socket = io.connect();

var room =window.location.href;
var res=room.split("/");
var roomname=res[4];

socket.on('connect', function(){
			// firing back the connect event to the server
			// and sending the nickname for the connected client
			var sessionId = socket.io.engineid;
			socket.emit("connectman",sessionId, {room:roomname});
});




// socket.on('disconnect', function(){
// 	var sessionId = socket.io.engineid;
// 	socket.emit('disconnect',sessionId);
// });