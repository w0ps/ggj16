module.exports = {
  mobStats: [
      { // first mob type
        speed: 2,
        strength: 0.5,
        health: 1,
        range: 1,
        value: 1,
        cost: [ 1, 0, 0, 0 ]
      }
    ],
    gesturesDark: [
      'inverted pentagram'
    ],
    gesturesLight: [
      'pentagram'
    ],
    resourceStats: [
      {
        health: 2,
        value: 10,
        index: 1
      },
      {
        health: 10,
        value: 30,
        index: 3
      }
    ],
    spellNamesByGesture: {
      square: 'slow'
    },
    spells: {
      slow: {
        cost: [ 1, 0, 0, 0 ],
        cast: function( player ) {
          player.opponent.update.modifiers = player.opponent.update.modifiers || {};
          player.opponent.update.modifiers.speed = player.opponent.modifiers.speed /= 2;
        }
      }
    },
    colors: {
      '-1': 'red',
      '1': 'blue'
    },
    maxDistance: 100, //1000
    tickDelay: 1000 / 2,
    spriteWidth: 64,
    spriteHeight: 64,
    spriteYOffset: 8
};
