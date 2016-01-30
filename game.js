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
				value: 1,
				cost: [ 1, 0, 0, 0 ]
			}
		],
		gesturesDark = [
			'inverted pentagram'
		],
		gesturesLight = [
			'pentagram'
		],
		spellNamesByGesture = {
			square: 'strength'
		},
		spells = {
			strength: {
				cost: [ 1, 0, 0, 0 ],
				cast: function( player ) {
					player.strengthModifier = 2;
				}
			}
		};

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

		socket.on( 'gesture', game.summon.bind( game, socket ) );
	} );
}

assignGamePrototypeMethods.call( Game.prototype );

function assignGamePrototypeMethods() {
	this.join = joinGame;
	this.addScreen = addScreen;
	this.tick = tick;
	this.summon = summon;
}

function tick() {
	var updateInfo = {};

	this.playerKeys.forEach( _.partial( tickPlayer, _, this.players ) );
	this.playerKeys.forEach( _.partial( finishTurn, _, this.players, updateInfo ) );
}

function tickPlayer( playerId, players, updateInfo ) {
	var player = players[ playerId ],
			mobs = player.mobs,
			fieldResources = player.fieldResources,
			enemies = player.opponent.mobs,
			info = updateInfo[ playerId ] = {
				died: [],
				damaged: [],
				fighting: [],
				looted: []
			};

	mobs.forEach( _.partial( mobTick, _, this, player, enemies, fieldResources, player.opponent, info ) );
}

function finishTurn( playerId, players, info ) {
	var player = players[ playerId ],
			mobs = player.mobs,
			mob, i = 1;
	
	while( mobs[ mobs.length - 1 ].dead ) mobs.pop();

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

function mobTick( mob, game, player, enemies, fieldResources, opponent, info ) {
	var stats = mobStats[ mob.type ],
			range = stats.range,
			mobPosition = mob.position,
			closestEnemy = enemies[ enemies.length - 1 ],
			closestEnemyPosition = closestEnemy ? closestEnemy.position : null,
			closestEnemyDistance = closestEnemyPosition ? Math.abs( mobPosition - closestEnemyPosition ) : null,
			closestResource = resources[ 0 ],
			closestResourceDistance = closestResource ? Math.abs( mobPosition - closestResource.position ) : null,
			damageDealt;

	mob.moving = false;

	if( closestEnemyDistance <= range ) {
		closestEnemy.damage += stats.strength * player.strengthModifier;
		if( closestEnemy.damage >= mobStats[ closestEnemy.type ].health ) {
			closestEnemy.dead = true;
			info.died.push( { id: mobId } );
			player.resources[ 2 ] += mobStats[ mob.type ].value;
		}
	}
	else if( closestResourceDistance <= range ) {
		damageDealt = stats.strength * player.strengthModifier;
		closestResource.damage += damageDealt;

		if( closestResource.damage >= resourceStats[ resource.type ].health ) {
			resource.dead = true;
			updateInfo.looted.push( { id: resourceId } );
		}
	}
	else {
		mob.position = stats.speed * player.speedModifier * player.direction;
	}
}

function summon( socket, gesture ) {
	var player = this.players[ socket.id ],
			resources = player.resources,
			mobType = player.direction > 0 ? gesturesDark.indexOf( gesture ) : gesturesLight.indexOf( gesture ),
			isMob = mobType > -1,
			spellName = isMob && spellNamesByGesture[ gesture ],
			cost = isMob ? mobStats[ mobType ].cost : spells[ spellName ].cost,
			cantAfford = false;

	cost.forEach( evaluateResouces );

	if( cantAfford ) return socket.emit( 'cannot afford' );

	cost.forEach( spendResource );

	if( isMob ) player.mobs.unshift( new Mob( mobType, player.direction > 0 ? 0 : 1000 ) );
	else spells[ spellName ].cast( player );

	return;

	function evaluateResources( value, index ) {
		if( value ) {
			cantAfford = cantAfford || value > resources[ index ];
		}
	}

	function spendResource( value, index ) {
		resources[ index ] -= value;
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
