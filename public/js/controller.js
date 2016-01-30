var socket;
document.addEventListener( 'DOMContentLoaded', init );

function init(){
	socket = io( '/' + gameId );

	var playerName = localStorage.playerName || prompt( 'what is your name?' );
	localStorage.playerName = playerName;

	socket.emit( 'controller joined', playerName );

	socket.on( 'ready?', areYouReady );

	socket.on( 'play', showPlay );

	socket.on( 'requestPause', confirmPause );
	
	socket.on( 'paused', pause );
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
