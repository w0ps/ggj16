
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
  customLoadSounds( tweakables.sounds, console.log.bind( console, 'sounds loaded' ) );
}

socketHandlers = {
  'player joined' : playerJoined,
  'show invite' : createQRInvite,
  'remove invite' : removeQRInvite,
  'play' : play,
  'pause' : pause,
  'gamestate' : loadGameState,
  'update': tick,
  'victory': handleVictory
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
  document.getElementById( 'qrcode' ).style.display = 'none';
}

function setupGameView() {
  var background = base64Sprites.background,
      width = background.width,
      height = background.height,
      canvasBg = document.createElement( 'canvas' ),
      canvasFg = document.createElement( 'canvas' ),
      gameContainer = document.getElementById( 'game-container' ),
      bg, fg,
      api;

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

  bg = canvasBg.getContext( '2d' );
  fg = canvasFg.getContext( '2d' );

  api = {
    bg: bg,
    fg: fg,
    width: width,
    height: height,
    center: [ width / 2, height / 2 ]
  };

  bg.drawImage( base64Sprites.background, 0, 0, width, height, 0, 0, width * devicePixelRatio, height * devicePixelRatio );

  bg.drawImage( base64Sprites.treeDark, 0, 0, 128, 128, tweakables.leftTreeX * devicePixelRatio, ( tweakables.baseline - 200 ) * devicePixelRatio, 128 * devicePixelRatio, 128 * devicePixelRatio);
  bg.drawImage( base64Sprites.treeLight, 0, 0, 128, 128, ( width + tweakables.rightTreeX ) * devicePixelRatio, ( tweakables.baseline - 200 ) * devicePixelRatio, 128 * devicePixelRatio, 128 * devicePixelRatio );

  return api;
}

function play() {
  console.log( 'playing' );
  tweakables.sounds.other.start.play();
  if( !gotGamestate ) socket.emit( 'request gamestate' );
}

function pause() {
  tweakables.sounds.other.snare.play();
  console.log( 'pausing' );
}

function handleVictory( socketId ) {
  console.log( 'victory!' + socketId );
  var playerType = tweakables.playerNames[ game.players[ socketId ].direction ];
  tweakables.sounds.other[ playerType + 'Wins' ].play();
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
        life = assets.life;

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
        fResource.direction = direction;
      } else {
        fResource.health = fieldResources[ resourceId ];
        fResource.died = fieldResources[ resourceId ];
      }
    }

    console.log( 'assets:', assets );
  }
}

function drawSprite( context, image, column, row, spriteWidth, spriteHeight, spriteYOffset, x, y ) {
  context.drawImage(image, column * spriteWidth, row * spriteHeight, spriteWidth, spriteHeight, x - spriteWidth , y - spriteWidth - spriteYOffset, spriteWidth * window.devicePixelRatio, spriteHeight * window.devicePixelRatio );
}
