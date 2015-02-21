var winston= require('winston')

module.exports = function(app, server) {
	var clients=[];

	var io = require('socket.io').listen(server);
	global.io = io;
	
	io.on('connection', function (socket) 
    {

      socket.on( 'connectman', function(session) 
      {
        winston.log('info',"Client connected");
      });

     socket.on( 'checkforroomtocreate', function(session ,data) 
      {
        var roomname=data.room;
        var username=data.user;
        winston.log('info',"Client connected");
        //check whether room exists 
        //if not
        var clients = io.sockets.adapter.rooms[roomname];   
        if (clients)
        {
          var error="Room already exsits . Please create a new room.";
          socket.emit('displayerror',error);
        }
        else
        {
          socket.emit('changeurl',roomname);
        }
        
      });

       socket.on( 'checkforroomtojoin', function(session ,data) 
      {
        var roomname=data.room;
        var username=data.user;
        winston.log('info',"Client connected");
        var clients = io.sockets.adapter.rooms[roomname];   
        console.log(clients);
        if (clients)
        {
           socket.emit('changeurl',roomname);
        }
        else
        {
          
          var error="No room exists. Please create a room first";
          socket.emit('displayerror',error);
        }
        
      });


      socket.on( 'new_message', function(session ,data) 
      {
        var roomname=data.room;
        console.log("Enter");
        socket.broadcast.to(roomname).emit('othermessage',data);
        
      });

      socket.on( 'joinroom', function(session,data) 
      {
          socket.room=data.room;
          socket.user=data.user;
          clients.push(data.user);
          socket.join(data.room);
      });


      socket.on( 'drawLine', function(data, session ) 
      {
            //  socket.broadcast.to(room).emit('new fan');
          if(socket.room)
          {
            var room=socket.room;
            winston.log('info','Room Name is '+room)
            socket.broadcast.to(room).emit('drawLine',data);
          }
          else
          {
            var error="Unauthorized access.";
            socket.emit('displayerror',error);
          }
      });


    });

}