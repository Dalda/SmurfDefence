function Throwing(x, y, size, speed){
	//interface for Shot and Bomb
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.vx = 0;
	this.vy = 0;
}

Throwing.prototype.init = function(nx, ny, facingR){
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

Throwing.prototype.collide = function(objects, width, height){
	var lessB = this instanceof Shot;
	if(lessB && this.bounces <= 0) return true; //uz moc odrazu, asi pomale

	if(this.x+this.size < 0 || this.x > width) return true;

	if(this.y+this.size > height-50){ //ground
		this.y = height-50-this.size;
		this.vy = -Math.abs(this.vy);
		this.vy *= 0.7;
		if(lessB) this.bounces--;
		return false;
	}

	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x; var oxS = objects[i].width;
		var oy = objects[i].y; var oyS = objects[i].height;
		if(this.x+this.size > ox && this.x < ox+oxS && this.y+this.size > oy && this.y < oy+oyS){
			console.log("ted");
			var midx = this.x+this.size/2;
			var midy = this.y+this.size/2;
			var leva = Math.abs(midx-ox);  var prava = Math.abs(midx-(ox+oxS));
			var horni = Math.abs(midy-oy); var dolni = Math.abs(midy-(oy+oyS));
			if(Math.min(leva, prava) < Math.min(horni, dolni)){ //priletel z prava nebo leva
				if(leva) this.x = ox-this.size;
				else this.x = ox+oxS;
				this.vx = -this.vx;
			}
			else{ //priletel s hora nebo dola
				if(horni) this.y = oy-this.size;
				else this.y = oy+oyS;
				this.vy = -this.vy;
			}
			if(lessB) this.bounces--;
		}
	}
	return false;
};

