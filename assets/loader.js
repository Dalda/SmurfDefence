function Loader(width, height){
	this.width = width;
	this.height = height;
	this.background = new Background(this.width, this.height);
}
Loader.prototype.loadObjects = function(objects){
	//every objects has to have x, y, width, height - for collision check
	objects.push(new Ground(0, 450, 1000, 50));    //index 0 je ground
	objects.push(new Box(700, 400, 50, 50));
	objects.push(new Box(500, 150, 100, 100));
	objects.push(new Box(820, 340, 100, 50));
	objects.push(new Box(650, 170, 70, 30));
	objects.push(new Box(750, 230, 70, 30));
	objects.push(new Box(870, 290, 50, 50));
};

function Background(width, height){
	this.width = width;
	this.height = height;
	this.shift = 100;
}

Background.prototype.im = new Image();
Background.prototype.im.src = "assets/images/hell.jpg";
Background.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.shift, 0, this.width, this.height,
		0, 0, this.width, this.height-50);
};



