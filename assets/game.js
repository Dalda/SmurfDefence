function Game(){
	this.canvas = document.createElement("canvas");
	this.width = 1000;
	this.height = 500;
	this.ctx = this.canvas.getContext("2d");
	
	this.objects = [];
	this.shots = [];
	this.shootingLock = false;
	this.explosions = [];
	this.bombActive = false; //only one bomb object at once
	this.bombLock = false;

	this.interval = false;
	this.stopped = true;
	this.loader = new Loader(this.width, this.height);
	this.sound = new Sound();
	this.player = new Player(this.width, this.height);

	this.offset = false; //initialized in init()
	this.down = {}; //both keys and mouse click
	this.mouseX;
	this.mouseY;

	var _this = this;
	document.addEventListener("contextmenu", function(event){event.preventDefault();}); //cancel

	document.addEventListener("mousedown", function(event){_this.mouseDown(event);}); //down any
	document.addEventListener("mouseup", function(event){_this.mouseUp(event);}); //up any
	document.addEventListener("mousemove", function(event){_this.mouseMove(event);}); //move

	document.addEventListener("keydown", function(event){_this.keyDown(event);});
	document.addEventListener("keyup", function(event){_this.keyUp(event);});
}

Game.prototype.init = function(){
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	document.body.appendChild(this.canvas);
	this.offset = $(this.canvas).offset();

	this.loader.loadObjects(this.objects);
	this.sound.init();
	this.stopped = false;
	var _this = this;
	this.interval = window.setInterval(function(){_this.run(_this)}, 1000/60);
};

Game.prototype.run = function(_this){ //_this is actual game variable
	//meanwhile processing player input
	_this.update();
	_this.draw();
};

Game.prototype.update = function(){
	this.player.update(this.down["a"], this.down["d"], this.objects);
	this.updateShots();
	this.updateBomb();
	this.updateExplosions();
};

Game.prototype.updateShots = function(){
	if(!this.shootingLock && this.down["leftdown"]){
		var shotNew = new Shot(this.player.x, this.player.y);
		shotNew.init(this.mouseX, this.mouseY, this.player.facingR);
		this.shots.push(shotNew);
		this.shootingLock = true;
		var _this = this;
		window.setTimeout(function(){_this.shootingLock = false;}, 300);
	}
	for(var i=0;i<this.shots.length;){
		this.shots[i].update();
		if(this.shots[i].collide(this.objects, this.width, this.height)){  //collisions check
			this.shots[i].explode(this.explosions);
			this.sound.shoot();
			this.shots.splice(i, 1);
		}
		else i++;
	}
};
Game.prototype.updateBomb = function(){
	if(this.bombActive){
		this.bombActive.update();
		if(this.bombActive.collide(this.objects, this.width, this.height) //collision check
		   || this.bombActive.timeToExplode <= 0){
			this.bombActive.explode(this.explosions);
			this.sound.explode();
			this.bombActive = false;
		}
	}
};
Game.prototype.updateExplosions = function(){
	for(var i=0;i<this.explosions.length;i++){
		this.explosions[i].update();
		if(this.explosions[i].end()){
			this.explosions.splice(i, 1);
		}
		else i++;
	}
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
	for(var i=0;i<this.explosions.length;i++){
		this.explosions[i].draw(this.ctx);
	}
};

Game.prototype.mouseMove = function(e){
	e.preventDefault();
	var x = e.pageX; x -= this.offset.left;
	var y = e.pageY; y -= this.offset.top;
	this.mouseX = x+15; //15 kvuli velikost kursoru
	this.mouseY = y+15;
};
Game.prototype.mouseDown = function(e){
	e.preventDefault();
	if(e.which == 1){//left down
		this.down["leftdown"] = true;
	}
	else{ //right down
		this.down["rightdown"] = true;
		if(!this.bombLock){
			var bombNew = new Bomb(this.player.x, this.player.y);
			bombNew.init(this.mouseX, this.mouseY, this.player.facingR);
			this.bombActive = bombNew;
			this.bombLock = true;
			var _this = this;
			window.setTimeout(function(){_this.bombLock = false;}, 3000); //3sec
		}
	}
};
Game.prototype.mouseUp = function(e){
	e.preventDefault();
	if(e.which == 1){ //left up
		this.down["leftdown"] = false;
	}
	else{ //right up
		this.down["rightdown"] = false;
	}
};

Game.prototype.keyDown = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = true;
	if(strVal == "a") this.player.facingR = false;
	else if(strVal == "d") this.player.facingR = true;
	else if(strVal == "w" && !this.player.jumping && this.player.fallSpeed == 0){
		this.player.beginJump();
	}
};

Game.prototype.keyUp = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = false;
	if(strVal == "o"){
		console.log("Swap music");
		this.sound.swap();
	}
	else if(strVal == "p"){
		console.log("Game stopped");
		this.stopped = true;
		this.sound.stop();
		window.clearInterval(this.interval);
	}
};
