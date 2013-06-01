function Explosion(x, y){
	this.x = x;
	this.y = y;
	this.state = 0;
}
Explosion.prototype.endState = 40;

Explosion.prototype.draw = function(ctx){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(this.x-this.state, this.y-this.state, this.state*2, this.state*2);
};
Explosion.prototype.update = function(){
	this.state += 2;
};
Explosion.prototype.end = function(){
	return this.state >= this.endState;
};
