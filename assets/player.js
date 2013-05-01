function Player(x, y, ctx){
	this.x = x;
	this.y = y;
	this.ctx = ctx;
	
	this.draw = function(){
		this.ctx.fillRect(this.x, this.y, 10, 10);
	};
}