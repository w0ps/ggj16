var shortId = require( 'shortId' );

function Resource( type, stats, position, value ) {
	this.id = shortId();
	this.type = type;
	this.position = position;
	this.health = stats.health;
	this.value = value || stats.value;
	console.log( this );
}

module.exports = Resource;
