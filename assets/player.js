function Player(x, y){
	this.x = x;
	this.y = y;
	this.width = 60;
	this.height = 100;
	this.collTolerance = 10; //collision tolerance, when the collision is detected in Game
	
	this.health = 100;
	this.speed = 3;
	this.crouching = false; //crouching not allowed while jumping
	this.checkEndCrouch = false; //used during game.update
	this.jumping = false; //jump allowed when crouched
	this.jumpEnergy = 0; //pro simulaci skokové křivky
	this.gravity = 0.2; //tvar skokové křivky
	
	this.fallSpeed = 0; //půl křivka pro padání z krabic, něco jako jumpEnergy
						//falling třeba na začátku
			
}

Player.prototype.draw = function(ctx){
	ctx.fillStyle = "#802FA1";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.beginJump = function(){
	console.log("begin jump");
	if(this.crouching){
		this.endCrouch();
	}
	this.jumping = true;
	this.jumpEnergy = 1/this.gravity;
};
Player.prototype.endJump = function(){
	console.log("end jump");
	this.jumping = false;
	this.jumpEnergy = 0;
};
Player.prototype.beginCrouch = function(){
	console.log("begin crouch");
	this.crouching = true;
	this.y += this.height/2;
	this.height /= 2;
};

Player.prototype.endCrouch = function(){
	console.log("end crouch");
	this.crouching = false;
	this.height *= 2;
	this.y -= this.height/2;
};

//collision functions return coords where to move
//pozici kde bude na kolidujici objekt tesne nalepen
Player.prototype.collideHorizontal = function(objects){
	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].width;
		var oy = objects[i].y;var oyS = objects[i].height;
		if(ox > this.x && ox < this.x+this.width){ //x collision test
			if(oy-this.height < this.y && oy+oyS+this.height > this.y+this.height){ //y collision test
				return (ox-this.width); //collision -left side of the object
			}
		}
		if(ox+oxS > this.x && ox+oxS < this.x+this.width){ //x collision test
			if(oy-this.height < this.y && oy+oyS+this.height > this.y+this.height){ //y collision test
				return (ox+oxS); //collision -right side of the object
			}
		}
	}
	return this.x; //stay where you were
};
Player.prototype.collideVertical = function(objects){	
	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].width;
		var oy = objects[i].y;var oyS = objects[i].height;
		if(ox-this.width < this.x && ox+oxS+this.width > this.x+this.width){ //x collision test
			if(oy > this.y && oy < this.y+this.height){ //y collision test
				if(this.jumping){
					this.endJump(); //player landed
				}
				return (oy-this.height); //collision -top side of the object
			}
		}
		if(ox-this.width < this.x && ox+oxS+this.width > this.x+this.width){ //x collision test
			if(oy+oyS > this.y && oy+oyS < this.y+this.height){ //y collision test
				return (oy+oyS); //collision -bottom side of the object
			}
		}
	}
	return this.y;
};

Player.prototype.onGround = function(objects){ //top side collision test
	// with y+1 for checking if there is ground underneath
	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].width;
		var oy = objects[i].y;var oyS = objects[i].height;
		if(ox-this.width < this.x && ox+oxS+this.width > this.x+this.width){ //x collision test
			if(oy > this.y+1 && oy < this.y+1+this.height){ //y collision test
				return true; //on the ground
			}
		}
	}
	return false; //no ground collision
};