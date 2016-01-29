var playerLifeCount = 100,
		startingResources = [ 100, 0, 0, 0 ];

function Player( game, socket, name ) {
	console.log( 'creating player' );
	this.game = game;
	this.socket = socket;
	this.name = name;
	this.life = playerLifeCount;
	this.resources = startingResources.slice();
}

assignPlayerPrototypeMethods.call( Player.prototype );

function assignPlayerPrototypeMethods() {
	this.inflictDamage = inflictDamage;
	this.die = die;
}

function inflictDamage() {
	if( --this.life === 0 ) this.die();
}

function die(){
	this.dead = true;
	this.game.finish();
}

module.exports = Player;
