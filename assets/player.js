function Player(x, y, ctx){
	this.ctx = ctx;
	
	this.x = x;
	this.y = y;
	this.health = 100;
	this.speed = 2;
	
	this.draw = function(){
		this.ctx.fillRect(this.x-30, this.y-50, 60, 100);
	};
}