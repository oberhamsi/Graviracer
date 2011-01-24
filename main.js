/**
 * Graviracer Game
 */

var gamejs = require('gamejs');
var graviracer = require('./graviracer');

function main() {
  gamejs.display.setCaption("Graviracer");
  
  var game = new graviracer.Game();
  game.startGameScene();
}

gamejs.preload([
  "images/ship.png",
  "images/Starfield_2.png",
  "images/planet.png"
]);

gamejs.ready(main);