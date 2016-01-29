var socket;
document.addEventListener( 'DOMContentLoaded', init );

function init(){
	socket = io();
  
  // couples the socket connection with a bucket on the server, owned by a specific transformation process
  socket.emit('controller joins lobby', lobbyId );

  socket.on( 'hoi', console.log.bind( console, 'daag' ) );
}
