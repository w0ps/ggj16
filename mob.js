function Mob( type, stats, position ) {
	this.type = type;
	this.position = position;
	this.health = stats.health;
}

module.exports = Mob;
