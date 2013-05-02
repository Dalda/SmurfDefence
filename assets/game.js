function Game(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 1000;
	this.height = 500;
	
	this.objects = {};
	
	this.fps = 60;
	this.interval = false;
	this.stopped = true;
	this.eventhandler = new Eventhandler(this.canvas, this);
	this.player = new Player(this.width/2, this.height/2, this.ctx);
}

Game.prototype.init = function(){
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	document.body.appendChild(this.canvas);
	this.startGame();
};

Game.prototype.startGame = function(){
	console.log("running");
	this.stopped = false;
	var _this = this;
	this.interval = window.setInterval(function(){_this.run(_this)}, 1000/_this.fps);
};

Game.prototype.run = function(_this){ //_this is actual game variable
	//meanwhile processing player input
	_this.update();
	_this.draw();
	if(_this.stopped){
		window.clearInterval(this.interval);
		_this.stopped = true;
		console.log("stopped");
	}
};

Game.prototype.update = function(){
	if(this.eventhandler.down["w"]){
		this.player.y -= this.player.speed;
	}
	if(this.eventhandler.down["s"]){
		this.player.y += this.player.speed;
	}
	if(this.eventhandler.down["a"]){
		this.player.x -= this.player.speed;
	}
	if(this.eventhandler.down["d"]){
		this.player.x += this.player.speed;
	}
};

Game.prototype.draw = function(){
	//getImageData and putImageData is expensive
	//try having many canvases and redraw only changes (only certain canvases)
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.player.draw();
};