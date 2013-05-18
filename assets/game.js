function Game(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 1000;
	this.height = 500;
	
	this.objects = [];
	this.shots = [];
	this.shootingLock = false;

	this.fps = 60;
	this.interval = false;
	this.stopped = true;
	this.loader = new Loader();
	this.sound = new Sound();
	this.background = new Background(this.width, this.height);
	this.player = new Player(this.width, this.height);
	this.eventhandler;
	//maybe Eventhandler should be main object with Game as a member variable-ask Kukas...
}

Game.prototype.init = function(){
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	document.body.appendChild(this.canvas);
	
	this.eventhandler =  new Eventhandler($(this.canvas).offset(), this.player);
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
	if(_this.eventhandler.down["rightdown"]){
		console.log("swap music");
		_this.sound.swap();
		_this.eventhandler.down["rightdown"] = false;
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
		this.shots.push(new Shot(this.player.x, this.player.y, this.eventhandler.mouseX, this.eventhandler.mouseY));
		this.shootingLock = true;
		var _this = this;
		window.setTimeout(function(){_this.shootingLock = false;}, 300);
	}
	for(var i=0;i<this.shots.length;i++){
		this.shots[i].update();
	}
};
Game.prototype.update = function(){
	this.updateShots();
	this.player.update(this.eventhandler.down["a"], this.eventhandler.down["d"],
						this.eventhandler.lastDirection, this.objects);
	this.collisionPlayer();
	this.collisionShots();

};
Game.prototype.collisionShots = function(){
	for(var i=0;i<this.shots.length;){
		if(this.shots[i].collide(this.objects, this.width, this.height)){
			this.shots.splice(i, 1);
		}
		else i++;
	}
};
Game.prototype.collisionPlayer = function(){
	//x collisions
	var collMoveX = this.player.collideHorizontal(this.objects);
	var collX = collMoveX !== this.player.x;
	if(collX){
		if(Math.abs(collMoveX-this.player.x) < this.player.collTolerance){
			console.log("horizonatal collision");
			this.player.x = collMoveX;
		}
	}
	else{ //no collisions-> move bg image, if player moving
		if(this.eventhandler.down["a"]) this.background.updateLeft(this.player.speed);
		if(this.eventhandler.down["d"]) this.background.updateRight(this.player.speed);
	}

	//y collisions
	var collMoveY = this.player.collideVertical(this.objects);
	var collY = collMoveY !== this.player.y;
	if(collY){
		if(Math.abs(collMoveY-this.player.y) < this.player.collTolerance){
			console.log("vertical collision");
			this.player.y = collMoveY;
		}
	}
};

Game.prototype.draw = function(){
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.background.draw(this.ctx);
	for(var i = 0;i < this.objects.length;i++){
		this.objects[i].draw(this.ctx);
	}
	for(var i= 0;i<this.shots.length;i++){
		this.shots[i].draw(this.ctx);
	}
	this.player.draw(this.ctx);
};