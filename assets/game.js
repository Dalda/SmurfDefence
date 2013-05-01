function Game(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 1000;
	this.height = 500;
	
	this.fps = 60;
	this.interval = false;
	this.stopped = true;
	this.player = new Player(this.width/2, this.height/2, this.ctx);
}

Game.prototype.init = function(){
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	document.body.appendChild(this.canvas);
	registerEvents(this.canvas, this);
	this.startGame();
};

Game.prototype.startGame = function(){
	console.log("running");
	this.stopped = false;
	var _this = this;
	this.interval = window.setInterval(function(){_this.run(_this)}, 1000/_this.fps);
};

Game.prototype.run = function(_this){ //_this is actual game variable
	_this.update();
	_this.draw();
	if(_this.stopped){
		window.clearInterval(this.interval);
		_this.stopped = true;
		console.log("stopped");
	}
};

Game.prototype.update = function(){
	this.player.x += Math.random()*10-5;
	this.player.y += Math.random()*10-5;
};

Game.prototype.draw = function(){
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.player.draw();
};