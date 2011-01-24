var gamejs = require('gamejs');
var grsprites = require('./grsprites');

exports.Game = function() {
  var scene = new gamejs.scene.Scene([1024, 768]);
  
  this.startGameScene = function() {
    function gameUpdate(msDuration) {
    
    }
    
    function gameDoEvents(event) {
      if(event.type == gamejs.event.KEY_DOWN) {
        if(event.key == gamejs.event.K_LEFT) {
          // Turn Left
          ship.rotateDir = -1;
        }
        else if (event.key == gamejs.event.K_RIGHT) {
          // Turn Right
          ship.rotateDir = 1;
        }
        else if (event.key == gamejs.event.K_UP) {
          // Thrust
          ship.thrust = 1;
        }
      }
      else  if (event.type == gamejs.event.KEY_UP) {
        if ([gamejs.event.K_LEFT, gamejs.event.K_RIGHT].indexOf(event.key) > -1) {
          ship.rotateDir = 0;
        }
        else if ([gamejs.event.K_UP].indexOf(event.key) > -1) {
          ship.thrust = 0;
        }
      }
    }
    
    scene.stop();
    
    scene.background = gamejs.image.load('images/Starfield_2.png');
    
    // Add an explosion group - this is mostly "todo"
    var explosionGroup = new gamejs.sprite.Group();
    scene.addGroup(explosionGroup);
    
    // Add a ship to the scene
    var ship = new grsprites.Ship(explosionGroup, scene);
    scene.sprites.push(ship);
    
    // Add planets to the scene
    var planetGroup = new gamejs.sprite.Group();
    scene.addGroup(planetGroup);
    for (var i=0; i < 5; i++) {
      planetGroup.add(new grsprites.Planet(scene, planetGroup));
    }
    
    
    
    //Run loop
    scene.doEvents = gameDoEvents;
    scene.update = gameUpdate;
    scene.start(30);
    return;
  };
}