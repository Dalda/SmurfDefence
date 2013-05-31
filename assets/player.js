function Player(x, y){
	this.boundary = x;
	this.x = x/6;
	this.y = y/2;
	//62x120 je uvnitr obrazku
	this.ratio = 0.6;
	this.width = 62*this.ratio;  //actual
	this.height = 120*this.ratio;

	this.frameL = -1;
	this.frameR = -1;
	this.frameSpeed = 2; this.frameSpeedNow = 0;
	this.facingR = true; // jakym smerem se diva
	this.shiftS = 128;
	this.shiftX = 0; this.shiftY = 0;
	
	this.collTolerance = 10; //collision tolerance, when the collision is detected in Game
	
	this.health = 100;
	this.speed = 2.4;
	this.jumping = false;
	this.jumpEnergy = 0; //pro simulaci skokové křivky
	this.gravity = 0.2; //tvar skokové křivky
	
	this.fallSpeed = 0; //půl křivka pro padání z krabic, něco jako jumpEnergy
						//falling třeba na začátku
			
}
Player.prototype.im = new Image();
Player.prototype.im.src = "assets/images/smurfL.png";
Player.prototype.draw = function(ctx){
	ctx.fillRect(this.x-5, this.y-5, 10, 10);
	ctx.drawImage(this.im, this.shiftX, this.shiftY, this.shiftS, this.shiftS,
							this.x-35*this.ratio, this.y-4*this.ratio, this.shiftS*this.ratio, this.shiftS*this.ratio); //-35 je jen zde, nikoli u kolizeChecků
};
Player.prototype.update = function(left, right, objects){
	if(this.jumping){
		this.y -= this.jumpEnergy;
		this.jumpEnergy -= this.gravity;
	}
	else if(!this.onGround(objects)){ //not touching ground	//when NOT JUMPING
		console.log("falling");
		this.fallSpeed += this.gravity;
		this.y += this.fallSpeed;
	}
	else{ //touching ground
		this.fallSpeed = 0; //v tuto chvili uz nepada
	}

	//move
	if((left && right) || (!left && !right)){
		this.updFrame(false, false);
	}
	else if(left) this.updateLeft();
	else if(right) this.updateRight();

	this.collisions(objects);
};

Player.prototype.updateLeft = function(){
	this.x -= this.speed;
	this.updFrame(true, false);
};

Player.prototype.updateRight = function(){
	this.x += this.speed;
	this.updFrame(false, true);
};

Player.prototype.updFrame = function(left, right){
	if(!left && !right){
		this.frameL = -1;
		this.frameR = -1;
		if(this.facingR) this.upd(3*this.shiftS, 0);
		else this.upd(0, 4*this.shiftS);
	}
	else{
		if(left){
			if(++this.frameSpeedNow%this.frameSpeed == 0){
				this.frameL = (this.frameL+1)%16;
			}
			this.upd(this.shiftS*(3-((this.frameL+3)%4)), (4*this.shiftS)+this.shiftS*(((Math.floor((this.frameL+3)/4))%4)));
		}
		else if(right){
			if(++this.frameSpeedNow%this.frameSpeed == 0){
				this.frameR = (this.frameR+1)%16;
			}
			this.upd(this.shiftS*((this.frameR+3)%4), this.shiftS*(((Math.floor((this.frameR+3)/4))%4)));
		}
	}
};
Player.prototype.upd = function(x, y){
	this.shiftX = x;
	this.shiftY = y;
};

Player.prototype.beginJump = function(){
	this.jumping = true;
	this.jumpEnergy = 1/this.gravity;
};
Player.prototype.endJump = function(){
	this.jumping = false;
	this.jumpEnergy = 0;
};

Player.prototype.collisions = function(objects){
	//x collisions
	var collMoveX = this.collideHorizontal(objects);
	var collX = collMoveX !== this.x;
	if(collX){
		if(Math.abs(collMoveX-this.x) < this.collTolerance){
			console.log("horizonatal collision");
			this.x = collMoveX;
		}
	}
	//y collisions
	var collMoveY = this.collideVertical(objects);
	var collY = collMoveY !== this.y;
	if(collY){
		if(Math.abs(collMoveY-this.y) < this.collTolerance){
			console.log("vertical collision");
			this.y = collMoveY;
		}
	}
};

//collision functions return coords where to move
//pozici kde bude na kolidujici objekt tesne nalepen
Player.prototype.collideHorizontal = function(objects){
	if(this.x < 0) return 0;
	else if(this.x > this.boundary-this.width){
		return this.boundary-this.width;
	}
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