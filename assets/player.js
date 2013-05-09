function Player(x, y){
	this.boundary = x;
	this.x = x/6;
	this.y = y/2;
	this.width = 60;
	this.height = 100;
	this.frame = 0;
	this.shiftXA = 301; this.shiftXB = 95;
	this.shiftYA = 386; this.shiftYB = 192;
	
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
Player.prototype.im.src = "assets/images/player.png";

Player.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.shiftXA, this.shiftYA, this.shiftXB, this.shiftYB,
							this.x, this.y, this.width, this.height);
};

Player.prototype.updateStand = function(){
	this.updFrame(true);
};
Player.prototype.updateLeft = function(){
	this.x -= this.speed;
	this.updFrame(false);
};

Player.prototype.updateRight = function(){
	this.x += this.speed;
	this.updFrame(false);
};

Player.prototype.updFrame = function(standState){
	if(this.jumping){
		this.frame = 0;
		this.upd(2, 2, 87, 168);
	}
	else if(standState){
		this.frame = 0;
		this.upd(559, 2, 85, 190);
	}
	else{
		this.frame++;
		switch(Math.floor((this.frame/5)%9)+1){
			case 1: this.upd(301, 386, 95, 192); break;
			case 2: this.upd(570, 194, 115, 190); break;
			case 3: this.upd(398, 386, 133, 192); break;
			case 4: this.upd(155, 194, 147, 190); break;
			case 5: this.upd(785, 386, 127, 194); break;
			case 6: this.upd(127, 582, 135, 198); break;
			case 7: this.upd(264, 582, 111, 200); break;
			case 8: this.upd(2, 582, 123, 198); break;
			case 9: this.upd(533, 386, 115, 192); break;
		}
	}
};
Player.prototype.upd = function(a, b, c, d){
	this.shiftXA = a;
	this.shiftYA = b;
	this.shiftXB = c;
	this.shiftYB = d;
};

Player.prototype.beginJump = function(){
	console.log("begin jump");
	this.jumping = true;
	this.jumpEnergy = 1/this.gravity;
};
Player.prototype.endJump = function(){
	console.log("end jump");
	this.jumping = false;
	this.jumpEnergy = 0;
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