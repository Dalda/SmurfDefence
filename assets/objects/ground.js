function Ground(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Ground.prototype.im = new Image();
Ground.prototype.im.src = "assets/images/ground.png";

Ground.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.x, this.y, this.width, this.height);
};

