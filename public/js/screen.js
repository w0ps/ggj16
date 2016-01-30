function initCallback() {
  socket.emit( 'screen joined' );

  window.game = new Game();
}

function Game() {
  this.players = {};
  this.mobs = {};
  this.resources = {};

  this.contexts = setupGameView();
}

function tick( updateData ) {
  var fg = game.contexts.fg,
      bg = game.contexts.bg,
      mobs = game.mobs,
      mobStats = tweakables.mobStats,
      colors = tweakables.colors;

  Object.keys( updateData ).forEach( updatePlayerAssets );

  fg.clearRect( 0, 0, game.contexts.width * window.devicePixelRatio, game.contexts.height * window.devicePixelRatio);

  Object.keys( mobs ).forEach( tickAndDrawMob );

  function updatePlayerAssets( playerId ) {
    var playerData = updateData[ playerId ],
        player = game.players[ playerId ],
        direction = player.direction,
        mobs = playerData.mobs;

    if( mobs ) Object.keys( mobs ).forEach( updateMob );

    function updateMob( mobId ) {
      var mob = mobs[ mobId ],
          gameMob = game.mobs[ mobId ];
      if( mob.created ) {
        if( gameMob ) console.log( 'weird this id already exists' );
        gameMob = game.mobs[ mobId ] = mob;
        delete mob.created;
        gameMob.direction = direction;
        gameMob.speed = mobStats[ mob.type ].speed;
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
        } else if( !mob.fighting ) {
          gameMob.speed = mobStats[ gameMob.type ].speed;
          delete gameMob.fighting;
        }
      }
    }

    //console.log( 'updatefun', updateData[ playerId ] );
  }

  function tickAndDrawMob( mobId ) {
    var mob = mobs[ mobId ],
        speed = mob.speed;

    mob.position += speed * mob.direction;
    fg.beginPath();
    fg.arc( mob.position * 30 , 100, 10, 0, 2*Math.PI, false );

    fg.fillStyle = colors[ mob.direction ];
    fg.fill();

    if( mob.died ) delete mobs[ mobId ];
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
        assets = data[ id ];

    Object.keys( assets.mobs ).forEach( fixMob );

    function fixMob( mobId ) {
      var mob = game.mobs[ mobId ];

      if( !mob ) {
        mob = game.mobs[ mobId ] = assets.mobs[ mobId ];
        mob.direction = direction;
      } else {
        mob.position = assets.mobs[ mobId ].position;
        mob.health = assets.mobs[ mobId ].health;
        mob.fighting = assets.mobs[ mobId ].fighting;
      }
    }

    console.log( 'assets:', assets );
  }
}

// function receiveUpdate( data ) {
//   console.log( data );

//   Object.keys( data ).forEach( updatePlayer );

//   return;

//   function updatePlayer( playerId ) {
//     var player = game.players[ playerId ],
//         info = data[ playerId ],
//         updateHandlers = {
//           resources: updateResources
//         };

//     Object.keys( info ).forEach( processUpdate );
    
//     function processUpdate( key ) {
//       ( updateHandlers[ key ] || console.log.bind( console, key ) ) ( info[ key ] );
//     }


//     function updateResources( resources ) {
//       resources.forEach( updateResource );

//       console.log( resources );
//     }

//     function updateResource( value, index ) {
//       if( value !== null ) player.resources[ index ] = value;
//     }
//   }
// }
