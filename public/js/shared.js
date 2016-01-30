var socketHandlers = {},
		socket,
		initCallback;

document.addEventListener( 'DOMContentLoaded', init );

function init() {
	var keys = Object.keys( socketHandlers );
	socket = io( '/' + gameId );

	keys.forEach( bindSocket );

	return initCallback && initCallback();
	
	function bindSocket( key ) {
		socket.on( key, socketHandlers[ key ] );
	}
}
