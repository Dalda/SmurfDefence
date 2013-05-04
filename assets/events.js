function Eventhandler(_thisCan, _thisGame, _thisPlayer){
	this._thisGame = _thisGame; //can be solved better?
	this._thisPlayer = _thisPlayer;
	
	this.down = {};
	
	var _this = this;
	
	_thisCan.addEventListener("contextmenu", function(event){_this.rightClick(event);}); //right
	
	_thisCan.addEventListener("mousedown", function(event){_this.mouseDown(event);}); //down any
	_thisCan.addEventListener("mouseup", function(event){_this.mouseUp(event);}); //up any
	
	document.addEventListener("keydown", function(event){_this.keyDown(event);});
	document.addEventListener("keyup", function(event){_this.keyUp(event);});
	//why keyup and keydown doesn't work for single element (canvas)?
}

Eventhandler.prototype.rightClick = function(e){
	e.preventDefault();
	console.log("right click"+e.clientX+";"+e.clientY);
};

Eventhandler.prototype.mouseDown = function(e){
	e.preventDefault();
	if(e.which == 1){//left down
		console.log("left down "+e.which+" "+e.type+" "+e.clientX+" "+e.clientY);
	}
	else{ //right down
		console.log("right down "+e.which+" "+e.type+" "+e.clientX);
	}
};
Eventhandler.prototype.mouseUp = function(e){
	e.preventDefault();
	if(e.which == 1){ //left up
		console.log("left up "+e.which+" "+e.type+" "+e.clientX+" "+e.clientY);
	}
	else{ //right up
		console.log("right up "+e.which+" "+e.type+" "+e.clientX+" "+e.clientY);
	}
};

Eventhandler.prototype.keyDown = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	this.down[strVal] = true;
	
	if(strVal == "s" && !this._thisPlayer.crouching && !this._thisPlayer.jumping){
		this._thisPlayer.beginCrouch();
	}
	
	if(strVal == "w" && !this._thisPlayer.jumping){
		this._thisPlayer.beginJump();
	}
};

Eventhandler.prototype.keyUp = function(e){
	var strVal = String.fromCharCode(e.keyCode).toLowerCase();
	if(strVal == "p"){ //p - pause
		if(!this._thisGame.stopped){
			this._thisGame.stopped = true;
		}
		else{
			this._thisGame.startGame();
		}
		return;
	}
	if(strVal == "s" && this._thisPlayer.crouching){ 
		this._thisPlayer.endCrouch();
	}
	this.down[strVal] = false;
};
