var socket;
document.addEventListener( 'DOMContentLoaded', init );

function init(){
	socket = io( '/' + gameId );

	var playerName = localStorage.playerName || prompt( 'what is your name?' );
	localStorage.playerName = playerName;

	socket.emit( 'controller joined', playerName );

	socket.on( 'ready?', areYouReady );

	socket.on( 'play', showPlay );
}

function areYouReady( customMessage ) {
	if( prompt( customMessage || 'are you ready?' ) ) socket.emit( 'ready' );
}

function showPlay() {
	console.log( 'play' );
}
