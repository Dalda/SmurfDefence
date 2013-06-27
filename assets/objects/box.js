function Box(x, y, xSize, ySize){
	this.x = x;
	this.y = y;
	this.xSize = xSize;
	this.ySize = ySize;
	this.durability = xSize*ySize/10;
}

Box.prototype.im = new Image();
Box.prototype.im.src = "assets/images/box.png";

Box.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.x, this.y, this.xSize, this.ySize);
};
Box.prototype.dead = function(){
	return this.durability <= 0;
}
