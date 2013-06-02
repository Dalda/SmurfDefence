function Explosion(x, y, type){
	this.x = x;
	this.y = y;
	this.state = 0;
	this.type = type;
}
Explosion.prototype.endState = 40;

Explosion.prototype.draw = function(ctx){
	switch(this.type){
		case 0:
			ctx.fillStyle = "#9999FF";
			ctx.fillRect(this.x-this.state, this.y-this.state, this.state*2, this.state*2);
			break;
		case 1:
			ctx.fillStyle = "#FF9999";
			ctx.fillRect(this.x-this.state, this.y-this.state, this.state*2, this.state*2);
			break;
	}
};
Explosion.prototype.update = function(){
	this.state += 2;
};
Explosion.prototype.end = function(){
	return this.state >= this.endState;
};
