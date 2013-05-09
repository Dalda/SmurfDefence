function Background(width, height){
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.shift = 0;
	this.multiplier = 0.2;
}

Background.prototype.im = new Image();
Background.prototype.im.src = "assets/images/hell.jpg";

Background.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.shift, this.x, this.width, this.height,
							this.x, this.y, this.width, this.height);
};

Background.prototype.updateLeft = function(amount){
	this.shift -= amount*this.multiplier;
	this.shift = (this.shift+this.width)%this.width;
};
Background.prototype.updateRight = function(amount){
	this.shift += amount*this.multiplier;
	this.shift = this.shift%this.width;
};

