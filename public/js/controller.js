var _isDown, _points, _r, _g, _rc, _lastX, _lastY,
    canvas, stats, socket;

window.addEventListener( 'resize', sizeCanvas );

// Socket handlers
socketHandlers = {
  'player joined': playerJoined,
  'players': playerReceived,
  'ready?': areYouReady,
  'play': showPlay,
  'requestPause': confirmPause,
  'paused': pause,
  'update': update,
  'victory': victory,
  'cannot afford': cannotAfford
};

var players = {}, 
    player;

function initCallback() {
  // Hide the splash screen after 3 seconds
  setTimeout(function() {
    var playerNameContainer = document.getElementById('splash').style.display = 'none';
  }, 3000);

  // Connect to the socket
  socket = io( '/' + gameId );

  var playerName = localStorage.playerName || prompt( 'what is your name?' );
  localStorage.playerName = playerName;

  var playerNameContainer = document.getElementById('name');
  playerNameContainer.addEventListener('click', function() { 
    askPause()
  } );

  var playerNameContainer = document.getElementById('name');
  playerNameContainer.innerHTML = localStorage.playerName;

  console.log( 'joining' );
  // player joins game
  socket.emit( 'controller joined', playerName );

  // Setup the canvas
  stats = document.getElementById('stats');
  canvas = document.getElementById('gesture');
  _g = canvas.getContext('2d');
  sizeCanvas();

  // Add events
  canvas.addEventListener('touchstart', function( e ) {
    touchStartEvent(e.touches[0].clientX, e.touches[0].clientY)
  } );
  canvas.addEventListener('touchmove', function( e ) {
    touchMoveEvent(event.touches[0].clientX, event.touches[0].clientY);
  } );
  canvas.addEventListener('touchend', function( e ) {
    touchEndEvent();
  } );
  canvas.addEventListener('oncontextmenu', function ( e ) {
    return false;
  } );

  _isDown = false;
}

function playerReceived( playerData ) {
  var playerCount = Object.keys( playerData ).length;
  playerData.forEach( setPlayer );

  function setPlayer( playerData ) {
    players[ playerData.id ] = {
      name: playerData.name,
      resources: playerData.resources,
      avatar: playerData.avatar
    };
  }
}

function playerJoined( playerData ) {
  var gestureContainer = document.getElementsByClassName('preview')[0],
      playerSide;
  if (playerData.id == socket.nsp + '#' + socket.id) {
    player = playerData;
    updateViewResources( playerData.resources );
    if (_r === undefined) {
      updateSettings( tweakables.playerNames[playerData.direction] );
      createPatternRecognizer( tweakables.playerGestures[playerData.direction] );
      playerSide = playerData.direction == 1 ? 'dark' : 'light';
      gestureContainer.className += ' ' + playerSide;
    }
  }
}

function updateSettings( side ) {
  var playerSideContainer = document.getElementById('playerSide');
  playerSideContainer.innerHTML = side;
}

function createPatternRecognizer( gestures ) {
  _points = new Array();
  _r = new DollarRecognizer( gestures );
}

function updateViewResources(resources) {
  var _resourceContainer;

  resources.forEach ( updateResource );

  function updateResource( resource, i ) {
    if ( resource === null ) return;
    _resourceContainer = document.getElementById('resource_' + i);
    _resourceContainer.innerHTML = resource;
  } 
}

function areYouReady( customMessage ) {
  console.log( 'areyouready?' );
  if( true || prompt( customMessage || 'are you ready?' ) ) socket.emit( 'ready' );
}

function showPlay() {
  console.log( 'play' );
}

function summon(gesture) {
  socket.emit( 'gesture' , gesture );
}

function askPause() {
  console.log( 'Requests pause' );
  socket.emit( 'request pause' );
}

function cannotAfford() {
  var updates = document.getElementById('updates');
  updates.innerHTML = 'Not enough resources';
  setTimeout(function() {
    updates.innerHTML = '';
  }, 1000);
}

function confirmPause( customMsg ) {
  console.log ( 'Confirm pause' );
  if( confirm( customMsg || 'do you agree to pause the game?' ) ) socket.emit( 'confirm pause' );
}

function victory( playerId ) {
  var updates = document.getElementById('updates');
  updates.innerHTML = (playerId == socket.nsp + '#' + socket.id ? 
            tweakables.controllerDefeatTexts[Math.floor(Math.random()*tweakables.controllerDefeatTexts.length)] : 
            tweakables.controllerVictoryTexts[Math.floor(Math.random()*tweakables.controllerVictoryTexts.length)]);
}

