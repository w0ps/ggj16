var express = require( 'express' ),
		app = express(),
		games = require( './game' ),
		fs = require( 'fs' ),
		io;

var games = require('./game' );

app.locals.tweakables = fs.readFileSync( './tweakables.js', 'utf8' );

app.get( '/:gameId', showController );

function showController( req, res, next ) {
	var game = games.getGame( req.params.gameId );
	res.render( 'controller', { gameId: req.params.gameId } );
}

module.exports = {
	app: app
};
