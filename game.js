var express = require( 'express' ),
		app = express(),
		_ = require( 'underscore' ),
		io;

var mobStats = [
			{ // first mob type
				speed: 2,
				strength: 0.5,
				health: 1,
				range: 1,
				value: 1
			}
		];

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
	this.tick = tick;
}

function tick() {
	var updateInfo = {};

	this.playerKeys.forEach( _.partial( tickPlayer, _, this.players );
	this.playerKeys.forEach( _.partial( cleanupPlayer, _, this.players, updateInfo );
}

function tickPlayer( playerId, players ) {
	var player = players[ playerId ],
			mobs = player.mobs,
			fieldResources = player.fieldResources,
			enemies = player.opponent.mobs;

	mobs.forEach( _.partial( mobTick, _, this, player, enemies, fieldResources, player.opponent ) );
}

function cleanupPlayer( playerId, players, updateInfo ) {
	var player = players[ playerId ],
			mobs = player.mobs,
			mob, info, i = 1;

	info = updateInfo[ playerId ] = {
		died: [],
		damaged: [],
		fighting: []
	};
	
	while( mobs[ mobs.length - 1 ].dead ) {
		mob = mobs.pop();
		player.opponent.resources[ 2 ] += mobStats[ mob.type ].value;
		info.died.push( { id: mob.id } );
	}

	while( mobs[ mobs.length - i ].damage ) {
		mob = mobs[ mobs.length - i ];
		info.damaged.push( { id: mob.id, damage: mob.damage } );
		++i;
	}

	i = 0;
	while( !mobs[ mobs.length - i ].moving ) {
		info.fighting.push( { id: mob.id } );
		++i;
	}
}

function mobTick( mob, game, player, enemies, fieldResources, opponent ) {
	var stats = mobStats[ mob.type ],
			range = stats.range,
			mobPosition = mob.position,
			closestEnemy = enemies[ enemies.length - 1 ],
			closestEnemyPosition = closestEnemy ? closestEnemy.position : null,
			closestEnemyDistance = closestEnemyPosition ? Math.abs( mobPosition - closestEnemyPosition ) : null,
			closestResource = resources[ 0 ],
			closestResourceDistance = closestResource ? Math.abs( mobPosition - closestResource.position ) : null;

	mob.moving = false;

	if( closestEnemyDistance <= range ) {
		closestEnemy.damage += stats.strength * player.strengthModifier;
		if( closestEnemy.damage >= mobStats[ closestEnemy.type ].health ) closestEnemy.dead = true;
	}
	else if( closestResourceDistance <= range ) {
		closestResource.damage += stats.strength * player.strengthModifier;
		if( closestResource.damage >= resourceStats[ resource.type ].health ) resource.dead = true;
	}
	else {
		mob.moving = true;
		mob.position = stats.speed * player.speedModifier * player.direction;
	}
}

function joinGame( socket, name ) {
	var player = this.players[ socket.id ] = new Player( this, socket, name ),
			opponent;
	this.playerKeys = Object.keys( this.players );
	
	if( this.playerKeys.length === 2 ) {
		player.opponent = opponent = this.players[ this.playerKeys[ 0 ] ];
		opponent.opponent = player;
	}

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
