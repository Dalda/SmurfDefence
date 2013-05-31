function Grenade(x, y, nx, ny){
	this.x = x;
	this.y = y;
	this.speed = 5;
	this.size = 10;
	this.vx = 0;
	this.vy = 0;

	this.timeToExplode = 180;
}
Grenade.prototype.im = new Image();
Grenade.prototype.im.src = "grenade.png";   //bude se tocit - sprite
Grenade.prototype.draw = function(ctx){
	ctx.drawImage(this.im, this.x, this.y, this.size, this.size);
}

Grenade.prototype.init = function(nx, ny, facingR){            //kopie stejne funkce v Shot.js
	console.log(this.x+";"+this.y+";"+nx+";"+ny+"; "+facingR);
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
