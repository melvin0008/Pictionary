var socket = io.connect("https://piction.herokuapp.com",{'forceNew':true });

var createroom= function(){
	var username=$('#cusername').val();
	// localstorage.setItem('username',username);
	var roomname=$('#croomname').val();
	console.log(username);
	console.log(roomname);
	var sessionId = socket.io.engineid;
	socket.emit("createroom",sessionId,{room:roomname,user:username})
}
socket.on('connect', function(){
			// firing back the connect event to the server
			// and sending the nickname for the connected client
			// var room =window.location.href;
			// var res=room.split("/");
			// var roomname=res[4];
			var sessionId = socket.io.engineid;
			socket.emit("connectman",sessionId);
			console.log("Connected");

			socket.on('joinroom',function(roomname)
			{
				 var currentUrl = window.location.href;
				 window.location=currentUrl+'room/'+roomname;
				 var sessionId = socket.io.engineid;
				 socket.emit('joinroom',sessionId,{room:roomname});
			});

});

socket.on('disconnect',function(){
	socket.io.reconnect();
});



// socket.on('disconnect', function(){
// 	var sessionId = socket.io.engineid;
// 	socket.emit('disconnect',sessionId);
// });