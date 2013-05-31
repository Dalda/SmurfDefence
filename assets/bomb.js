function Bomb(x, y){
	this.x = x;
	this.y = y;
	this.speed = 5;
	this.size = 20;
	this.vx = 0;
	this.vy = 0;

	this.timeToExplode = 400;
}
Bomb.prototype.im = new Image();
Bomb.prototype.im.src = "assets/images/bomb.png";
Bomb.prototype.draw = function(ctx){
	console.log("ok");
	ctx.drawImage(this.im, this.x, this.y, this.size, this.size);
}

Bomb.prototype.init = function(nx, ny, facingR){            //kopie stejne funkce v Shot.js
	var angle = 0;
	if(facingR){ //kouka se doprava
		if(nx < this.x+45){ //mys vlevo
			nx = this.x+45;
		}
		angle = Math.atan((this.y-ny)/(nx-this.x));
		this.vx = this.speed*Math.cos(angle);
	}
	else{                    //left face
		if(nx > this.x-45){ //mys vpravo
			nx = this.x-45;
		}
		angle = Math.atan((this.y-ny)/(this.x-nx));
		this.vx = -this.speed*Math.cos(angle);
	}
	this.vy = -this.speed*Math.sin(angle);
};

Bomb.prototype.update = function(){
	this.timeToExplode--;
	this.y += this.vy;
	this.x += this.vx;
	this.vy += 0.1;
	this.vy *= 0.99;
	this.vx *= 0.99;
};

Bomb.prototype.collide = function(){
	//
};
