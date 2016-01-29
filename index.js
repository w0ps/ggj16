var express = require( 'express' ),
		path = require( 'path' ),
		favicon = require( 'static-favicon' ),
		logger = require( 'morgan' ),
		//cookieParser = require( 'cookie-parser' ),
		//bodyParser = require( 'body-parser' ),
		socketIO = require( 'socket.io' ),
		shortId = require( 'shortid' );

var lobby = require( './lobby' ),
		controller = require( './controller' );

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

var webPort = 3002;

// process.argv.slice( 2 ).forEach( function( value ) {
//     console.log( value );
//     var split = value.split('=');
//     if( split[ 0 ].toLowerCase() === 'apiurl' ) apiUrl = split[ 1 ];
// } );

//app.locals.apiUrl = apiUrl;

app.locals.info = {
	title: 'ggj16'
};

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( favicon() );
app.use( logger( 'dev' ) );
//app.use( bodyParser.json() );
//app.use( bodyParser.urlencoded() );
//app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// app.use( '/', routes );

app.get( '/', showLobby );

app.use( '/lobby', lobby.app );
app.use( '/controller', controller.app );

/// catch 404 and forward to error handler
app.use( function( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
});

/// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
    app.use( function( err, req, res, next ) {
        res.status( err.status || 500 );
        res.render( 'error', {
            message: err.message,
            error: err
        } );
    } );
}

// production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
        message: err.message,
        error: {}
    } );
} );

var server = app.listen( webPort ),
		io = socketIO( server );

io.on( 'connection', function( socket ) {
  console.log( 'a user connected' );
  socket.emit( 'hoi' );
} );

io.on( 'controller joins lobby', function( roomId ){
	console.log( 'controller joined lobby', arguments );
} );

io.on( 'asd', console.log.bind(console, 'asd'));

controller.setIO( io );

function showLobby( req, res, next ) {
	var id = shortId();
	
	res.redirect( '/lobby/' + id );
}
