function Eventhandler(offset, player){
	this.player = player;
	this.offset = offset;
	console.log(offset.left+" "+offset.top);
	this.down = {};
	
	var _this = this;
	document.addEventListener("contextmenu", function(event){event.preventDefault();}); //cancel
	
	document.addEventListener("mousedown", function(event){_this.mouseDown(event);}); //down any
	document.addEventListener("mouseup", function(event){_this.mouseUp(event);}); //up any
	
	document.addEventListener("keydown", function(event){_this.keyDown(event);});
	document.addEventListener("keyup", function(event){_this.keyUp(event);});
}

Eventhandler.prototype.mouseDown = function(e){
	e.preventDefault();
	var x = e.clientX; x -= this.offset.left;
	var y = e.clientY; y -= this.offset.top;
	if(e.which == 1){//left down
		console.log("left down "+e.which+" "+x+";"+y);
	}
	else{ //right down
		console.log("right down "+e.which+" "+x+";"+y);
	}
};
Eventhandler.prototype.mouseUp = function(e){
	e.preventDefault();
	var x = e.clientX; x -= this.offset.left;
	var y = e.clientY; y -= this.offset.top;
	if(e.which == 1){ //left up
		console.log("left up "+e.which+" "+x+";"+y);
	}
	else{ //right up
		console.log("right up "+e.which+" "+x+";"+y);
	}
};

Eventhandler.prototype.keyDown = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = true;
	
	if(strVal == "w" && !this.player.jumping){
		if(this.player.crouching){ //crouching
			this.player.checkEndCrouch = true;
		}
		else{ //standing
			this.player.beginJump();
		}
	}
	if(strVal == "s" && !this.player.jumping && !this.player.crouching){
		this.player.beginCrouch();
	}
};

Eventhandler.prototype.keyUp = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = false;
};
