function Loader(gameWidth, height){
	this.background = new Background(gameWidth, height);   /*width, height = canvas size*/
}
Loader.prototype.loadObjects = function(objects, gw, h){ /*gamewidth, heigth*/
	/*kazdy v objects musi mit x, y, xSize, ySize - for collision check , kde x > 0, y >0 */
	objects.push(new Ground(0, h-50, gw, 50),    //index 0 je ground
				new Box(700, h-100, 50, 50),
				new Box(500, 150, 100, 100),
				new Box(820, 340, 100, 50),
				new Box(650, 170, 70, 30),
				new Box(750, 230, 70, 30),
				new Box(870, 290, 50, 50),
				new Box(1200, h-100, 50, 50),
				new Box(1500, h-100, 50, 50));
};

function Background(gameWidth, height){
	this.gameWidth = gameWidth;
	this.height = height;
	this.shift = 100;
}

Background.prototype.im = new Image();
Background.prototype.im.src = "assets/images/hell.jpg";
Background.prototype.draw = function(ctx){
	ctx.drawImage(this.im, 0, 0, this.gameWidth, this.height-50);
};



