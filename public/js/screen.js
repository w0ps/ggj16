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

Game.prototype.tick = function( updateData ) {
  Object.keys( updateData ).forEach( updatePlayerAssets );

  function updatePlayerAssets( playerId ) {

  }
};

socketHandlers = {
  'player joined' : playerJoined,
  'show invite' : createQRInvite,
  'remove invite' : removeQRInvite,
  'play' : play,
  'pause' : pause,
  'gamestate' : loadGameState,
  'update': receiveUpdate
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
    fg: canvasFg.getContext( '2d' )
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
        assets = data[ id ];
    console.log( 'assets:', assets );
  }
}

function receiveUpdate( data ) {
  console.log( data );

  Object.keys( data ).forEach( updatePlayer );

  return;

  function updatePlayer( playerId ) {
    var player = game.players[ playerId ],
        info = data[ playerId ],
        updateHandlers = {
          resources: updateResources
        };

    Object.keys( info ).forEach( processUpdate );
    
    function processUpdate( key ) {
      ( updateHandlers[ key ] || console.log.bind( console, key ) ) ( info[ key ] );
    }


    function updateResources( resources ) {
      resources.forEach( updateResource );

      console.log( resources );
    }

    function updateResource( value, index ) {
      if( value !== null ) player.resources[ index ] = value;
    }
  }
}
