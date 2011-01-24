var gamejs = require('gamejs');
var vectors = require('gamejs/utils/vectors');

var Ship = exports.Ship = function(explosionGroup, scene) {
  Ship.superConstructor.apply(this, arguments);
  
  this.explosionGroup = explosionGroup;
  this.scene = scene;
  this.image = gamejs.image.load("images/ship.png");
  this.imageMaster = this.image;
  this.rect = this.image.getRect();
  this.x = 32;
  this.y = 32;
  this.speedX = 0;
  this.speedY = 0;
  this.thrust = 0;
  
  this.heading = 0;
  this.rotateDir = 0;
  this.rotateSpeed = 0;
  
  this.mass = 1.0;
  
  return this;
}

gamejs.utils.objects.extend(Ship, gamejs.sprite.Sprite);



Ship.prototype.update = function(msDuration) {
  // If rotating left...
	if (this.rotateDir < 0) {
	  this.rotateSpeed -= msDuration * 0.001 * 720;
	  if (this.rotateSpeed < -360) this.rotateSpeed = -360;
	}
  // If rotating right...
	else if (this.rotateDir > 0) {
	  this.rotateSpeed += msDuration * 0.001 * 720;
	  if (this.rotateSpeed > 360) this.rotateSpeed = 360;
	}
  // If not rotating...
	else if (this.rotateSpeed != 0) {
	  this.rotateSpeed -= this.rotateSpeed * 0.001 * msDuration * 4;
	}
	
	// If our rotate speed is outside a threshold
	if (this.rotateSpeed > 10 || this.rotateSpeed < -10) {
    this.turnBy(this.rotateSpeed * msDuration * 0.001);
  }
  // Otherwise set to 0 (if we're not trying to rotate!)
  else if (this.rotateDir != 0) {
    this.rotateSpeed = 0;
  }
  
  // If thrusting, apply a force in the direction of the heading.
  if (this.thrust == 1) {
    var theta = this.heading / 180 * Math.PI;
    
    this.speedX += Math.sin(theta) * msDuration * 0.001 * 200;
    this.speedY -= Math.cos(theta) * msDuration * 0.001 * 200;

  }
  
  // Set a max speed / terminal velocity
  squareSpeed = (this.speedX * this.speedX) + (this.speedY * this.speedY);
  if (squareSpeed > 20000.0) {
    // The "square speed" (as squareroot is expensive) is more then 50.0...
    // Need to scale
    ratio = Math.sqrt(20000.0 / squareSpeed);
    this.speedX *= ratio;
    this.speedY *= ratio;
  }
  // What about a minimum speed (too small to notice movement, so reset to zero) (and we're not thrusting)
  else if (this.thrust != 1 && squareSpeed < 100.0) {
    this.speedX = this.speedY = 0.0;
  }
  
  // Move the position by x and y speed.
  this.x += this.speedX * msDuration * 0.001;
  this.y += this.speedY * msDuration * 0.001;
  
  
  // Horizontal Boundary Check
  if (this.x < 0) {
    this.x += this.scene.screen.getRect().width;
  }
  else if (this.x > this.scene.screen.getRect().right) {
    this.x -= this.scene.screen.getRect().width;
  }
  
  // Vertical Boundary Check
  if (this.y < 0) {
    this.y += this.scene.screen.getRect().height;
  }
  else if (this.y > this.scene.screen.getRect().bottom) {
    this.y -= this.scene.screen.getRect().height;
  }
  
  // Position the sprite
  this.rect.center = [this.x, this.y];
}


Ship.prototype.turnBy = function(amount) {
  this.heading += amount;
  
  if (this.heading > 360) this.heading -= 360;
  else if (this.heading < 0) this.heading += 360;
  this.image = gamejs.transform.rotate(this.imageMaster, this.heading);
  this.rect = this.image.getRect();
  return;
}










var Planet = exports.Planet = function(scene, planetGroup) {
  Planet.superConstructor.apply(this, arguments);
  
  this.image = gamejs.image.load("images/planet.png");
  this.rect = this.image.getRect();
  
  var screenRect = scene.screen.getRect();
  var generate = true;
  
  // Temp coordinates;
  var tempPoint = [0.0, 0.0];
  
  while (generate) {
    /*
    this.x = (Math.random() * (screenRect.width  - (2 * this.rect.width)))  + this.rect.width;
    this.y = (Math.random() * (screenRect.height - (2 * this.rect.height))) + this.rect.height;
    */
    tempPoint = [
      (Math.random() * (screenRect.width  - (2 * this.rect.width)))  + this.rect.width,
      (Math.random() * (screenRect.height - (2 * this.rect.height))) + this.rect.height
    ];
    //console.log(tempPoint);
    
    minDist = Number.POSITIVE_INFINITY;

    planetGroup.forEach(function(p) {
      var d = vectors.distance([p.x, p.y], tempPoint);
      console.log(d);
      
      //if (d < minDist) { minDist = d; }
    });
    
    console.log(minDist);


    generate = false;
  }
  
  this.mass = 10.0;
  
  this.rect.center = [this.x, this.y];
  
  return this;
}
gamejs.utils.objects.extend(Planet, gamejs.sprite.Sprite);
