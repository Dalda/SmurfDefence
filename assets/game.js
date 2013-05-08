function Game(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 1000;
	this.height = 500;
	
	this.objects = [];
	
	this.fps = 60;
	this.interval = false;
	this.stopped = true;
	this.loader = new Loader();
	this.player = new Player(this.width/6, this.height/2);
	this.eventhandler;
	//maybe Eventhandler should be main object with Game as a member variable
	//ask Kukas...
}

Game.prototype.init = function(){
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	document.body.appendChild(this.canvas);
	
	this.eventhandler =  new Eventhandler($(this.canvas).offset(), this.player);
	this.loader.loadObjects(this.objects);
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
	
	if(_this.eventhandler.down["p"]){
		_this.stopped = true;
		window.clearInterval(this.interval);
		console.log("stopped");
	}
};

Game.prototype.update = function(){	
	if(this.player.jumping){
		this.player.y -= this.player.jumpEnergy;
		this.player.jumpEnergy -= this.player.gravity;
	}
	else if(!this.player.onGround(this.objects)){ //not touching ground
		//when NOT JUMPING
		console.log("falling");
		this.player.fallSpeed += this.player.gravity; 
		this.player.y += this.player.fallSpeed;
	} 
	else{ //touching ground
		this.player.fallSpeed = 0; //v tuto chvili uz nepada
	}
	
	
	if(this.eventhandler.down["a"]){
		this.player.x -= this.player.speed;
	}
	if(this.eventhandler.down["d"]){
		this.player.x += this.player.speed;
	}
	//x collisions
	var collMoveX = this.player.collideHorizontal(this.objects);
	if(Math.abs(collMoveX-this.player.x) < this.player.collTolerance){
		if(collMoveX !== this.player.x) console.log("horizonatal collision");
		this.player.x = collMoveX;
	}
	//y collisions
	if(this.player.checkEndCrouch){
		this.player.endCrouch(); //temporarily
	}
	var collMoveY = this.player.collideVertical(this.objects);
	if(this.player.checkEndCrouch){ 
		if(collMoveY != this.player.y){ //cannot end crouch
			this.player.beginCrouch(); //temp changes back
		}
		this.player.checkEndCrouch = false;
	}			
	if(Math.abs(collMoveY-this.player.y) < this.player.collTolerance){
		if(collMoveY !== this.player.y) console.log("vertical collision");
		this.player.y = collMoveY;
	}
};

Game.prototype.draw = function(){
	//getImageData and putImageData is expensive
	//try having many canvases and redraw only changes (only certain canvases)
	this.ctx.fillStyle = "#F0AA4F";
	this.ctx.fillRect(0, 0, this.width, this.height);
	for(var i = 0;i < this.objects.length;i++){
		this.objects[i].draw(this.ctx);
	}
	this.player.draw(this.ctx);
};