var socket = io.connect('http://piction.herokuapp.com');

socket.on('connect', function(){
			// firing back the connect event to the server
			// and sending the nickname for the connected client
			var sessionId = socket.io.engineid;
			socket.emit("connectman",sessionId);
});