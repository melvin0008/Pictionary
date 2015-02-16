module.exports = function(io) {
	 io.on('connection', function (socket) {

	    console.log('clientttt connected');
	    socket.on( 'drawLine', function( data, session ) {
	    console.log("Illandra");
	    socket.broadcast.emit( 'drawLine', data );
	  });
	});
};