function pause() {
  console.log( 'pause...' );
}

function update( data ) {
  console.log( data );

  Object.keys( data ).forEach( updatePlayer );

  return;

  function updatePlayer( playerId ) {
    var player = players[ playerId ],
    currentPlayer = socket.nsp + socket.id == playerId,
    info = data[ playerId ],
    updateHandlers = {
      resources: updateResources,
      mobs: updateMobs
    };

    Object.keys( info ).forEach( processUpdate );

    function processUpdate( key ) {
      ( updateHandlers[ key ] || console.log.bind( console, key ) ) ( info[ key ] );
    }

    function updateMobs( mobs ) {
      var mob, fullHealth,
          socketId = socket.nsp + '#' + socket.id,
          healthContainer = document.getElementById('health');
      for (mob in mobs) {
        if (mobs[mob].finished && playerId !== socketId) {
          fullHealth = health.getElementsByClassName('full_health')[0];
          if (fullHealth !== undefined) {
            fullHealth.src = '/img/empty_health.png';
            fullHealth.className = 'empty_health';
          }
        }  
      }
    }

    function updateResources( resources ) {
      if (playerId == socket.nsp + '#' + socket.id) {
        console.log('UPDATE RESOURCE!');
        console.log(resources);
        updateViewResources ( resources );
      }
      
      resources.forEach( updateResource );

      console.log( resources );
    }

    function updateResource( value, index ) {
      if( value !== null ) player.resources[ index ] = value;
    }
  }
}

// Gestures
function sizeCanvas() {
  var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  width = width-37;

  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  stats.style.height = height + 'px';
  stats.style.width = (width/100*40) + 'px';

  canvas.width = width/100*60;
  canvas.height = height;

  _rc = getCanvasRect(canvas);
}

function getCanvasRect(canvas) {
  var w = canvas.width;
  var h = canvas.height;

  var cx = canvas.offsetLeft;
  var cy = canvas.offsetTop;
  while ( canvas.offsetParent != null ) {
    canvas = canvas.offsetParent;
    cx += canvas.offsetLeft;
    cy += canvas.offsetTop;
  }
  return {x: cx, y: cy, width: w, height: h};
}

function getScrollY() {
  var scrollY = 0;
  if (typeof(document.body.parentElement) != 'undefined') {
        scrollY = document.body.parentElement.scrollTop; // IE
      } else if (typeof(window.pageYOffset) != 'undefined') {
        scrollY = window.pageYOffset; // FF
      }
      return scrollY;
    }

  function touchStartEvent(x, y) {
    document.onselectstart = function() { return false; } // disable drag-select
    document.onmousedown = function() { return false; } // disable drag-select
    _isDown = true;
    x -= _rc.x;
    y -= _rc.y - getScrollY();
    if (_points.length > 0)
      _g.clearRect(0, 0, _rc.width, _rc.height);
    _points.length = 1; // clear
    _points[0] = new Point(x, y);
    _g.fillStyle = tweakables.playerColors[player.direction];
    _g.strokeStyle = tweakables.playerColors[player.direction];
    _g.lineWidth = 5;
    _g.fillRect(x - 4, y - 3, 9, 9);
  }

  function touchMoveEvent(x, y) {
    lastX = x;
    lastY = y;
    if (_isDown)
    {
      x -= _rc.x;
      y -= _rc.y - getScrollY();
        _points[_points.length] = new Point(x, y); // append
        drawConnectedPoint(_points.length - 2, _points.length - 1);
    }
  }

  function touchEndEvent() {
    x = lastX === undefined ? 0 : lastX;
    y = lastY === undefined ? 0 : lastY;
    document.onselectstart = function() { return true; } // enable drag-select
    document.onmousedown = function() { return true; } // enable drag-select
    if (_isDown) {
      _isDown = false;
      if (_points.length >= 10) {
        var result = _r.Recognize(_points, false);
            console.log(result);
            if (result.Score*100 >= 20) { // accurate
              console.log("Summon: " + result.Name)
              summon(result.Name);
            }
            console.log("Result: " + result.Name + " (" + round(result.Score,2) + ").");
      } 
    }
  }

  function drawConnectedPoint(from, to) {
    _g.beginPath();
    _g.moveTo(_points[from].X, _points[from].Y);
    _g.lineTo(_points[to].X, _points[to].Y);
    _g.closePath();
    _g.stroke();
  }

  function round(n, d) {
    d = Math.pow(10, d);
    return Math.round(n * d) / d
  }


