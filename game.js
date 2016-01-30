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
    },
    maxDistance = 1000,
    tickDelay = 1000 / 2;

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
    socket.on( 'screen joined', game.addScreen.bind( game, socket ) );

    socket.on( 'controller joined', game.join.bind( game, socket ) );

    socket.on( 'gesture', game.summon.bind( game, socket ) );

    socket.on( 'ready', game.playerReady.bind( game, socket ) );
  } );
}

assignGamePrototypeMethods.call( Game.prototype );

function assignGamePrototypeMethods() {
  this.play = play;
  this.tick = tick;
  this.summon = summon;
  this.addScreen = addScreen;
  this.join = joinGame;
  this.playerReady = playerReady;
}

function play() {
  this.room.emit( 'play' );
  this.running = true;
  this.tick();
}

function tick() {
  if( !this.running ) return;
  setTimeout( this.tick.bind( this ), tickDelay );

  this.playerKeys.forEach( playerId => this.players[ playerId ].update = {
    mobs: {},
    resources: {},
    fieldResources: {},
    spells: {}
  } );
  this.playerKeys.forEach( _.partial( tickPlayer, _, this.players ) );
  this.playerKeys.forEach( _.partial( finishTurn, _, this.players ) );
}

function tickPlayer( playerId, players ) {
  mobs.forEach( _.partial( mobTick, _, _, _, this, players[ playerId ] ) );
}

function mobTick( mob, index, mobs, game, player ) {
  var stats = mobStats[ mob.type ],
      fieldResources = player.fieldResources,
      opponent = player.opponent,
      enemies = opponent.enemies,
      range = stats.range,
      mobPosition = mob.position,
      closestEnemy = enemies[ enemies.length - 1 ],
      closestEnemyPosition = closestEnemy ? closestEnemy.position : null,
      closestEnemyDistance = closestEnemyPosition ? Math.abs( mobPosition - closestEnemyPosition ) : null,
      closestResource = resources[ 0 ],
      closestResourceDistance = closestResource ? Math.abs( mobPosition - closestResource.position ) : null,
      mobInfo = player.update.mobs[ mob.id ] || {},
      enemyInfo,
      damageDealt, value, i;

  if( closestEnemyDistance <= range ) {
    damageDealt = stats.strength * player.strengthModifier;
    closestEnemy.damage += damageDealt;
    
    mobInfo.fighting = true;

    if( enemyInfo = player.opponent.update.mobs[ closestEnemy.id ] ) {
      if( enemyInfo.damaged ) enemyInfo.damaged += damageDealt;
      else enemyInfo.damaged = damageDealt;
    }
    else enemyInfo = player.opponent.update.mobs[ closestEnemy.id ] = { damaged: damageDealt };

    if( closestEnemy.health <= 0 ) {
      closestEnemy.dead = enemyInfo.died = true;

      // reward soul value
      value = mobStats[ mob.type ] * player.valueModifier;
      player.resources[ 2 ] += value;
      info.resources[ 2 ] += value;
    }
  }
  else if( closestResourceDistance <= range ) {
    damageDealt = stats.strength * player.strengthModifier;
    closestResource.damage += damageDealt;

    if( closestResource.damage >= resourceStats[ resource.type ].health ) {
      resource.dead = true;
      info.fieldResources[ resource.id ] = { died: true };
    }
  }
  else {
    mobPosition = mob.position = stats.speed * player.speedModifier * player.direction;
    i = index;

    if( mobPosition < 0 || mobPosition > maxDistance ) {
      player.opponent.inflictDamage();
      mob.dead = true;
      mobInfo.finished = true;
    }
    
    // check if it passes next mobs and swap it
    while ( Math.sign( mobPosition - mobs[ i + 1 ].position ) === player.direction ) {
      mobs[ i ] = mobs[ i + 1 ];
      mobs[ i + 1 ] = mob;
      i++;
    }
  }

  // only store update info if something happened worth noting
  if( Object.keys( mobInfo ).length ) info[ mob.id ] = mobInfo;
}

function finishTurn( playerId, players, info ) {
  var mobs = players[ playerId ].mobs;
  
  while( mobs[ mobs.length - 1 ].dead ) mobs.pop();
}

function summon( socket, gesture ) {
  var player = this.players[ socket.id ],
      resources = player.resources,
      mobType = player.direction > 0 ? gesturesDark.indexOf( gesture ) : gesturesLight.indexOf( gesture ),
      isMob = mobType > -1,
      spellName = isMob && spellNamesByGesture[ gesture ],
      cost = ( isMob ? mobStats[ mobType ].cost : spells[ spellName ].cost ) * ( player.costModifier || 1 ),
      cantAfford = false;

  cost.forEach( evaluateResouces );

  if( cantAfford ) return socket.emit( 'cannot afford' );

  cost.forEach( spendResource );

  if( isMob ) player.mobs.unshift( new Mob( mobType, mobStats[ mobType ], player.direction > 0 ? 0 : maxDistance ) );
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
    this.room.emit( 'ready?' );
  }

  this.room.emit( 'player joined', player.name );
}

function playerReady( socket ) {
  var player = this.players[ socket.id ];
  player.ready = true;
  if( player.opponent.ready ) this.play();
}

function addScreen( socket ) {
  console.log( 'screen added' );
  this.screens[ socket.id ] = socket;
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
