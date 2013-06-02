function Ground(x, y, xSize, ySize){
	this.x = x;
	this.y = y;
	this.xSize = xSize;
	this.ySize = ySize;
}

Ground.prototype.im = new Image();
Ground.prototype.im.src = "assets/images/ground.png";

Ground.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.x, this.y, this.xSize, this.ySize);
};

