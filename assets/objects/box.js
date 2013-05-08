function Box(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Box.prototype.im = new Image();
Box.prototype.im.src = "assets/images/box.png";

Box.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.x, this.y, this.width, this.height);
};
