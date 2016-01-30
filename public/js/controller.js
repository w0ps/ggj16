function initCallback(){
	socket = io( '/' + gameId );

	var playerName = localStorage.playerName || prompt( 'what is your name?' );
	localStorage.playerName = playerName;

	socket.emit( 'controller joined', playerName );
}

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
				info = data[ playerId ];
		
		if( info.resources ) {
			info.resources.forEach( updateResource );

			console.log( info.resources );
		}

		function updateResource( value, index ) {
			if( value !== null ) player.resources[ index ] = value;
		}
	}
}
