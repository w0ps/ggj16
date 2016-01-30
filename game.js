var express = require( 'express' ),
    app = express(),
    _ = require( 'underscore' ),
    fs = require( 'fs' ),
    sprites = require( './sprites' ),
    io;

var tweakables = require( './tweakables' ),
    mobStats = tweakables.mobStats,
    gesturesDark = tweakables.gesturesDark,
    gesturesLight = tweakables.gesturesLight,
    resourceStats = tweakables.resourceStats,
    spellNamesByGesture = tweakables.spellNamesByGesture,
    spells = tweakables.spells,
    maxDistance = tweakables.maxDistance,
    tickDelay = tweakables.tickDelay;

var Player = require( './player' ),
    Mob = require( './mob' ),
    Resource = require( './resource' );

app.locals.tweakables = fs.readFileSync( './tweakables.js', 'utf8' );
app.locals.sprites = sprites.loadBase64();

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
  'confirm pause': 'confirmPause',
  'request gamestate': 'sendGameState'
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

// controller sequence:
// 


function assignGamePrototypeMethods() {
  this.play = play; // unpauses or starts the game
  this.pause = pause; // sets game.running to false
  this.tick = tick; // causes the game to tick
  this.summon = summon; // creates mobs or effects
  this.addScreen = addScreen; // when a desktop joins
  this.join = joinGame; // when a device joins
  this.playerReady = playerReady; // when a player signals ready
  this.requestPause = requestPause; // when a player wants to pause
  this.confirmPause = confirmPause; // when other player agrees to pause
  this.sendGameState = sendGameState; // when new clients want to know everything
}

function play() {
  console.log( 'play' );
  this.sendGameState();
  this.room.emit( 'play' );
  this.started = this.running = true;

  // bootstrap some content in
  var game = this;
  Object.keys( this.players ).forEach( function( id, i ) {
    var player = game.players[ id ];
    
    if( !i ) game.summon( { id }, player.direction > 0 ? 'inverted pentagram' : 'pentagram' );
    player.fieldResources.push( new Resource( 0, resourceStats[ 0 ], player.direction > 0 ? 5 : tweakables.maxDistance - 5 ) );
    //game.summon( { id }, 'square' );
  } );

  this.tick();
}

function pause() {
  this.running = false;
  this.room.emit( 'paused' );
}

function tick() {
  var game = this,
      globalInfo;

  if( !this.running ) return;
  setTimeout( this.tick.bind( this ), tickDelay );

  globalInfo = {};

  this.playerKeys.forEach( function( playerId ) {
    var player = game.players[ playerId ];
    player.update = _.extend( player.update || {}, {
      mobs: player.update && player.update.mobs || {},
      resources: player.update && player.update.resources || [],
      fieldResources: {}
    } );
  } );

  this.playerKeys.forEach( _.partial( tickPlayer, _, this.players ) );
  this.playerKeys.forEach( _.partial( finishTurn, _, this.players, globalInfo ) );
  this.room.emit( 'update', globalInfo );
}

function tickPlayer( playerId, players ) {
  players[ playerId ].mobs.forEach( _.partial( mobTick, _, _, _, this, players[ playerId ] ) );
}

