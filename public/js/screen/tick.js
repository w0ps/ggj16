function tick( updateData ) {
  var fg = game.contexts.fg,
      bg = game.contexts.bg,
      width = game.contexts.width * devicePixelRatio,
      height = game.contexts.height * devicePixelRatio,
      mobs = game.mobs,
      fieldResources = game.fieldResources,
      mobStats = tweakables.mobStats,
      baseline = tweakables.baseline,
      colors = tweakables.colors;

  Object.keys( updateData ).forEach( updatePlayerAssets );

  fg.clearRect( 0, 0, width, height );

  Object.keys( mobs ).forEach( tickAndDrawMob );
  Object.keys( fieldResources ).forEach( drawFieldResource );

  function updatePlayerAssets( playerId ) {
    var playerData = updateData[ playerId ],
        player = game.players[ playerId ],
        direction = player.direction,
        updatedMobs = playerData.mobs,
        updatedModifiers = playerData.modifiers,
        updatedFieldResources = playerData.fieldResources,
        sounds = tweakables.sounds,
        playerType = tweakables.playerNames[ player.direction ];

    if( updatedMobs ) Object.keys( updatedMobs ).forEach( updateMob );
    if( updatedModifiers ) Object.keys( updatedModifiers ).forEach( applyModifier );
    if( updatedFieldResources ) Object.keys( updatedFieldResources ).forEach( updateFieldResource );
    if( playerData.life !== undefined ) {
      player.life = playerData.life;
      alert( 'hurt!' );
    }

    function updateMob( mobId ) {
      var mob = updatedMobs[ mobId ],
          gameMob = game.mobs[ mobId ],
          possibleSound;

      if( mob.created ) {
        if( gameMob ) console.log( 'weird this id already exists' );
        gameMob = game.mobs[ mobId ] = mob;
        delete mob.created;
        gameMob.direction = direction;
        gameMob.speed = mobStats[ mob.type ].speed;
        gameMob.player = player;
        
        possibleSound = getPossibleSound( 'spawns' );

      } else if( mob.died ){
        gameMob.died = true;
        possibleSound = getPossibleSound( 'dies' );
      } else if( mob.finished ) {
        delete game.mobs[ mobId ];
      } else {
        gameMob = game.mobs[ mobId ];
        Object.keys( mob ).forEach( copyProperty );

        if( mob.fighting ) {
          gameMob.fighting = true;
          gameMob.speed = 0;
          possibleSound = getPossibleSound( 'strikes' );

        } else if( mob.fighting === false ) {
          gameMob.speed = mobStats[ gameMob.type ].speed;
          delete gameMob.fighting;
        }

        function copyProperty( property ) {
          gameMob[ property ] = mob[ property ];
        }
      }

      if( possibleSound ) return possibleSound.play();

      function getPossibleSound ( action ) {
        var mobSounds = sounds.mobs[ playerType ][ gameMob.type ];
        return mobSounds && mobSounds[ action ];
      }
    }

    function applyModifier( modifierName ) {
      player.modifiers[ modifierName ] = updatedModifiers[ modifierName ];
    }

    function updateFieldResource( fieldResourceId ) {
      var fieldResource = fieldResources[ fieldResourceId ],
          updatedFieldResource = updatedFieldResources[ fieldResourceId ];
      if( updatedFieldResource.died ) {
        fieldResource.died = true;
        sounds.fieldResources[ playerType ][ fieldResource.type ].play()
      }
    }

    //console.log( 'updatefun', updateData[ playerId ] );
  }

  function tickAndDrawMob( mobId ) {
    var mob = mobs[ mobId ],
        speed = mob.speed * mob.player.modifiers.speed,
        stats = mobStats[ mob.type ],
        sprite = base64Sprites[ tweakables.playerNames[ mob.direction ] ],
        x, row;

    mob.position += speed * mob.direction;
    x = ( mob.position / tweakables.maxDistance ) * width;

    if( mob.died ) {
      drawSprite( bg, sprite, mob.type, 4, 64, 64, 8, x, baseline );
      delete mobs[ mobId ];
    } else {
      if( mob.speed ){
        if( mob.firstMoveFrame ) {
          row = 1;
          mob.firstMoveFrame = false;
        }
        else {
          row = 0;
          mob.firstMoveFrame = true;
        }
      } else {
        if( mob.firstAttackFrame ) {
          row = 3;
          mob.firstAttackFrame = false;
        } else {
          row = 2;
          mob.firstAttackFrame = true;
        }
      }

      drawSprite( fg, sprite, mob.type, row, 64, 64, 8, x, baseline );
    }
  }

  function drawFieldResource( resourceId ) {
    var fResource = fieldResources[ resourceId ],
        row;
    x = ( fResource.position / tweakables.maxDistance ) * width;

    // fg.beginPath();
    // fg.arc( x, 100, 5, 0, 2*Math.PI, false );
    // fg.fillStyle = 'black';
    // fg.fill();

    var spriteColumn = fResource.type + ( fResource.direction === -1 ? 1 : 0 );

    if( fResource.died ) {
      delete fieldResources[ resourceId ];
      row = 2;
      drawSprite( bg, base64Sprites.fieldResources, spriteColumn, row, 64, 64, 8, x, baseline );
    } else {
      if( fResource.firstFrame ) {
        row = 1;
        fResource.firstFrame = false;
      } else {
        row = 0;
        fResource.firstFrame = true;
      }
      drawSprite( fg, base64Sprites.fieldResources, spriteColumn, row, 64, 64, 8, x, baseline );
    }
  }
}
