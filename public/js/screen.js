function initCallback() {
  socket.emit( 'screen joined' );

  window.game = new Game();
}

function Game() {
  this.players = {};
  this.mobs = {};
  this.resources = {};
  this.fieldResources = {};

  this.contexts = setupGameView();
}

function tick( updateData ) {
  var fg = game.contexts.fg,
      bg = game.contexts.bg,
      width = game.contexts.width * devicePixelRatio,
      height = game.contexts.height * devicePixelRatio,
      mobs = game.mobs,
      fieldResources = game.fieldResources,
      mobStats = tweakables.mobStats,
      colors = tweakables.colors;

  Object.keys( updateData ).forEach( updatePlayerAssets );

  fg.clearRect( 0, 0, width, height );

  Object.keys( mobs ).forEach( tickAndDrawMob );
  Object.keys( fieldResources ).forEach( drawFieldResource );

  function updatePlayerAssets( playerId ) {
    var playerData = updateData[ playerId ],
        player = game.players[ playerId ],
        direction = player.direction,
        updatedMobs = playerData.mobs,
        updatedModifiers = playerData.modifiers,
        updatedFieldResources = playerData.fieldResources;

    if( updatedMobs ) Object.keys( updatedMobs ).forEach( updateMob );
    if( updatedModifiers ) Object.keys( updatedModifiers ).forEach( applyModifier );
    if( updatedFieldResources ) Object.keys( updatedFieldResources ).forEach( updateFieldResource );

    function updateMob( mobId ) {
      var mob = updatedMobs[ mobId ],
          gameMob = game.mobs[ mobId ];
      console.log( 'mob.died', mob.died );
      if( mob.created ) {
        if( gameMob ) console.log( 'weird this id already exists' );
        gameMob = game.mobs[ mobId ] = mob;
        delete mob.created;
        gameMob.direction = direction;
        gameMob.speed = mobStats[ mob.type ].speed;
        gameMob.player = player;
      } else if( mob.died ){
        alert( 'died!' );
        gameMob.died = true;
      } else {
        gameMob = game.mobs[ mobId ];
        Object.keys( mob ).forEach( function( property ) {
          gameMob[ property ] = mob[ property ];
        } );

        if( mob.damaged ) console.log( 'ouch: ' + mob.damaged );

        console.log( gameMob );

        if( mob.fighting ) {
          gameMob.fighting = true;
          gameMob.speed = 0;
        } else if( mob.fighting === false ) {
          gameMob.speed = mobStats[ gameMob.type ].speed;
          delete gameMob.fighting;
        }
      }
    }

    function applyModifier( modifierName ) {
      player.modifiers[ modifierName ] = updatedModifiers[ modifierName ];
    }

    function updateFieldResource( fieldResourceId ) {
      var fieldResource = fieldResources[ fieldResourceId ],
          updatedFieldResource = updatedFieldResources[ fieldResourceId ];
      if( updatedFieldResource.died ) fieldResource.died = true;
    }

    //console.log( 'updatefun', updateData[ playerId ] );
  }

  function tickAndDrawMob( mobId ) {
    var mob = mobs[ mobId ],
        speed = mob.speed * mob.player.modifiers.speed,
        x;

    mob.position += speed * mob.direction;
    fg.beginPath();
    x = ( mob.position / tweakables.maxDistance ) * width;
    fg.arc( x , 100, 10, 0, 2*Math.PI, false );

    fg.fillStyle = colors[ mob.direction ];
    fg.fill();

    if( mob.died ) delete mobs[ mobId ];
  }

  function drawFieldResource( resourceId ) {
    var fResource = fieldResources[ resourceId ];
    x = ( fResource.position / tweakables.maxDistance ) * width;
    fg.beginPath();
    fg.arc( x, 100, 5, 0, 2*Math.PI, false );
    fg.fillStyle = 'black';
    fg.fill();

    if( fResource.died ) delete fieldResources[ resourceId ];
  }
}

socketHandlers = {
  'player joined' : playerJoined,
  'show invite' : createQRInvite,
  'remove invite' : removeQRInvite,
  'play' : play,
  'pause' : pause,
  'gamestate' : loadGameState,
  'update': tick
};

document.addEventListener( 'DOMContentLoaded', init );

function playerJoined( player ) {
  game.players[ player.id ] = player;
}

function createQRInvite() {
  var controllerUrl = location.host + '/controller/' + gameId,
      qrcode = new QRCode( document.getElementById( 'qrcode' ), {
      text: controllerUrl,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  } );

  console.log( controllerUrl );
}

function removeQRInvite() {
  document.getElementById( 'qrcode' ).textContent = '';
}

function setupGameView( data ) {
  data = data || {};
  var width = data.width || 600,
      height = data.height || 200,
      canvasBg = document.createElement( 'canvas' ),
      canvasFg = document.createElement( 'canvas' ),
      gameContainer = document.getElementById( 'game-container' );

  canvasBg.width = width * window.devicePixelRatio;
  canvasFg.width = width * window.devicePixelRatio;
  canvasBg.height = height * window.devicePixelRatio;
  canvasFg.height = height * window.devicePixelRatio;

  canvasBg.style.width = width + 'px';
  canvasFg.style.width = width + 'px';
  canvasBg.style.height = height + 'px';
  canvasFg.style.height = height + 'px';

  gameContainer.appendChild( canvasBg );
  gameContainer.appendChild( canvasFg );

  return {
    bg: canvasBg.getContext( '2d' ),
    fg: canvasFg.getContext( '2d' ),
    width: width,
    height: height,
    center: [ width / 2, height / 2 ]
  };
}

function play() {
  console.log( 'playing' );
  if( !gotGamestate) socket.emit( 'request gamestate' );
}

function pause() {
  console.log( 'pausing' );
}

var gotGamestate;

function loadGameState( data ) {
  console.log( 'gamestate: ', data );

  Object.keys( data ).forEach( updatePlayerAssets );

  function updatePlayerAssets( id ) {
    var player = game.players[ id ],
        direction = player.direction,
        assets = data[ id ],
        mobs = assets.mobs,
        fieldResources = assets.fieldResources;

    Object.keys( mobs ).forEach( fixMob );
    Object.keys( fieldResources ).forEach( fixResource );

    function fixMob( mobId ) {
      var mob = game.mobs[ mobId ],
          updateMob;

      if( !mob ) {
        mob = game.mobs[ mobId ] = mobs[ mobId ];
        mob.direction = direction;
        mob.player = player;
      } else {
        updateMob = mobs[ mobId ];
        mob.position = updateMob.position;
        mob.health = updateMob.health;
        mob.fighting = updateMob.fighting;
      }
    }

    function fixResource( resourceId ) {
      var fResource = game.fieldResources[ resourceId ];

      if( !fResource ) {
        fResource = game.fieldResources[ resourceId ] = fieldResources[ resourceId ];
        console.log( fResource );
      } else {
        fResource.health = fieldResources[ resourceId ];
        fResource.died = fieldResources[ resourceId ];
      }
    }

    console.log( 'assets:', assets );
  }
}
