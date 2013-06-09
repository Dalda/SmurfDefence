function Shot(x, y, shotPow){
	Throwing.call(this, x+20, y+30, 4, shotPow); //constructor

	this.bounces = 3; //vydrzi 4 odrazu od zeme
}
Shot.prototype = Object.create(Throwing.prototype);

Shot.prototype.draw = function(ctx){
	ctx.fillStyle = "#00AAFF";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
};

Shot.prototype.explode = function(explosions){
	explosions.push(new Explosion(this.x, this.y, 0));
};

Shot.prototype.update = function(){
	this.y += this.vy;
	this.x += this.vx;
	this.vy += 0.1;
	this.vy *= 0.99;
	this.vx *= 0.99;
};