function mobTick( mob, index, mobs, game, player ) {
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
    console.log( 'fighting other mob' );
    //process.exit();

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
    mobInfo.fighting = true;

    if( closestResource.health <= 0 ) {
      update.fieldResources[ closestResource.id ] = { died: true };

      rStats = resourceStats[ closestResource.type ];
      rIndex = rStats.index;

      update.resources[ rIndex ] = player.resources[ rIndex ] += closestResource.value * modifiers.profit;

      fieldResources.shift();
    }
  }
  else { // move mob;
    if( mob.speed === 0 ) {
      mobInfo.fighting = false;
    }

    if( !mob.speed ) mob.speed = stats.speed * player.modifiers.speed * player.direction;

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

  Object.keys( player.update ).forEach( deleteIfEmpty );

  if( Object.keys( player.update ).length ) info[ playerId ] = player.update;
  delete player.update;

  // console.log( player.update );
  return;

  function moveMob( mob ) {
    if( mob.speed ) mob.position += mob.speed;
  }

  function deleteIfEmpty( key ) {
    if( !Object.keys( player.update[ key ] ).length ) delete player.update[ key ];
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
      cantAfford = false, newMob;
  
  if( !cost ) return socket.emit( 'unknown gesture' );

  cost.forEach( evaluateResources );

  if( cantAfford ) return socket.emit( 'cannot afford' );

  player.update = player.update || {
    resources: []
  };

  cost.forEach( spendResource );

  if( isMob ) {
    newMob = new Mob( mobType, mobStats[ mobType ], player.direction > 0 ? 0 : maxDistance );
    player.mobs.unshift( newMob );
    player.update = player.update || {};
    player.update.mobs = player.update.mobs || {};
    player.update.mobs[ newMob.id ] = { created: true, position: newMob.position, type: newMob.type };
  }
  else {
    player.opponent.update = player.opponent.update || {};
    spells[ spellName ].cast( player );
  }

  return;

  function evaluateResources( value, index ) {
    if( value ) {
      cantAfford = cantAfford || value > resources[ index ];
    }
  }

  function spendResource( value, index ) {
    resources[ index ] -= value;
    player.update.resources = player.update.resources || [];
    player.update.resources[ index ] = resources[ index ];
  }
}

function joinGame( socket, name ) {
  console.log( 'joinGame!!' );
  if( Object.keys( this.players ).length === 2 ) return socket.emit( 'game full' );

  var player = this.players[ socket.id ] = new Player( this, socket, name ),
      sendableData = [ { id: socket.id, name: player.name, resources: player.resources, avatar: player.avatar } ],
      opponent;

  this.playerKeys = Object.keys( this.players );

  console.log( 'joinGame', this.playerKeys );

  player.direction = this.playerKeys.length === 1 ? 1 : -1;

  this.room.emit( 'player joined', {
    id: socket.id,
    name: name,
    direction: player.direction,
    resources: player.resources,
    modifiers: player.modifiers
  } );
  
  if( this.playerKeys.length === 2 ) {
    player.opponent = opponent = this.players[ this.playerKeys[ 0 ] ];
    opponent.opponent = player;

    sendableData.push( { id: opponent.socket.id, name: opponent.name, resources: opponent.resources, avatar: opponent.avatar } );
    this.room.emit( 'ready?' );
    this.room.emit( 'remove invite' );
  }

  this.room.emit( 'players', sendableData );
}

function playerReady( socket ) {
  console.log( 'playReady' );
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

  this.sendGameState( socket );

  this.room.emit( 'screen joined' );

  if( !this.playerKeys || this.playerKeys.length === 1 ) socket.emit( 'show invite' );
}

function sendGameState( socket ) {
  console.log( 'sendGameState' );
  var game = this,
      state = {};

  if( !this.started ) return;
  
  Object.keys( this.players ).forEach( getData );
  console.log( 'sending gamestate', state );
  return ( socket || this.room ).emit( 'gamestate', state );

  function getData( playerId ) {
    var player = game.players[ playerId ],
        playerState = state[ playerId ] = {
          mobs: {},
          fieldResources: {},
          modifiers: player.modifiers
        },
        mobs = playerState.mobs,
        fieldResources = playerState.fieldResources;

    player.mobs.forEach( addMob );
    player.fieldResources.forEach( addFieldResource );

    return;

    function addMob( mob ) {
      mobs[ mob.id ] = {
        type: mob.type,
        position: mob.position,
        health: mob.health,
        fighting: mob.speed ? false : true
      };
    }

    function addFieldResource( resource ) {
      fieldResources[ resource.id ] = {
        position: resource.position,
        type: resource.type
      };
    }
  }
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
