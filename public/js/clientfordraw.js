var socket = io.connect("http://localhost:3000");

socket.on('connect', function(){
			// firing back the connect event to the server
			// and sending the nickname for the connected client
			var room =window.location.href;
			var res=room.split("/");
			var roomname=res[4];
			var username="temp"+(Math.floor((Math.random() * 100) + 1)).toString();
			var sessionId = socket.io.engineid;
			socket.emit("joinroom",sessionId,{room:roomname,user:username});
			console.log("Connected");

});
