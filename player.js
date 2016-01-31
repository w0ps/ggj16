var tweakables = require( './tweakables' );

function Player( game, socket, name ) {
	console.log( 'creating player' );
	this.mobs = [];
	this.game = game;
	this.socket = socket;
	this.name = name;
	this.life = tweakables.playerLife;
	this.resources = tweakables.startingResources.slice();
	this.fieldResources = [];
	this.modifiers = {
		cost: 1,
		speed: 1,
		strength: 1,
		resistance: 1,
		profit: 1,
		range: 1
	};
}

assignPlayerPrototypeMethods.call( Player.prototype );

function assignPlayerPrototypeMethods() {
	this.inflictDamage = inflictDamage;
	this.die = die;
}

function inflictDamage() {
	if( --this.life === 0 ) this.die();
	else this.update.life = this.life;
	console.log( 'life: ', this.life );
}

function die(){
	this.dead = true;
	this.game.finish( this.opponent.socket.id );
}

module.exports = Player;
