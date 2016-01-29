var express = require( 'express' ),
		app = express();

app.get( '/:lobbyId', showController );

function showController( req, res, next ) {
	res.render( 'controller-lobby', { lobbyId: req.params.lobbyId } );
}

module.exports = {
	app: app
};
