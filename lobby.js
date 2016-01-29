var express = require( 'express' ),
		lobby = express();

lobby.get( '/:lobbyId', showLobby );

function showLobby( req, res, next ) {
	res.render( 'lobby', { lobbyId: req.params.lobbyId } );
}

module.exports = {
	app: lobby
};
