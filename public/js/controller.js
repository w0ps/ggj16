var socket;
document.addEventListener( 'DOMContentLoaded', init );

function init(){
	socket = io( '/' + gameId );

	var playerName = localStorage.playerName || prompt( 'what is your name?' );
	localStorage.playerName = playerName;

	socket.emit( 'controller joined', playerName );
}
