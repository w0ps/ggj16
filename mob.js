var shortId = require( 'shortid' );

function Mob( type, stats, position ) {
	this.type = type;
	this.position = position;
	this.health = stats.health;
	this.id = shortId();
}

module.exports = Mob;
