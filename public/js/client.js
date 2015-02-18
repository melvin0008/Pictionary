//var socket = io.connect("http://localhost:3000");
var socket = io.connect("https://pictoin.herokuapp.com");

var createroom= function(){
	var username=$('#cusername').val();
	// localstorage.setItem('username',username);
	var roomname=$('#croomname').val();
	console.log(username);
	console.log(roomname);
	var sessionId = socket.io.engineid;
	socket.emit("checkforroom",sessionId,{room:roomname,user:username});
}
socket.on('connect', function(){
			// firing back the connect event to the server
			// and sending the nickname for the connected client

			var sessionId = socket.io.engineid;
			socket.emit("connectman",sessionId);
			console.log("Connected");

			socket.on('changeurl',function(roomname)
			{
				var currentUrl = window.location.href;
				window.location=currentUrl+'room/'+roomname;
			});

});
