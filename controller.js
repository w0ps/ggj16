var express = require( 'express' ),
		app = express(),
		games = require( './game' ),
		fs = require( 'fs' ),
        sprites = require( './sprites' ),
		io;

var games = require('./game' );

app.locals.tweakables = fs.readFileSync( './tweakables.js', 'utf8' );
app.locals.sprites = sprites.loadBase64();

app.get( '/:gameId', showController );

function showController( req, res, next ) {
	var game = games.getGame( req.params.gameId );
	res.render( 'controller', { gameId: req.params.gameId } );
}

module.exports = {
	app: app
};
