function Eventhandler(offset, player){
	this.player = player;
	this.offset = offset;
	console.log(offset.left+" "+offset.top);
	this.down = {}; //both keys and mouse clicks
	
	var _this = this;
	document.addEventListener("contextmenu", function(event){event.preventDefault();}); //cancel
	
	document.addEventListener("mousedown", function(event){_this.mouseDown(event);}); //down any
	document.addEventListener("mouseup", function(event){_this.mouseUp(event);}); //up any
	
	document.addEventListener("keydown", function(event){_this.keyDown(event);});
	document.addEventListener("keyup", function(event){_this.keyUp(event);});
}
function Point(x, y){
	this.x = x;
	this.y = y;
}

Eventhandler.prototype.mouseDown = function(e){
	e.preventDefault();
	var x = e.clientX; x -= this.offset.left;
	var y = e.clientY; y -= this.offset.top;
	if(e.which == 1){//left down
		this.down["leftup"] = false;
		this.down["leftdown"] = new Point(x, y);
		console.log("left down "+x+";"+y);
	}
	else{ //right down
		this.down["rightup"] = false;
		this.down["rightdown"] = new Point(x, y);
		console.log("right down "+e.which+" "+x+";"+y);
	}
};
Eventhandler.prototype.mouseUp = function(e){
	e.preventDefault();
	var x = e.clientX; x -= this.offset.left;
	var y = e.clientY; y -= this.offset.top;
	if(e.which == 1){ //left up
		this.down["leftup"] = new Point(x, y);
		console.log("left up "+e.which+" "+x+";"+y);
	}
	else{ //right up
		this.down["rightup"] = new Point(x, y);
		console.log("right up "+e.which+" "+x+";"+y);
	}
};

Eventhandler.prototype.keyDown = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = true;
	
	if(strVal == "w" && !this.player.jumping){
		this.player.beginJump();
	}
};

Eventhandler.prototype.keyUp = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = false;
};
