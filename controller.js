var express = require( 'express' ),
		app = express(),
		io;

app.get( '/:lobbyId', showController );

function showController( req, res, next ) {
	res.render( 'controller-lobby', { lobbyId: req.params.lobbyId } );
}

module.exports = {
	app: app,
	setIO: function( _io ) {
		io = _io;
		declareSocketHandlers();
	}
};


function declareSocketHandlers(){
	console.log( 'declaring socket io handlers' );
	
	io.on( 'controller join lobby', function( roomId ){
		console.log( 'controller joined lobby', arguments );
	} );
}
