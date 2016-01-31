
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

function tick( updateData ) {
  var fg = game.contexts.fg,
      bg = game.contexts.bg,
      width = game.contexts.width * devicePixelRatio,
      height = game.contexts.height * devicePixelRatio,
      mobs = game.mobs,
      fieldResources = game.fieldResources,
      mobStats = tweakables.mobStats,
      baseline = tweakables.baseline,
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
        updatedFieldResources = playerData.fieldResources,
        sounds = tweakables.sounds,
        playerType = tweakables.playerNames[ player.direction ];

    if( updatedMobs ) Object.keys( updatedMobs ).forEach( updateMob );
    if( updatedModifiers ) Object.keys( updatedModifiers ).forEach( applyModifier );
    if( updatedFieldResources ) Object.keys( updatedFieldResources ).forEach( updateFieldResource );
    if( playerData.life !== undefined ) {
      player.life = playerData.life;
      alert( 'hurt!' );
    }

    function updateMob( mobId ) {
      var mob = updatedMobs[ mobId ],
          gameMob = game.mobs[ mobId ],
          possibleSound;

      if( mob.created ) {
        if( gameMob ) console.log( 'weird this id already exists' );
        gameMob = game.mobs[ mobId ] = mob;
        delete mob.created;
        gameMob.direction = direction;
        gameMob.speed = mobStats[ mob.type ].speed;
        gameMob.player = player;
        
        possibleSound = getPossibleSound( 'spawns' );

      } else if( mob.died ){
        gameMob.died = true;
        possibleSound = getPossibleSound( 'dies' );
      } else if( mob.finished ) {
        delete game.mobs[ mobId ];
      } else {
        gameMob = game.mobs[ mobId ];
        Object.keys( mob ).forEach( copyProperty );

        if( mob.fighting ) {
          gameMob.fighting = true;
          gameMob.speed = 0;
          possibleSound = getPossibleSound( 'strikes' );

        } else if( mob.fighting === false ) {
          gameMob.speed = mobStats[ gameMob.type ].speed;
          delete gameMob.fighting;
        }

        function copyProperty( property ) {
          gameMob[ property ] = mob[ property ];
        }
      }

      if( possibleSound ) return possibleSound.play();

      function getPossibleSound ( action ) {
        var mobSounds = sounds.mobs[ playerType ][ gameMob.type ];
        return mobSounds && mobSounds[ action ];
      }
    }

    function applyModifier( modifierName ) {
      player.modifiers[ modifierName ] = updatedModifiers[ modifierName ];
    }

    function updateFieldResource( fieldResourceId ) {
      var fieldResource = fieldResources[ fieldResourceId ],
          updatedFieldResource = updatedFieldResources[ fieldResourceId ];
      if( updatedFieldResource.died ) {
        fieldResource.died = true;
        sounds.fieldResources[ playerType ][ fieldResource.type ].play()
      }
    }

    //console.log( 'updatefun', updateData[ playerId ] );
  }

  function tickAndDrawMob( mobId ) {
    var mob = mobs[ mobId ],
        speed = mob.speed * mob.player.modifiers.speed,
        stats = mobStats[ mob.type ],
        sprite = base64Sprites[ tweakables.playerNames[ mob.direction ] ],
        x, row;

    mob.position += speed * mob.direction;
    x = ( mob.position / tweakables.maxDistance ) * width;

    if( mob.died ) {
      drawSprite( bg, sprite, mob.type, 4, 64, 64, 8, x, baseline );
      delete mobs[ mobId ];
    } else {
      if( mob.speed ){
        if( mob.firstMoveFrame ) {
          row = 1;
          mob.firstMoveFrame = false;
        }
        else {
          row = 0;
          mob.firstMoveFrame = true;
        }
      } else {
        if( mob.firstAttackFrame ) {
          row = 3;
          mob.firstAttackFrame = false;
        } else {
          row = 2;
          mob.firstAttackFrame = true;
        }
      }

      drawSprite( fg, sprite, mob.type, row, 64, 64, 8, x, baseline );
    }
  }

  function drawFieldResource( resourceId ) {
    var fResource = fieldResources[ resourceId ],
        row;
    x = ( fResource.position / tweakables.maxDistance ) * width;

    // fg.beginPath();
    // fg.arc( x, 100, 5, 0, 2*Math.PI, false );
    // fg.fillStyle = 'black';
    // fg.fill();

    var spriteColumn = fResource.type + ( fResource.direction === -1 ? 1 : 0 );

    if( fResource.died ) {
      delete fieldResources[ resourceId ];
      row = 2;
      drawSprite( bg, base64Sprites.fieldResources, spriteColumn, row, 64, 64, 8, x, baseline );
    } else {
      if( fResource.firstFrame ) {
        row = 1;
        fResource.firstFrame = false;
      } else {
        row = 0;
        fResource.firstFrame = true;
      }
      drawSprite( fg, base64Sprites.fieldResources, spriteColumn, row, 64, 64, 8, x, baseline );
    }
  }
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

  bg.drawImage( base64Sprites.treeDark, 0, 0, 128, 128, tweakables.leftTreeX * devicePixelRatio, tweakables.baseline - 200, 128 * devicePixelRatio, 128 * devicePixelRatio);
  bg.drawImage( base64Sprites.treeLight, 0, 0, 128, 128, ( width + tweakables.rightTreeX ) * devicePixelRatio, tweakables.baseline - 200, 128 * devicePixelRatio, 128 * devicePixelRatio );

  return api;
}

function play() {
  console.log( 'playing' );
  if( !gotGamestate) socket.emit( 'request gamestate' );
}

function pause() {
  console.log( 'pausing' );
}

function handleVictory( socketId ) {
  console.log( 'victory!' + socketId );
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
