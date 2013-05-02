function Eventhandler(_thisCan, _thisGame){
	this._thisGame = _thisGame; //can be solved better?
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
	console.log("right click"+e.clientX+";"+e.clientY);
	e.preventDefault();
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
};

Eventhandler.prototype.keyUp = function(e){
	console.log("up "+e.keyCode+" "+String.fromCharCode(e.keyCode).toLowerCase());
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
	this.down[strVal] = false;
};
