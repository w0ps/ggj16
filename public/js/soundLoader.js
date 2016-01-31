function customLoadSounds( soundCollection, cb ) {
  var soundsToLoad = [],
      soundSetNames = Object.keys( soundCollection);

  soundSetNames.forEach( loadSounds );

  sounds.load( soundsToLoad.map( formatSoundUrl ) );
  sounds.whenLoaded = parkLoadedSounds;

  function parkLoadedSounds() {
    var soundsByName = {};
    soundsToLoad.forEach( registerNamedSound );

    soundSetNames.forEach( loadSound );

    return cb();

    function registerNamedSound( name ) {
      var refName = formatSoundUrl( name );

      console.log( refName );
      soundsByName[ name ] = sounds[ refName ];
    }

    function loadSound( setName ) {
      loadSounds( setName, soundsByName );
    }
  }

  function formatSoundUrl( str ) { return '/sounds/' + str + '.mp3'; }

  function loadSounds( collectionName, soundsByName ) {
    var set = soundCollection[ collectionName ];

    if( collectionName === 'fieldResources' ) {
      [ 'light', 'dark' ].forEach( loadResourceSounds );

      return;
    }

    if( collectionName === 'mobs' ) {
      [ 'light', 'dark' ].forEach( addMobCollection );

      return;
    }

    return;

    function loadResourceSounds( side ) {
      return set[ side ] && set[ side ].forEach( loadOrStore );

      function loadOrStore( name, i ) {
        if( soundsByName[ name ] ) {
          set.dark[ i ] = soundsByName[ name ];
        } else soundsToLoad.push( name );
      }
    }

    function addMobCollection( side ) {
      set[ side ].forEach( addMobSounds );

      function addMobSounds( mob ) {
        [ 'spawns', 'strikes', 'dies' ].forEach( loadOrStoreSoundType );

        function loadOrStoreSoundType( action ) {
          if( mob[ action ] ) {
            if( soundsByName[ mob[ action ] ] ) mob[ action ] = soundsByName[ mob[ action ] ];
            else soundsToLoad.push( mob[ action ] );
          }
        }
      }
    }

  }
}
