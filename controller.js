var express = require( 'express' ),
		app = express(),
		games = require( './game' ),
		io;

var games = require('./game' );

app.get( '/:gameId', showController );

function showController( req, res, next ) {
	var game = games.getGame( req.params.gameId );
	res.render( 'controller', { gameId: req.params.gameId } );
}

module.exports = {
	app: app
};
