function Background(width, height){
	//roztazene pres cely canvas a posouva se spolu s hracem
	this.width = width;
	this.height = height;
	this.shift = 100;
	this.multiplier = 0.05;
}

Background.prototype.im = new Image();
Background.prototype.im.src = "assets/images/hell.jpg";

Background.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.shift, 0, this.width, this.height,
							0, 0, this.width, this.height-50);
};

Background.prototype.updateLeft = function(amount){
	this.shift -= amount*this.multiplier;
	if(this.shift < 0) this.shift = 1020;
};
Background.prototype.updateRight = function(amount){
	this.shift += amount*this.multiplier;
	if(this.shift > 1020) this.shift = 0;
};

