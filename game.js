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
    resourceStats = [
      {
        health: 2,
        value: 2,
        index: 1
      }
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
    maxDistance = 20, //1000
    tickDelay = 1000 / 0.5;

var Player = require( './player' ),
    Mob = require( './mob' ),
    Resource = require( './resource' );

app.get( '/:gameId', showGame );

function showGame( req, res, next ) {
  var game = getGame( req.params.gameId );
  res.render( 'screen', { gameId: req.params.gameId } );
}

var games = {};

function getGame( gameId ) {
  return games[ gameId ] || new Game( gameId );
}

var socketInterface = {
  'screen joined': 'addScreen',
  'controller joined': 'join',
  'gesture': 'summon',
  'ready': 'playerReady',
  'request pause': 'requestPause',
  'confirm pause': 'confirmPause'
};

function Game( id ){
  var game = this;
  games[ id ] = this;

  this.players = {};
  this.screens = {};
  this.room = io.of( '/' + id );
  this.room.on( 'connection', function( socket ){
    Object.keys( socketInterface ).forEach( registerSocketHandler );

    function registerSocketHandler( eventName ) {
      var handler = game[ socketInterface[ eventName ] ];
      if( !handler ) return console.error( eventName + 'not found' );
      socket.on( eventName, game[ socketInterface[ eventName ] ].bind( game, socket ) );
    }
  } );
}

assignGamePrototypeMethods.call( Game.prototype );

function assignGamePrototypeMethods() {
  this.play = play;
  this.pause = pause;
  this.tick = tick;
  this.summon = summon;
  this.addScreen = addScreen;
  this.join = joinGame;
  this.playerReady = playerReady;
  this.requestPause = requestPause;
  this.confirmPause = confirmPause;
}

function play() {
  this.room.emit( 'play' );
  this.running = true;

  var game = this;
  Object.keys( this.players ).forEach( function( id ) {
    var player = game.players[ id ];
    
    game.summon( { id }, player.direction > 0 ? 'inverted pentagram' : 'pentagram' );
    player.fieldResources.push( new Resource( 0, resourceStats[ 0 ], player.direction > 0 ? 3 : 17 ) );
    //game.summon( { id }, 'square' );
  } );

  this.tick();
}

function pause() {
  this.running = false;
  this.room.emit( 'paused' );
}

function tick() {
  if( !this.running ) return;
  setTimeout( this.tick.bind( this ), tickDelay );

  this.playerKeys.forEach( playerId => this.players[ playerId ].update = {
    mobs: {},
    resources: [],
    fieldResources: {},
    spells: {}
  } );
  this.playerKeys.forEach( _.partial( tickPlayer, _, this.players ) );
  this.playerKeys.forEach( _.partial( finishTurn, _, this.players ) );
}

function tickPlayer( playerId, players ) {
  players[ playerId ].mobs.forEach( _.partial( mobTick, _, _, _, this, players[ playerId ] ) );
}

function mobTick( mob, index, mobs, game, player ) {
  console.log( mob );
  var stats = mobStats[ mob.type ],
      fieldResources = player.fieldResources,
      opponent = player.opponent,
      enemies = opponent.mobs,
      modifiers = player.modifiers,
      mobPosition = mob.position,
      range = stats.range * modifiers.range,
      closestEnemy = enemies[ enemies.length - 1 ],
      closestEnemyPosition = closestEnemy && closestEnemy.position,
      closestEnemyDistance = closestEnemyPosition !== undefined && Math.abs( mobPosition - closestEnemyPosition ),
      closestEnemyInRange = closestEnemy !== undefined && closestEnemyDistance <= range,
      closestResource = !closestEnemyInRange && fieldResources[ 0 ],
      closestResourceDistance = closestResource && Math.abs( mobPosition - closestResource.position ),
      closestResourceInRange = closestResource && closestResourceDistance <= range,
      update = player.update,
      mobInfo = update.mobs[ mob.id ] || {},
      enemyInfo,
      damageDealt, value, i,
      rStats, rIndex;

  if( closestEnemyInRange ) {
    mob.speed = 0;
    damageDealt = stats.strength * modifiers.strength;
    closestEnemy.health -= damageDealt;
    mobInfo.fighting = true;

    if( enemyInfo = player.opponent.update.mobs[ closestEnemy.id ] ) {
      if( enemyInfo.damaged ) enemyInfo.damaged += damageDealt;
      else enemyInfo.damaged = damageDealt;
    }
    else enemyInfo = player.opponent.update.mobs[ closestEnemy.id ] = { damaged: damageDealt };

    if( closestEnemy.health <= 0 ) {
      closestEnemy.dead = enemyInfo.died = true;

      // reward soul value
      value = mobStats[ mob.type ].value * modifiers.profit;
      update.resources[ 2 ] = player.resources[ 2 ] += value;
    }
  }
  else if( closestResourceInRange ) {
    mob.speed = 0;
    damageDealt = stats.strength * modifiers.strength;
    closestResource.health -= damageDealt;

    if( closestResource.health <= 0 ) {
      update.fieldResources[ closestResource.id ] = { died: true };

      rStats = resourceStats[ closestResource.type ];
      rIndex = rStats.index;

      update.resources[ rIndex ] = player.resources[ rIndex ] += closestResource.value * modifiers.profit;

      fieldResources.shift();
    }
  }
  else {
    mob.speed = stats.speed * player.modifiers.speed * player.direction;

    if( mobPosition + mob.speed < 0 || mobPosition + mob.speed > maxDistance ) {
      player.opponent.inflictDamage();
      mob.dead = true;
      mobInfo.finished = true;
    }
    
    i = index;
    // check if it passes next mobs and swap it
    while ( mobs[ i + 1 ] && Math.sign( mobPosition - mobs[ i + 1 ].position ) === player.direction ) {
      mobs[ i ] = mobs[ i + 1 ];
      mobs[ i + 1 ] = mob;
      i++;
    }
  }

  // only store update info if something happened worth noting
  if( Object.keys( mobInfo ).length ) update.mobs[ mob.id ] = mobInfo;
}

function finishTurn( playerId, players, info ) {
  var player = players[ playerId ],
      mobs = player.mobs;
  
  while( mobs.length && mobs[ mobs.length - 1 ].dead ) mobs.pop();

  mobs.forEach( moveMob );

  console.log( players[ playerId ].update );
  return;

  function moveMob( mob ) {
    if( mob.speed ) mob.position += mob.speed;
  }

}

function summon( socket, gesture ) {
  console.log( gesture );
  var player = this.players[ socket.id ],
      resources = player.resources,
      mobType = player.direction > 0 ? gesturesDark.indexOf( gesture ) : gesturesLight.indexOf( gesture ),
      isMob = mobType > -1,
      spellName = spellNamesByGesture[ gesture ],
      cost = ( mobStats[ mobType ] || spells[ spellName ] || {} ).cost,
      cantAfford = false;
  
  if( !cost ) return socket.emit( 'unknown gesture' );

  cost.forEach( evaluateResources );

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
  console.log( this.playerKeys );

  player.direction = this.playerKeys.length === 1 ? 1 : -1; 
  
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

function requestPause( socket ) {
  this.players[ socket.id ].opponent.socket.emit( 'requestPause' );
}

function confirmPause( socket ) {
  if( !this.players[ socket.id ] ) return;
  this.pause();
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
