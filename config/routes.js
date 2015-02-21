var home= require('../app/controllers/home')
var board= require('../app/controllers/board')


module.exports = function (app) {
	app.get('/',home.index)
	app.get('/room/:roomId',board.createGame)

	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	if (app.get('env') === 'development') {
    	app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('error', {
	            message: err.message,
	            error: err
	        });
    	});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	        message: err.message,
	        error: {}
	    });
	});
}