function Game(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 1000;
	this.height = 500;
	
	this.objects = [];
	this.shots = [];
	this.shootingLock = false;
	this.bombActive = false; //only one bomb object at once
	this.bombLock = false;

	this.fps = 60;
	this.interval = false;
	this.stopped = true;
	this.loader = new Loader(this.width, this.height);
	this.sound = new Sound();

	this.player = new Player(this.width, this.height);
	this.eventhandler;
	//maybe Eventhandler should be main object with Game as a member variable-ask Kukas...
}

Game.prototype.init = function(){
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	document.body.appendChild(this.canvas);
	
	this.eventhandler = new Eventhandler($(this.canvas).offset(), this.player);
	this.loader.loadObjects(this.objects);
	this.sound.init();
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
	if(_this.eventhandler.down["o"]){
		console.log("swap music");
		_this.sound.swap();
		_this.eventhandler.down["o"] = false;
	}
	if(_this.eventhandler.down["p"]){
		_this.stopped = true;
		_this.sound.stop();
		window.clearInterval(this.interval);
		console.log("stopped");
	}
};
Game.prototype.updateShots = function(){
	if(!this.shootingLock && this.eventhandler.down["leftdown"]){
		var shotNew = new Shot(this.player.x, this.player.y);
		shotNew.init(this.eventhandler.mouseX, this.eventhandler.mouseY, this.player.facingR);
		this.shots.push(shotNew);
		this.shootingLock = true;
		var _this = this;
		window.setTimeout(function(){_this.shootingLock = false;}, 300);
	}
	for(var i=0;i<this.shots.length;i++){
		this.shots[i].update();
		if(this.shots[i].collide(this.objects, this.width, this.height)){  //collisions check
			this.shots.splice(i, 1);
		}
		else i++;
	}
};
Game.prototype.updateBomb = function(){
	if(!this.bombLock){
		if(this.eventhandler.down["rightdown"]){
			var bombNew = new Bomb(this.player.x, this.player.y);
			bombNew.init(this.eventhandler.mouseX, this.eventhandler.mouseY, this.player.facingR);
			this.bombActive = bombNew;
			this.bombLock = true;
			var _this = this;
			window.setTimeout(function(){_this.bombLock = false;}, 3000); //3sec
		}
	}
	else{
		console.log("lock");
		this.bombActive.update();
		this.bombActive.collide(this.objects);
		if(this.bombActive.timeToExplode <= 0){
			var expl = new Explosion(this.bombActive.x, this.bombActive.y);
			this.bombActive = false;
		}
	}
};
Game.prototype.update = function(){
	this.player.update(this.eventhandler.down["a"], this.eventhandler.down["d"], this.objects);
	this.updateBomb();
	this.updateShots();
};


Game.prototype.draw = function(){
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.loader.background.draw(this.ctx);
	for(var i = 0;i < this.objects.length;i++){
		this.objects[i].draw(this.ctx);
	}
	for(var i= 0;i<this.shots.length;i++){
		this.shots[i].draw(this.ctx);
	}
	if(this.bombActive){
		this.bombActive.draw(this.ctx);
	}

	this.player.draw(this.ctx);
};