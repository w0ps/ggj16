var _isDown, _points, _r, _g, _rc, _lastX, _lastY,
    canvas, stats, socket;

document.addEventListener( 'DOMContentLoaded', initCallback );
window.addEventListener( 'resize', sizeCanvas );

function initCallback() {
    // Connect to the socket
	socket = io( '/' + gameId );

	var playerName = localStorage.playerName || prompt( 'what is your name?' );
	localStorage.playerName = playerName;

	socket.emit( 'controller joined', playerName );

    // Setup the canvas
    _points = new Array();
    _r = new DollarRecognizer();

    stats = document.getElementById('stats');
    canvas = document.getElementById('gesture');
    _g = canvas.getContext('2d');
    _g.fillStyle = "rgb(0,0,225)";
    _g.strokeStyle = "rgb(0,0,225)";
    _g.lineWidth = 3;
    _g.font = "16px Gentilis";
    sizeCanvas();

    // Add events
    canvas.addEventListener('touchstart', function( e ) {
        touchStartEvent(e.touches[0].clientX, e.touches[0].clientY)
    } );
    canvas.addEventListener('touchmove', function( e ) {
        touchMoveEvent(event.touches[0].clientX, event.touches[0].clientY);
    } );
    canvas.addEventListener('touchend', function( e ) {
        touchEndEvent()
    } );
    canvas.addEventListener('oncontextmenu', function ( e ) {
        return false
    } );

    _isDown = false;
}

function sizeCanvas() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    stats.style.height = height + 'px';
    stats.style.width = (width/100*30) + 'px';

    canvas.width = width/100*70;
    canvas.height = height;

    _rc = getCanvasRect(canvas);
    _g.fillStyle = "rgb(255,255,136)";
    _g.fillRect(0, 0, _rc.width, 20);
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
    drawText("Recording unistroke...");
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
    x = lastX;
    y = lastY;
    document.onselectstart = function() { return true; } // enable drag-select
    document.onmousedown = function() { return true; } // enable drag-select
    if (_isDown) {
        _isDown = false;
        if (_points.length >= 10) {
            var result = _r.Recognize(_points, false);
            drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");
        } 
    }
}

function drawText(str) {
    _g.fillStyle = "rgb(255,255,136)";
    _g.fillRect(0, 0, _rc.width, 20);
    _g.fillStyle = "rgb(0,0,255)";
    _g.fillText(str, 1, 14);
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

// Socket handlers

socketHandlers = {
	'players': playerJoined,
	'ready?': areYouReady,
	'play': showPlay,
	'requestPause': confirmPause,
	'paused': pause,
	'update': update
};

var players = {};

function playerJoined( playerData ) {
	playerData.forEach( setPlayer );
	
	function setPlayer( playerData ) {
		players[ playerData.id ] = {
			name: playerData.name,
			resources: playerData.resources,
			avatar: playerData.avatar
		};
	}
}

function areYouReady( customMessage ) {
	if( true || prompt( customMessage || 'are you ready?' ) ) socket.emit( 'ready' );
}

function showPlay() {
	console.log( 'play' );
}

function askPause() {
	socket.emit( 'request pause' );
}

function confirmPause( customMsg ) {
	if( confirm( customMsg || 'do you agree to pause the game?' ) ) socket.emit( 'confirm pause' );
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
				info = data[ playerId ],
				updateHandlers = {
					resources: updateResources
				}

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
