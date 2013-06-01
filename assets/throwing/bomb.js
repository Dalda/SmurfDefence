function Bomb(x, y){
	Throwing.call(this, x+20, y+30, 20, 5); //constructor

	this.timeToExplode = 300;
}
Bomb.prototype = Object.create(Throwing.prototype); //inheritance

Bomb.prototype.im = new Image();
Bomb.prototype.im.src = "assets/images/bomb.png";
Bomb.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.x, this.y, this.size, this.size);
};

Bomb.prototype.update = function(){
	this.timeToExplode--;
	this.y += this.vy;
	this.x += this.vx;
	this.vy += 0.1;
	this.vy *= 0.99;
	this.vx *= 0.99;
};
