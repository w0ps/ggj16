module.exports = {
  mobStats: [
      { // hound or fairy
        speed: 1.5,
        strength: 0.5,
        health: 1.25,
        range: 1.5,
        value: 1,
        cost: [ 25, 0, 0, 0 ]
      },
      { // satyr or faun
        speed: 1,
        strength: 1,
        health: 1,
        range: 1,
        value: 1,
        cost: [ 0, 2, 0, 0 ]
      },
      { // vampire or elf
        speed: 1.2,
        strength: 1.5,
        health: 2,
        range: 1.2,
        value: 2,
        cost: [ 0, 0, 5, 0 ]
      },
      { // succubus or unicorn
        speed: 0.9,
        strength: 0.75,
        health: 3,
        range: 3,
        value: 5,
        cost: [ 10, , 5, 0 ]
      },
      { // orc of tree person
        speed: 0.7,
        strength: 2.5,
        health: 3,
        range: 1,
        value: 8,
        cost: [ 10, 0, 5, 0 ]
      },
      { // baal or gaia
        speed: 0.4,
        strength: 10,
        health: 50,
        range: 2,
        cost: [ 25, 0, 0, 5 ]
      }
    ],
    gesturesDark: [
      'hound',
      'aries',
      'fangs',
      'lips',
      'tusks',
      'inverted pentagram'
    ],
    gesturesLight: [
      'staff',
      'elder',
      'grace',
      'heart',
      'clover',
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
    playerLife: 10,
    startingResources: [ 50, 10, 0, 0 ],
    maxDistance: 100, //1000
    tickDelay: 1000 / 5,
    spriteWidth: 64,
    spriteHeight: 64,
    spriteYOffset: 8,
    playerNames: {
      '-1': 'light',
      '1': 'dark'
    },
    playerGestures: {
      '-1' : [
        {name: 'staff', points: [[153,293],[153,292],[154,289],[154,286],[154,286],[154,281],[154,279],[154,276],[154,272],[154,271],[154,265],[154,265],[155,259],[155,257],[155,252],[155,250],[155,245],[155,243],[155,238],[155,236],[155,231],[155,229],[155,223],[155,222],[155,216],[155,214],[155,209],[155,207],[155,202],[155,200],[155,195],[155,193],[155,189],[155,186],[155,183],[155,179],[155,178],[156,173],[156,172],[157,169],[157,165],[157,165],[158,162],[158,159],[158,158],[159,156],[159,154],[160,151],[160,151],[160,149],[160,147],[160,144],[160,144],[161,142],[161,140],[161,138],[161,137],[161,136],[161,134],[161,133],[161,131],[161,131],[161,130],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,129],[161,130],[161,131],[160,132],[159,133],[158,135],[158,135],[156,136],[154,138],[152,139],[152,139],[149,140],[146,141],[146,141],[142,141],[138,141],[138,141],[134,141],[131,141],[130,141],[126,139],[125,138],[123,137],[119,135],[119,135],[116,131],[114,129],[113,127],[110,123],[110,123],[108,118],[108,116],[107,112],[107,109],[106,106],[106,102],[106,100],[106,95],[106,94],[108,89],[108,88],[112,83],[112,83],[116,78],[117,77],[121,74],[123,73],[126,70],[129,69],[133,67],[135,66],[139,64],[142,64],[146,63],[149,62],[152,61],[156,61],[158,61],[163,61],[164,61],[169,61],[170,61],[174,62],[177,63],[179,64],[183,66],[183,66],[187,68],[189,70],[190,71],[192,74],[193,76],[194,78],[195,81],[196,83],[196,85],[196,89],[195,90],[194,93],[192,96],[192,97],[189,100],[187,101],[185,103],[181,105],[180,105],[174,107],[174,107],[169,108],[167,108],[164,108],[160,108],[160,108],[156,106],[154,104],[153,104],[152,102],[152,99],[152,98],[152,95],[155,92],[155,92],[157,89],[160,87]]},
        {name: 'elder', points: [[163,292],[164,290],[164,288],[164,284],[163,280],[163,280],[162,275],[160,269],[160,268],[158,261],[157,257],[157,253],[155,245],[155,244],[154,235],[154,233],[152,225],[152,221],[151,216],[150,209],[149,206],[148,196],[148,196],[146,186],[146,184],[145,177],[144,172],[143,168],[141,161],[141,160],[139,153],[138,149],[137,146],[136,139],[135,137],[134,134],[133,128],[132,125],[132,123],[132,117],[131,113],[131,112],[130,108],[130,103],[129,101],[129,100],[128,97],[128,94],[127,91],[126,90],[126,89],[125,87],[124,86],[124,85],[123,83],[123,82],[122,81],[122,80],[122,79],[122,79],[122,78],[121,77],[121,76],[121,76],[121,75],[121,75],[120,74],[120,74],[120,74],[120,73],[120,73],[120,73],[120,73],[120,73],[119,73],[119,73],[119,73],[119,73],[119,73],[119,73],[119,73],[119,73],[119,73],[119,73],[119,73],[118,74],[117,75],[116,76],[116,76],[115,78],[113,80],[112,83],[110,87],[110,87],[109,92],[108,97],[108,99],[107,103],[106,109],[106,111],[106,115],[106,121],[106,123],[107,127],[109,133],[110,135],[111,138],[114,143],[116,145],[118,148],[122,153],[124,154],[128,157],[133,161],[134,161],[140,164],[145,165],[147,166],[154,167],[157,167],[162,167],[169,166],[170,166],[178,163],[180,162],[186,158],[190,155],[193,153],[199,146],[199,146],[205,139],[206,137],[210,131],[212,126],[214,123],[217,115],[217,114],[219,105],[219,103],[219,96],[220,91],[220,88],[219,80],[219,79],[218,73],[216,67],[216,66],[213,61],[209,58],[209,58],[206,55],[198,55],[198,55],[195,57],[191,62],[190,64],[188,68],[186,76],[186,76],[184,85],[184,88],[183,96],[183,100],[182,108],[182,112],[181,122],[181,124],[181,136],[181,136],[181,149],[181,151],[181,161],[181,166],[181,173],[182,181],[182,185],[183,195],[183,197],[185,208],[185,209],[187,221],[187,221],[190,233],[190,233],[193,243],[194,245],[196,253],[197,256],[199,262],[200,268],[201,271],[204,278],[204,280],[206,285],[207,290],[207,291],[208,294],[208,296],[207,296],[205,295],[202,292]]},
        {name: 'grace', points: [[161,56],[160,56],[157,56],[154,58],[152,59],[151,61],[148,66],[147,66],[144,72],[142,74],[141,78],[138,82],[138,85],[137,92],[137,93],[136,100],[136,101],[136,106],[136,110],[137,111],[139,116],[141,118],[143,120],[147,123],[148,123],[157,124],[167,125],[174,127],[176,126],[181,125],[184,123],[188,122],[193,119],[195,118],[200,114],[201,114],[206,108],[206,107],[211,103],[212,99],[214,97],[216,92],[216,91],[216,86],[216,82],[216,81],[216,76],[215,72],[215,71],[213,68],[209,65],[209,65],[205,63],[201,63],[201,63],[197,63],[193,65],[192,65],[189,68],[185,71],[185,72],[182,77],[181,79],[180,83],[177,87],[177,90],[175,96],[175,98],[174,105],[173,105],[172,113],[171,114],[171,122],[170,124],[170,130],[169,133],[169,139],[168,142],[168,147],[168,151],[168,155],[168,160],[168,163],[168,170],[168,171],[168,179],[168,179],[168,186],[168,188],[168,193],[167,197],[167,199],[167,204],[165,206],[165,209],[163,213],[161,214],[160,216],[156,218],[152,218],[152,218],[148,218],[143,216],[143,216],[138,213],[136,211],[133,209],[130,204],[129,203],[126,197],[125,196],[125,190],[125,187],[125,184],[127,178],[128,177],[132,171],[133,171],[139,165],[140,165],[148,161],[148,160],[156,158],[157,158],[165,156],[166,156],[175,156],[176,156],[184,156],[184,156],[192,159],[192,159],[198,164],[200,165],[204,169],[206,172],[208,175],[209,180],[210,182],[211,189],[211,190],[211,196],[210,199],[209,203],[206,207],[206,209],[202,213],[199,213],[196,215],[191,216]]},
        {name: 'heart', points: [[161,258],[162,258],[163,256],[163,255],[163,253],[163,251],[163,249],[163,248],[162,244],[161,240],[160,239],[160,237],[158,233],[157,231],[156,229],[153,225],[151,222],[151,221],[148,218],[145,215],[145,215],[141,212],[138,209],[138,209],[134,207],[130,205],[129,204],[126,202],[121,200],[121,200],[116,198],[112,196],[112,196],[107,194],[103,192],[103,192],[99,190],[96,188],[94,187],[92,186],[90,183],[87,181],[87,181],[84,178],[82,176],[80,174],[80,173],[77,171],[75,168],[74,166],[74,166],[72,164],[71,161],[70,158],[70,158],[69,156],[69,153],[68,151],[68,149],[68,148],[67,145],[67,142],[67,139],[67,139],[68,136],[68,133],[69,130],[70,130],[71,127],[74,124],[74,122],[76,121],[79,118],[81,115],[82,115],[86,112],[89,110],[90,110],[94,108],[98,106],[99,106],[105,105],[108,104],[110,104],[116,104],[117,104],[122,104],[127,104],[128,104],[133,104],[137,104],[138,105],[143,107],[146,108],[148,109],[152,111],[155,113],[155,113],[158,116],[161,120],[161,120],[163,123],[165,127],[165,129],[166,131],[168,134],[169,137],[169,138],[169,140],[170,142],[170,144],[171,146],[171,147],[171,147],[171,147],[172,147],[172,146],[173,144],[174,141],[175,138],[176,138],[178,134],[181,131],[181,130],[184,127],[187,124],[188,124],[192,120],[195,118],[196,118],[201,115],[204,113],[206,113],[211,112],[213,110],[216,110],[221,110],[223,110],[226,110],[231,110],[232,110],[236,110],[241,111],[242,111],[245,112],[249,114],[251,115],[253,116],[256,118],[259,121],[259,121],[261,124],[264,127],[264,128],[266,131],[267,134],[268,137],[268,138],[269,141],[270,144],[270,147],[270,148],[270,152],[270,155],[269,157],[269,159],[268,163],[266,166],[266,167],[264,171],[261,174],[261,175],[259,179],[256,182],[255,182],[252,186],[248,188],[248,189],[243,192],[239,193],[238,194],[233,197],[230,197],[228,199],[223,201],[221,201],[218,203],[213,205],[212,205],[209,208],[204,209],[204,210],[200,212],[195,213],[195,214],[191,216],[187,218],[186,218],[184,220],[181,222],[178,223],[178,224],[176,226],[175,228],[174,230],[172,231],[172,232],[171,235],[170,237],[169,240],[168,240],[168,242],[167,245],[167,248],[167,249],[167,250],[167,253],[167,255],[167,256],[168,258],[168,259]]},
        {name: 'clover', points: [[109,273],[110,274],[111,274],[112,274],[114,274],[116,273],[118,271],[119,269],[120,269],[122,266],[124,262],[126,258],[127,258],[129,252],[131,247],[131,246],[133,240],[134,233],[135,233],[136,226],[136,220],[137,218],[138,211],[138,208],[138,204],[138,197],[138,195],[138,191],[138,186],[138,182],[138,181],[138,176],[138,173],[138,170],[138,169],[138,168],[138,166],[138,165],[137,164],[137,163],[137,163],[137,163],[136,163],[135,165],[134,167],[133,167],[133,169],[130,172],[128,175],[125,178],[125,179],[122,183],[118,186],[116,187],[114,189],[109,191],[104,192],[104,193],[100,194],[94,195],[92,195],[90,195],[85,195],[81,194],[79,193],[77,192],[74,189],[70,186],[69,185],[68,182],[65,178],[63,174],[63,174],[62,169],[60,165],[60,161],[60,161],[60,157],[61,154],[63,151],[64,149],[66,148],[69,145],[72,143],[74,141],[76,141],[80,140],[85,139],[86,138],[89,138],[94,138],[99,138],[100,138],[105,138],[110,138],[112,138],[115,139],[120,140],[124,141],[125,141],[127,142],[129,143],[130,144],[130,145],[130,145],[130,146],[129,146],[128,145],[126,142],[126,142],[124,139],[122,136],[120,131],[120,131],[119,126],[119,120],[119,118],[119,114],[121,109],[122,106],[124,103],[128,98],[130,95],[133,93],[139,89],[140,88],[145,85],[151,82],[151,81],[157,79],[163,77],[163,76],[169,76],[174,76],[176,76],[179,76],[183,77],[188,79],[188,79],[191,81],[194,85],[197,89],[197,89],[199,93],[200,98],[200,101],[200,103],[200,108],[198,112],[197,114],[196,117],[193,122],[190,125],[190,126],[187,130],[184,134],[182,135],[182,136],[180,139],[178,140],[176,142],[176,142],[175,143],[174,143],[174,143],[174,143],[174,143],[174,143],[174,143],[175,142],[176,142],[178,141],[181,140],[185,139],[187,138],[191,137],[197,136],[199,136],[204,136],[211,135],[212,135],[218,135],[225,136],[225,136],[231,137],[236,139],[238,139],[241,141],[244,143],[247,147],[247,148],[248,150],[248,153],[248,156],[247,159],[245,160],[245,162],[242,165],[238,168],[236,169],[234,171],[228,173],[224,174],[222,175],[215,176],[211,176],[208,176],[201,177],[198,177],[195,177],[188,177],[185,177],[183,177],[178,176],[174,176],[173,175],[172,175],[169,174],[168,173],[167,173],[166,172],[165,172],[164,171],[164,171],[163,171],[163,172],[163,172],[163,173],[163,175],[162,179],[162,183],[162,185],[162,189],[162,196],[162,198],[163,203],[164,210],[165,211],[166,220],[166,223],[168,229],[169,236],[170,239],[173,248],[173,248],[176,257],[177,260],[179,264],[182,271],[182,272],[185,276],[188,279],[190,281],[192,281]]},
        {name: 'pentagram', points: [[90,252],[90,251],[91,249],[92,246],[93,242],[94,237],[95,237],[97,231],[100,224],[100,223],[103,215],[105,209],[107,206],[110,197],[110,195],[114,188],[116,181],[118,179],[122,171],[123,168],[126,163],[129,155],[129,154],[133,148],[135,141],[136,141],[139,134],[142,128],[142,127],[145,122],[147,117],[148,113],[149,112],[150,107],[152,103],[153,100],[153,99],[154,97],[154,95],[155,93],[156,92],[157,90],[157,90],[157,89],[158,89],[158,89],[158,89],[159,90],[159,90],[159,92],[160,94],[160,96],[160,99],[161,103],[161,105],[162,108],[163,113],[164,118],[164,120],[165,125],[167,132],[168,134],[170,139],[172,148],[172,148],[175,156],[177,163],[178,165],[181,173],[182,177],[184,182],[186,190],[186,191],[189,197],[192,203],[192,205],[194,209],[196,214],[198,218],[199,219],[201,223],[202,227],[204,230],[205,232],[206,233],[207,235],[208,237],[209,239],[210,240],[210,241],[211,242],[211,243],[211,243],[211,243],[211,243],[211,243],[210,243],[208,242],[208,242],[206,240],[203,239],[199,236],[195,234],[195,234],[190,231],[184,226],[183,225],[178,222],[171,217],[171,217],[165,212],[159,208],[157,207],[150,202],[146,200],[142,198],[134,193],[133,192],[126,190],[119,186],[119,186],[112,182],[106,179],[105,179],[99,175],[94,171],[94,171],[89,167],[85,164],[82,162],[81,161],[77,158],[74,156],[71,154],[70,153],[68,152],[65,151],[63,150],[61,149],[59,148],[58,148],[57,148],[56,148],[56,148],[55,148],[54,148],[53,147],[53,147],[53,147],[53,147],[53,147],[54,147],[57,147],[60,147],[64,147],[64,147],[69,147],[74,147],[79,147],[82,147],[90,147],[94,147],[100,148],[109,148],[110,148],[120,148],[124,148],[131,148],[139,148],[141,148],[151,148],[154,148],[159,148],[167,148],[169,148],[174,148],[181,148],[184,148],[188,148],[194,148],[199,148],[200,148],[207,148],[213,148],[214,148],[218,148],[223,148],[227,148],[229,148],[231,148],[234,148],[238,148],[241,148],[244,148],[244,147],[246,147],[248,147],[250,147],[252,147],[253,147],[254,146],[255,146],[256,146],[256,146],[256,146],[257,146],[257,146],[257,146],[256,146],[255,146],[255,147],[254,148],[252,148],[250,150],[248,151],[245,153],[243,154],[242,155],[239,157],[235,159],[231,161],[229,161],[226,164],[220,167],[216,168],[214,170],[207,174],[203,175],[200,178],[194,182],[191,184],[188,187],[182,191],[178,193],[176,195],[171,199],[167,202],[166,203],[162,208],[156,211],[155,211],[151,215],[146,219],[143,220],[142,222],[137,225],[133,228],[131,229],[129,231],[125,234],[122,236],[119,237],[119,238],[116,240],[113,242],[110,243],[108,245],[106,246],[106,247],[104,248],[102,249],[100,250],[99,251],[98,252],[97,253],[96,253],[95,254],[94,254],[94,255],[93,256],[93,256],[92,257],[92,257],[91,258],[91,258],[90,259],[90,260],[89,260],[89,261],[88,261],[88,262],[88,262],[87,262],[87,262],[87,262],[87,262],[87,262],[87,262],[87,261],[88,260]]}
      ],
      '1': [
        {name: 'hound', points: [[112,219],[110,219],[109,218],[107,215],[106,214],[105,212],[104,207],[104,207],[103,201],[103,200],[104,194],[104,192],[106,186],[106,185],[108,178],[109,178],[112,171],[113,170],[116,165],[119,162],[121,159],[126,154],[126,153],[132,148],[133,148],[138,144],[141,142],[144,140],[148,139],[151,137],[155,137],[159,136],[163,136],[166,136],[169,136],[173,137],[175,138],[180,140],[181,141],[185,144],[186,145],[189,148],[192,150],[193,151],[195,155],[196,156],[197,158],[198,159],[199,160],[199,159],[200,157],[200,156],[202,154],[203,150],[204,149],[207,144],[207,143],[212,138],[212,137],[217,132],[217,131],[223,127],[224,127],[229,123],[230,123],[236,119],[237,119],[243,116],[245,116],[250,115],[251,115],[257,114],[257,114],[263,114],[265,114],[269,115],[272,115],[274,116],[278,118],[279,119],[281,120],[284,122],[286,123],[286,123],[288,125],[289,126],[289,128],[289,128],[289,129],[289,129],[288,129],[288,130],[285,130],[282,130],[281,130],[277,130],[273,130],[272,131],[266,132],[265,133],[259,134],[258,135],[252,137],[250,138],[245,140],[241,142],[238,143],[232,147],[231,147],[225,151],[224,153],[219,156],[217,159],[215,162],[212,167],[211,168],[208,175],[207,175],[207,182],[207,183],[207,190],[207,192],[210,197],[211,199],[215,202],[218,204],[222,205],[227,208],[229,208],[236,209],[236,208],[244,208],[247,208],[251,206],[258,204],[258,203],[264,198],[267,197],[270,194],[276,189],[276,189]]},
        {name: 'aries', points: [[101,164],[101,163],[101,161],[102,160],[104,159],[106,158],[107,157],[110,157],[114,157],[118,157],[119,157],[124,157],[129,157],[130,158],[135,160],[139,162],[139,162],[142,165],[145,169],[145,171],[146,173],[147,178],[147,182],[148,183],[148,187],[146,191],[145,192],[144,195],[141,198],[137,200],[137,201],[131,203],[127,203],[125,204],[118,204],[116,203],[111,203],[105,202],[104,202],[97,199],[95,198],[91,196],[86,192],[85,192],[80,188],[78,185],[76,183],[72,178],[71,176],[70,172],[69,167],[69,166],[69,161],[69,156],[69,155],[70,150],[73,146],[73,145],[78,141],[81,138],[83,137],[91,133],[101,129],[105,128],[111,127],[114,127],[122,126],[122,126],[131,126],[133,126],[139,128],[144,129],[148,130],[154,133],[155,134],[161,138],[163,139],[167,142],[171,146],[172,147],[177,153],[178,155],[180,158],[183,164],[183,164],[186,170],[186,175],[187,176],[189,182],[189,185],[190,187],[191,192],[192,196],[192,196],[192,199],[193,202],[193,203],[193,204],[193,203],[193,201],[193,200],[193,197],[193,192],[193,189],[194,186],[194,179],[195,178],[197,170],[197,168],[199,162],[200,157],[202,154],[205,148],[206,147],[210,141],[211,139],[214,136],[219,132],[220,132],[226,130],[230,128],[233,128],[240,128],[240,128],[247,128],[251,129],[255,130],[261,132],[262,133],[270,136],[272,137],[276,139],[281,143],[281,143],[286,147],[288,151],[289,152],[291,157],[291,161],[292,163],[292,169],[292,172],[292,176],[292,182],[291,183],[291,189],[289,193],[289,195],[286,200],[283,203],[283,205],[278,209],[275,210],[273,212],[268,214],[265,214],[261,215],[255,216],[254,216],[248,216],[243,215],[242,215],[236,212],[234,210],[232,209],[228,206],[226,203],[225,201],[224,197],[224,192],[224,192],[226,187],[229,183],[230,183],[235,180],[239,179],[240,179],[245,179],[249,179],[250,179]]},
        {name: 'fangs', points: [[75,84],[75,82],[76,81],[76,79],[76,78],[76,78],[76,78],[76,79],[76,80],[77,83],[77,85],[78,86],[79,91],[79,92],[80,96],[80,99],[81,101],[82,106],[83,107],[84,113],[84,113],[86,118],[86,120],[87,124],[88,127],[89,129],[91,134],[91,134],[92,139],[93,141],[94,143],[95,147],[96,148],[98,152],[98,154],[99,156],[101,159],[101,160],[102,162],[103,164],[105,166],[105,167],[105,168],[106,170],[107,170],[107,171],[107,172],[107,172],[107,172],[107,172],[107,172],[107,171],[107,170],[107,170],[107,169],[107,167],[107,165],[107,163],[107,162],[107,159],[107,156],[108,155],[108,150],[108,149],[109,145],[109,142],[110,140],[110,135],[111,134],[111,128],[111,128],[112,122],[112,120],[113,117],[113,113],[113,111],[113,106],[114,106],[114,101],[114,99],[114,97],[114,94],[114,92],[114,91],[114,88],[114,86],[114,84],[114,84],[114,83],[114,81],[114,80],[114,79],[114,78],[114,77],[114,77],[114,76],[114,76],[114,76],[114,76],[115,76],[116,76],[117,76],[119,76],[119,76],[124,76],[126,76],[127,76],[131,76],[133,76],[135,76],[139,76],[141,76],[143,76],[147,77],[148,77],[151,77],[155,78],[155,78],[158,78],[162,78],[162,78],[165,78],[167,78],[169,78],[169,78],[170,78],[171,78],[172,79],[172,81],[172,83],[172,84],[172,87],[172,90],[172,91],[172,96],[171,98],[171,102],[171,105],[171,108],[171,112],[171,119],[171,126],[171,133],[171,134],[171,139],[171,141],[172,144],[172,148],[173,149],[173,153],[173,155],[174,156],[175,159],[176,162],[176,162],[178,165],[179,167],[179,168],[179,168],[180,169],[180,169],[180,169],[181,168],[181,165],[181,162],[182,161],[182,155],[183,155],[184,148],[185,147],[185,141],[186,139],[186,134],[188,129],[188,127],[189,120],[190,120],[191,113],[192,111],[193,106],[194,102],[194,99],[195,94],[195,92],[197,88],[197,85],[198,83],[198,79],[198,78],[199,76],[199,75],[199,74],[199,74],[199,75],[199,77]]},
        {name: 'lips', points: [[59,139],[60,139],[60,140],[60,140],[61,140],[62,141],[63,141],[64,141],[64,141],[65,141],[66,141],[68,141],[69,141],[71,141],[71,140],[73,140],[74,139],[76,137],[77,136],[78,136],[80,134],[81,132],[81,131],[83,129],[84,127],[85,125],[86,125],[87,122],[89,120],[89,119],[91,118],[93,116],[94,114],[96,114],[99,112],[100,111],[101,111],[104,109],[107,108],[107,108],[111,108],[113,107],[114,107],[116,107],[119,107],[121,107],[122,107],[125,107],[127,108],[127,108],[129,109],[131,111],[133,113],[133,113],[135,115],[137,118],[137,118],[138,120],[140,123],[140,124],[141,125],[143,126],[144,127],[145,128],[146,128],[146,128],[147,128],[149,127],[150,126],[151,124],[151,123],[153,122],[154,119],[155,117],[156,117],[158,114],[160,112],[161,112],[163,110],[165,108],[165,107],[168,107],[170,106],[172,106],[172,106],[174,106],[176,106],[178,106],[179,106],[180,106],[182,108],[184,109],[184,110],[185,111],[187,112],[189,114],[189,114],[192,116],[194,118],[195,118],[197,120],[200,122],[201,122],[203,124],[206,126],[207,126],[210,127],[213,128],[214,128],[216,128],[220,128],[221,128],[223,128],[226,128],[228,128],[228,128],[231,128],[233,128],[235,127],[235,127],[237,127],[239,126],[241,125],[241,124],[242,124],[243,123],[244,123],[245,122],[245,122],[245,122],[245,122],[245,122],[245,122],[245,122],[243,122],[242,122],[241,122],[238,123],[236,124],[235,124],[232,126],[229,126],[228,127],[224,129],[222,129],[220,131],[216,132],[216,133],[212,135],[209,136],[208,137],[205,140],[204,140],[202,142],[199,144],[199,145],[197,147],[195,150],[194,150],[194,152],[193,154],[192,156],[191,156],[191,158],[190,161],[188,162],[188,163],[187,166],[185,168],[184,168],[183,170],[181,172],[178,172],[178,173],[175,175],[172,175],[172,176],[168,176],[165,176],[164,177],[160,178],[158,178],[154,178],[151,178],[150,178],[145,178],[144,178],[140,178],[137,178],[135,178],[131,177],[130,176],[126,176],[123,175],[121,175],[117,173],[116,172],[112,172],[109,171],[108,171],[104,169],[103,168],[100,168],[96,166],[96,166],[93,164],[90,162],[90,162],[87,160],[84,158],[84,158],[82,156],[80,154],[79,153],[78,152],[76,150],[74,149],[74,149],[72,148],[70,147],[68,147],[67,147],[65,147],[61,148],[61,148]]},
        {name: 'tusks', points: [[76,240],[77,239],[78,237],[78,233],[78,231],[80,228],[81,223],[81,222],[83,216],[83,213],[85,209],[85,204],[87,200],[87,196],[89,192],[90,187],[92,182],[92,178],[94,173],[95,169],[97,164],[98,160],[100,156],[101,152],[103,149],[105,143],[106,142],[110,136],[110,135],[113,131],[115,128],[117,126],[120,123],[121,121],[123,120],[125,117],[127,115],[127,114],[129,113],[130,112],[131,111],[131,111],[132,111],[132,111],[132,111],[132,112],[132,114],[131,114],[131,116],[131,120],[130,122],[130,123],[129,128],[128,131],[128,132],[127,137],[126,140],[126,143],[125,149],[125,150],[125,155],[124,159],[124,161],[124,167],[124,168],[124,173],[124,177],[124,179],[124,184],[124,186],[124,190],[124,195],[124,196],[124,199],[124,203],[124,205],[124,207],[124,210],[124,212],[124,214],[124,215],[123,216],[123,218],[123,219],[122,220],[122,221],[122,222],[122,222],[121,222],[121,223],[121,223],[121,223],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[121,224],[122,224],[123,223],[125,223],[128,222],[128,221],[131,221],[135,220],[136,219],[140,219],[145,218],[146,218],[151,217],[154,216],[157,216],[164,215],[164,215],[170,215],[173,214],[176,214],[181,214],[182,213],[186,213],[190,213],[191,213],[193,213],[196,212],[199,212],[200,212],[201,212],[203,211],[204,211],[205,210],[206,209],[207,207],[207,206],[208,204],[209,201],[209,197],[210,195],[211,189],[211,188],[212,181],[212,179],[213,174],[213,170],[214,166],[214,161],[214,158],[214,151],[214,150],[214,142],[214,142],[214,136],[214,133],[214,131],[214,126],[214,124],[214,123],[214,120],[214,117],[214,115],[214,115],[214,114],[214,114],[214,114],[214,114],[214,115],[215,116],[216,118],[217,121],[217,121],[218,125],[220,129],[220,129],[221,134],[222,138],[223,139],[225,145],[225,147],[227,153],[227,156],[229,161],[230,165],[231,169],[232,174],[233,178],[234,183],[235,186],[236,192],[237,195],[239,200],[240,203],[241,209],[242,211],[243,217],[243,218],[245,223],[245,227],[246,228],[247,231],[248,235],[248,236],[249,237],[249,239],[250,240],[250,241],[250,242],[248,242],[247,242]]},
        {name: 'inverted pentagram', points: [[150,85],[151,93],[151,94],[152,96],[152,97],[154,100],[154,100],[155,102],[155,104],[156,105],[156,106],[157,107],[157,109],[158,110],[158,111],[159,112],[159,114],[159,114],[160,115],[160,116],[160,117],[161,118],[162,120],[162,121],[162,122],[163,123],[163,124],[163,125],[164,126],[164,127],[165,128],[165,129],[165,129],[165,130],[166,131],[166,132],[167,133],[167,134],[167,135],[168,136],[168,137],[168,138],[169,139],[169,140],[169,141],[170,142],[170,143],[170,143],[170,144],[171,145],[171,146],[171,147],[172,148],[172,149],[172,150],[173,152],[173,153],[174,154],[174,155],[174,156],[175,157],[175,158],[175,158],[176,159],[176,160],[176,161],[176,162],[177,163],[177,164],[177,165],[177,166],[178,167],[178,168],[178,169],[179,170],[179,171],[179,172],[179,173],[179,173],[180,174],[180,175],[180,176],[180,177],[181,178],[181,180],[182,181],[182,183],[183,183],[183,184],[183,185],[184,186],[184,186],[184,187],[184,188],[185,189],[185,191],[186,192],[186,193],[186,194],[187,195],[187,196],[188,197],[188,198],[189,200],[189,201],[189,201],[189,202],[190,203],[190,204],[191,205],[191,207],[192,208],[192,209],[193,211],[194,213],[194,214],[194,215],[195,216],[195,218],[196,220],[196,221],[197,223],[197,224],[197,225],[198,226],[198,227],[199,228],[199,230],[199,231],[199,231],[200,232],[200,233],[200,235],[201,236],[201,237],[201,239],[201,240],[202,241],[202,242],[202,243],[202,244],[202,245],[202,245],[203,246],[203,247],[203,248],[203,249],[203,251],[203,252],[204,253],[204,255],[204,256],[204,257],[204,258],[204,259],[205,261],[205,261],[205,262],[205,263],[205,264],[205,265],[205,266],[206,266],[206,267],[206,268],[206,269],[207,269],[207,268],[207,267],[207,266],[208,265],[208,264],[208,263],[208,262],[209,261],[209,259],[210,257],[210,255],[211,253],[211,251],[212,249],[212,247],[212,246],[213,245],[213,243],[214,241],[214,239],[215,237],[216,235],[216,233],[217,232],[217,231],[217,230],[218,229],[218,227],[219,226],[219,225],[220,223],[221,222],[221,220],[222,218],[222,216],[222,216],[223,214],[224,212],[224,210],[225,208],[225,206],[226,205],[227,203],[227,201],[227,201],[228,199],[228,198],[229,196],[230,195],[230,194],[231,192],[231,191],[232,190],[233,189],[233,188],[233,187],[234,187],[235,186],[235,185],[236,184],[236,183],[237,182],[237,181],[238,180],[238,179],[239,178],[239,177],[240,176],[240,175],[240,173],[241,173],[242,172],[242,170],[243,169],[244,168],[244,166],[245,164],[245,163],[246,161],[247,160],[247,159],[247,158],[247,156],[248,155],[248,153],[249,151],[249,150],[250,148],[250,146],[251,145],[251,144],[251,143],[251,142],[252,141],[252,139],[253,137],[253,136],[254,134],[255,133],[255,131],[256,130],[256,129],[257,128],[257,127],[258,125],[259,124],[259,122],[260,120],[261,119],[261,117],[262,115],[262,114],[262,113],[263,112],[263,110],[263,108],[264,106],[264,103],[265,101],[265,99],[265,98],[266,96],[267,94],[267,92],[268,90],[268,88],[268,87],[268,86],[269,85],[269,84],[269,84],[269,83],[269,82],[269,81],[270,81],[270,80],[270,79],[269,80],[269,81],[268,81],[267,82],[266,84],[264,85],[263,85],[263,86],[262,88],[260,89],[259,91],[258,92],[257,94],[255,95],[254,96],[254,97],[253,97],[253,98],[252,99],[251,100],[250,101],[248,102],[247,103],[246,104],[245,105],[243,107],[242,108],[241,108],[240,108],[240,109],[239,110],[238,111],[237,111],[236,112],[235,113],[234,114],[233,115],[231,116],[230,117],[228,117],[228,118],[227,120],[226,121],[224,122],[223,123],[222,124],[220,125],[219,126],[218,127],[216,128],[215,128],[215,129],[213,130],[212,131],[210,133],[208,134],[207,135],[205,136],[204,137],[202,137],[202,138],[200,139],[198,140],[196,141],[194,142],[192,142],[190,143],[188,144],[187,144],[186,145],[184,146],[182,147],[180,148],[179,149],[178,150],[176,151],[175,152],[173,152],[173,153],[172,154],[170,155],[168,156],[167,157],[165,158],[163,159],[162,160],[160,161],[159,161],[159,162],[157,163],[156,164],[154,165],[153,166],[151,167],[150,169],[149,170],[147,170],[147,171],[146,172],[144,173],[143,173],[142,174],[141,175],[140,176],[138,177],[137,177],[136,178],[135,179],[134,180],[133,180],[133,180],[132,181],[131,182],[130,183],[129,183],[128,184],[127,185],[126,186],[125,186],[124,187],[124,188],[123,189],[122,189],[122,190],[122,191],[121,191],[121,192],[121,193],[120,194],[120,195],[119,195],[119,196],[118,196],[117,197],[116,197],[117,197],[118,197],[120,197],[120,197],[122,197],[123,197],[125,197],[127,197],[129,197],[131,196],[132,196],[134,196],[136,196],[136,196],[137,196],[139,196],[141,196],[143,196],[144,197],[146,197],[147,197],[149,197],[150,197],[152,198],[152,198],[153,198],[154,198],[155,198],[156,198],[157,198],[159,199],[160,199],[161,199],[162,199],[164,199],[165,199],[166,200],[168,200],[168,200],[169,200],[170,200],[172,200],[173,201],[175,201],[176,201],[178,202],[180,202],[181,202],[183,203],[183,203],[184,203],[186,203],[188,204],[189,204],[191,204],[192,204],[194,205],[195,205],[197,205],[199,205],[199,205],[200,205],[202,205],[204,205],[205,205],[207,205],[208,206],[210,206],[212,206],[213,206],[215,206],[215,206],[217,206],[219,206],[220,206],[222,206],[224,206],[225,206],[227,206],[228,206],[230,206],[231,206],[232,206],[233,207],[234,207],[235,207],[237,207],[238,207],[239,207],[241,207],[242,208],[243,208],[245,208],[246,208],[248,208],[248,208],[249,209],[250,209],[252,209],[253,209],[254,209],[255,209],[257,209],[258,209],[259,209],[261,210],[262,210],[263,210],[264,210],[265,210],[266,210],[268,210],[269,210],[271,210],[272,210],[274,210],[275,210],[277,210],[278,210],[280,210],[280,210],[281,210],[283,210],[284,210],[286,210],[287,210],[288,210],[290,210],[291,210],[292,210],[293,210],[294,210],[295,210],[296,210],[296,209],[296,209],[297,209],[298,209],[299,209],[300,209],[301,209],[302,209],[303,209],[304,209],[305,209],[306,209],[307,209],[308,209],[307,208],[305,207],[304,207],[304,207],[303,206],[301,204],[299,203],[298,202],[296,200],[295,199],[293,198],[292,197],[291,196],[290,195],[289,194],[287,193],[286,191],[285,190],[283,188],[282,187],[281,185],[280,184],[279,184],[278,182],[277,180],[276,179],[274,178],[273,176],[272,175],[270,173],[270,173],[269,172],[267,170],[265,168],[263,167],[261,165],[259,163],[257,162],[257,162],[255,160],[253,158],[251,157],[249,156],[247,154],[245,153],[244,152],[242,152],[240,151],[238,150],[236,149],[234,148],[232,147],[231,146],[229,145],[229,145],[227,144],[226,143],[224,142],[223,141],[222,139],[220,139],[219,137],[218,136],[217,136],[217,136],[216,134],[215,133],[213,132],[212,131],[211,130],[209,129],[208,128],[206,127],[205,126],[205,126],[203,125],[202,124],[201,123],[199,122],[198,121],[196,120],[195,120],[193,119],[191,118],[191,118],[190,117],[189,116],[187,116],[185,115],[184,114],[182,113],[180,112],[179,112],[177,111],[176,110],[176,110],[175,109],[173,109],[172,108],[171,108],[170,107],[169,106],[168,105],[167,105],[165,104],[164,103],[163,102],[162,102],[161,101],[160,100],[158,99],[157,98],[156,97],[155,96],[154,95],[153,94],[152,93],[151,92],[151,92],[150,91],[149,90],[149,89],[148,89],[148,88],[147,88],[147,87],[146,87],[146,89],[146,90],[146,92],[145,94]]}
      ]
    },
    playerColors: {
      '-1': 'rgb(208,234,242)',
      '1': 'rgb(138,7,7)'
    },
    resourceDistribution: [
      [
        5/10,
        5.5/10,
        6.5/10
      ]//,
      // [
      //   7/10,
      //   8/10
      //   9/10
      // ]
    ],
    baseline: 800,
    leftTreeX: 20,
    rightTreeX: -200,
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
    sounds: {
      other: {
        darkWins: 'boding',
        lightWins: 'swish',
        darkHurts: 'grunt',
        lightHurts: 'snap',
        start: 'horn',
        snare: 'snare'
      },
      fieldResources: {
        dark: [ 'goat' /*woman scream */ ],
        light: [ 'magic-wand-glitter' ]
      },
      mobs: {
        dark: [
          { // hellhound
            spawns: 'growling-dog',
            strikes: 'tear-flesh',
            dies: 'yelp'
          },
          { // satyr/faun
            spawns: 'growl',
            strikes: 'punch',
            dies: 'groan2'
          },
          { // vampire
            spawns: 'vampire-hiss',
            strikes: 'knife-tyre',
            dies: 'shriek'
          },
          { // succubus
            spawns: 'cackle',
            strikes: 'hiss',
            dies: 'screech'
          },
          { // orc
            spawns: 'dragon-growl',
            strikes: 'thud',
            dies: 'gurgle'
          },
          { // baal
            spawns: 'pandemonium',
            strikes: 'explosion',
            dies: 'crackle'
          }
        ],
        light: [
          { // fairy
            spawns: 'giggle',
            strikes: 'magic-smite',
            dies: 'cry'
          },
          { // prophet
            spawns: 'monastery',
            strikes: 'gong',
            dies: 'male-pain'
          },
          { // elf
            spawns: 'whistle',
            strikes: 'arrow-shot',
            dies: 'owl'
          },
          { // unicorn
            spawns: 'neigh',
            strikes: 'fusion-gun',
            dies: 'pop'
          },
          { //tree person
            spawns: 'groan',
            strikes: 'falling-tree',
            dies: 'collapse'
          },
          { // gaia
            spawns: 'the-swarm',
            strikes: 'wind-gust',
            dies: 'bell'
          }
        ]
      }
    }
};
