var Game = function(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = 800;
	this.canvas.height = 480;
	
	this.fps = 60;
	this.interval = false;
};

Game.init = function(){
	document.body.appendChild(this.canvas);
	this.interval = setInterval(this.run(), 1000/this.fps);
};

Game.draw = function() {
	this.ctx.drawRect(0, 0, 100, 100);
};
Game.update = function() {
	//
};

Game.run = function() {
  Game.update();
  Game.draw();
};
