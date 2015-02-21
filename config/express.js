var express = require('express')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
// , mongoStore = require('connect-mongo')(express)
, flash = require('connect-flash')
, logger = require('morgan')

module.exports = function (app, config) {

	app.set('showStackError', true)
	// should be placed before express.static
	// app.use(express.compress({
	// filter: function (req, res) {
	//   return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
	// },
	// level: 9
	// }))

	app.use(express.static(config.root + '/public'))
	app.set('views', config.root + '/app/views')
	app.set('view engine', 'ejs')

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cookieParser())
	app.use(logger('dev'));
	// app.use(express.session({
	//   secret: 'whostheking',
	//   store: new mongoStore({
	//     url: config.db,
	//     collection : 'sessions'
	// })
	// }))
	app.use(flash())
	//routes
	// app.use(app.router)

	// catch 404 and forward to error handler

}