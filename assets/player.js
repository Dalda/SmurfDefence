function Player(x, y){      /* x, y = souradnice v cele game (0 - treba 2000) */
	Figure.call(this, x, y);

	this.shotPower = 7;   //bacha at to neprolitava skrz krabice
	this.shotAccuracy = 0.3;
	this.health = 100;
	this.speed = 2.4;
}
Player.prototype = Object.create(Figure.prototype);

Player.prototype.im = new Image();
Player.prototype.im.src = "assets/images/smurfL.png";

