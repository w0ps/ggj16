var socket;
document.addEventListener( 'DOMContentLoaded', init );

function init(){
	socket = io( '/' + gameId );
}
