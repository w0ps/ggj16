var express = require( 'express' ),
		app = express(),
		io;

app.get( '/:gameId', showGame );

function showGame( req, res, next ) {
	var game = getGame( req.params.gameId );
	res.render( 'screen', { gameId: req.params.gameId } );
}


var games = {};

var playerLifeCount = 100;

function Game( id ){
	var game = this;
	games[ id ] = this;

	this.players = {};
	this.screens = {};
	this.room = io.of( '/' + id );
	this.room.on( 'connection', function( socket ){
		console.log( 'a device connected' );

		socket.on( 'screen joined', function() {
			game.screens[ socket.id ] = socket;
			console.log( 'screen joined' );
		} );

		socket.on( 'controller joined', function() {
			game.players[ socket.id ] = socket;
		} );
	} );
}

( assignGamePrototypeMethods ).call( Game.prototype );

function joinGame( socket, name ) {
	this.players.push( new Player( socket ) );
}

function getGame( gameId ) {
	return games[ gameId ] || new Game( gameId );
}

module.exports = {
	app: app,
	games: games,
	getGame: getGame,
	setSocketIO: setSocketIO
};


function Player( socket, name ) {
	this.socket = socket;
	this.name = name;
	this.life = playerLifeCount;
}

function assignGamePrototypeMethods(){
	this.join = joinGame;
}

function setSocketIO( _io ) {
	io = _io;
}
