function NPC(x, y, type){  /* x, y = souradnice v cele game (0 až treba 2000) */
	Figure.call(this, x, y);
	this.type = type;
	console.log("zije");

	this.shotPower = 3;   // bacha at to neprolitava skrz krabice
	this.shotAccuracy = 0.3;
	this.health = 100;
	this.speed = 2;
	this.init(type);
}
NPC.prototype = Object.create(Figure.prototype);

NPC.prototype.im = new Image();
NPC.prototype.im.src = "assets/images/enemyL.png";

NPC.prototype.init = function(type){
	//shot power nesmi prolitavat skrz krabice
	switch(type){
		case "pawn":
			this.health = 50;
			this.speed = 0.8;
			break;
		case "sprinter":
			this.health = 10;
			this.speed = 3;
			break;
		case "sniper":
			this.shotPower = 10;
			break;

	}
};