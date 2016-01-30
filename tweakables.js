module.exports = {
  mobStats: [
      { // hound or fairy
        speed: 1.5,
        strength: 0.5,
        health: 1.25,
        range: 1.5,
        value: 1,
        cost: [ 1, 0, 0, 0 ]
      },
      { // satyr or faun
        speed: 1,
        strength: 1,
        health: 1,
        range: 1,
        value: 1,
        cost: [ 1, 0, 0, 0 ]
      },
      { // vampire or elf
        speed: 1.2,
        strength: 1.5,
        health: 2,
        range: 1.2,
        value: 2,
        cost: [ 0, 1, 0, 0 ]
      },
      { // succubus or unicorn
        speed: 0.9,
        strength: 0.75,
        health: 3,
        range: 3,
        value: 5,
        cost: [ 0, 1, 1, 0 ]
      },
      { // orc of tree person
        speed: 0.7,
        strength: 2.5,
        health: 3,
        range: 1,
        value: 8,
        cost: [ 0, 1, 1, 0 ]
      },
      { // baal or gaia
        speed: 0.4,
        strength: 10,
        health: 50,
        range: 2,
        cost: [ 0, 0, 0, 5 ]
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
        health: 10,
        value: 10,
        index: 1
      },
      {
        health: 20,
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
      '-1': 'blue',
      '1': 'red'
    },
    playerLife: 15,
    startingResources: [ 100, 100, 100, 100 ],
    maxDistance: 100, //1000
    tickDelay: 1000 / 5,
    spriteWidth: 64,
    spriteHeight: 64,
    spriteYOffset: 8,
    playerNames: {
      '-1': 'light',
      '1': 'dark'
    },
    resourceDistribution: [
      [
        1/10,
        2/10,
        3/10
      ]//,
      // [
      //   7/10,
      //   8/10
      //   9/10
      // ]
    ],
    screenVictoryTexts: {
      dark: [
        'name eviscerated those goody two shoes',
        'the light was extinguished forever by name',
        'and thus a thousand years of darkness began'
      ],
      light: [
        'name was happy that it was a good day after all',
        'in a generous gesture, the enlightened ruler name let evil off with a friendly warning',
        'puppies everywhere rejoice for they were saved by name'
      ]
    },
    controllerVictoryTexts: [
      'you did good enough',
      'that was quite alright',
      'I knew you would win!'
    ],
    controllerDefeatTexts: [
      'you suck, seriously',
      'keep on trying',
      'I am so disappointed in you'
    ],
    backgroundColor: '#10381d'
};
