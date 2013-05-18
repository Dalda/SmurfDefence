function Eventhandler(offset, player){
	this.player = player;
	this.offset = offset;
	console.log(offset.left+" "+offset.top);
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

Eventhandler.prototype.mouseMove = function(e){
	e.preventDefault();
	var x = e.clientX; x -= this.offset.left;
	var y = e.clientY; y -= this.offset.top;
	this.mouseX = x;
	this.mouseY = y;
};
Eventhandler.prototype.mouseDown = function(e){
	e.preventDefault();
	if(e.which == 1){//left down
		this.down["leftdown"] = true;
	}
	else{ //right down
		this.down["rightdown"] = true
	}
};
Eventhandler.prototype.mouseUp = function(e){
	e.preventDefault();
	if(e.which == 1){ //left up
		this.down["leftdown"] = false;
	}
	else{ //right up
		this.down["rightdown"] = false;
	}
};

Eventhandler.prototype.keyDown = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = true;
	if(strVal == "a") this.player.lastDirection = "l";   //for player frame
	else if(strVal == "d") this.player.lastDirection = "r";
	else if(strVal == "w" && !this.player.jumping && this.player.fallSpeed == 0){
		this.player.beginJump();
	}
};

Eventhandler.prototype.keyUp = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = false;
};
