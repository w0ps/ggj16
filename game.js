var express = require( 'express' ),
		app = express(),
		io;

var Player = require( './player' );

app.get( '/:gameId', showGame );

function showGame( req, res, next ) {
	var game = getGame( req.params.gameId );
	res.render( 'screen', { gameId: req.params.gameId } );
}

var games = {};

function getGame( gameId ) {
	return games[ gameId ] || new Game( gameId );
}

function Game( id ){
	var game = this;
	games[ id ] = this;

	this.players = {};
	this.screens = {};
	this.room = io.of( '/' + id );
	this.room.on( 'connection', function( socket ){
		socket.on( 'screen joined', game.addScreen.bind( game, socekt ) );

		socket.on( 'controller joined', game.join.bind( game, socket ) );
	} );
}

assignGamePrototypeMethods.call( Game.prototype );

function assignGamePrototypeMethods() {
	this.join = joinGame;
	this.addScreen = addScreen;
}

function joinGame( socket, name ) {
	var player = this.players[ socket.id ] = new Player( this, socket, name );
	this.room.emit( 'player joined', player.name );
}

function addScreen( socket ) {
	console.log( 'screen added' );
	var screen = this.screen[ socket.id ] = socket;
	this.room.emit( 'screen joined' );
}

function setSocketIO( _io ) {
	io = _io;
}

module.exports = {
	app: app,
	games: games,
	getGame: getGame,
	setSocketIO: setSocketIO
};
