function Player(x, y){      /* x, y = souradnice v cele game (0 - treba 2000) */
	this.x = x;  /* na techto souradnicich by ze zacatku nemelo nic byt */
	this.y = y;
	//62x120 je uvnitr obrazku
	this.ratio = 0.6;
	this.xSize = 62*this.ratio;  //actual
	this.ySize = 120*this.ratio;

	this.frameL = -1; this.frameR = -1;
	this.frameSpeed = 2; this.frameSpeedNow = 0;
	this.shiftS = 128;
	this.shiftX = 0; this.shiftY = 0;

	this.facingR = true; // jakym smerem se diva

	this.collTolerance = 10; //collision tolerance, when the collision is detected in Game

	this.shotPower = 3;   //3   bacha at to neprolitava skrz krabice
	this.shotAccuracy = 0.3;
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
Player.prototype.update = function(left, right, objects, gW){
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
	else if(left){
		this.x -= this.speed;
		this.updFrame(true, false);
	}
	else if(right){
		this.x += this.speed;
		this.updFrame(false, true);
	}

	this.collisions(objects, gW);
};

Player.prototype.updFrame = function(left, right){
	if(!left && !right){
		this.frameL = -1;
		this.frameR = -1;
		if(this.facingR){
			this.shiftX = 3*this.shiftS;
			this.shiftY = 0;
		}
		else{
			this.shiftX = 0;
			this.shiftY = 4*this.shiftS;
		}
	}
	else{
		if(left){
			if(++this.frameSpeedNow%this.frameSpeed == 0){
				this.frameL = (this.frameL+1)%16;
			}
			this.shiftX = this.shiftS*(3-((this.frameL+3)%4));
			this.shiftY = (4*this.shiftS)+this.shiftS*(((Math.floor((this.frameL+3)/4))%4));
		}
		else if(right){
			if(++this.frameSpeedNow%this.frameSpeed == 0){
				this.frameR = (this.frameR+1)%16;
			}
			this.shiftX = this.shiftS*((this.frameR+3)%4);
			this.shiftY = this.shiftS*(((Math.floor((this.frameR+3)/4))%4));
		}
	}
};

Player.prototype.beginJump = function(){
	this.jumping = true;
	this.jumpEnergy = 1/this.gravity;
};
Player.prototype.endJump = function(){
	this.jumping = false;
	this.jumpEnergy = 0;
};

Player.prototype.collisions = function(objects, gW){  /* objects, gameWidth */
	//x collisions
	var collMoveX = this.collideHorizontal(objects, gW);
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

/*vrati pozici kde bude na kolidujici objekt tesne nalepen */
Player.prototype.collideHorizontal = function(objects, gW){   /* gameWidth, hracova x nesmi jit do zaporu */
	if(this.x < 0) return 0;
	else if(this.x+this.xSize > gW){
		return gW-this.xSize;
	}
	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].xSize;
		var oy = objects[i].y;var oyS = objects[i].ySize;
		if(ox > this.x && ox < this.x+this.xSize){ //x collision test
			if(oy-this.ySize < this.y && oy+oyS > this.y){ //y collision test
				return (ox-this.xSize); //collision -left side of the object
			}
		}
		if(ox+oxS > this.x && ox+oxS < this.x+this.xSize){ //x collision test
			if(oy-this.ySize < this.y && oy+oyS > this.y){ //y collision test
				return (ox+oxS); //collision -right side of the object
			}
		}
	}
	return this.x; //stay where you were
};
Player.prototype.collideVertical = function(objects){	
	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].xSize;
		var oy = objects[i].y;var oyS = objects[i].ySize;
		if(ox-this.xSize < this.x && ox+oxS > this.x){ //x collision test
			if(oy > this.y && oy < this.y+this.ySize){ //y collision test
				if(this.jumping){
					this.endJump(); //player landed
				}
				return (oy-this.ySize); //collision -top side of the object
			}
		}
		if(ox-this.xSize < this.x && ox+oxS > this.x){ //x collision test
			if(oy+oyS > this.y && oy+oyS < this.y+this.ySize){ //y collision test
				return (oy+oyS); //collision -bottom side of the object
			}
		}
	}
	return this.y;
};

Player.prototype.onGround = function(objects){ /*top side collision test s y+1 pro kontrolu, ze je pod nim uz objekt */
	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].xSize;var oy = objects[i].y;

		if(ox-this.xSize < this.x && ox+oxS > this.x){ //x collision test
			if(oy > this.y+1 && oy < this.y+1+this.ySize){ //y collision test
				return true; //on the ground
			}
		}
	}
	return false; //no ground collision
};