function Throwing(x, y, size, speed){
	//interface for Shot and Bomb
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.vx = 0;
	this.vy = 0;
}

Throwing.prototype.init = function(nx, ny, facingR, accuracy){
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

Throwing.prototype.collide = function(objects, gameWidth, height){    //return true-> delete/explode
	var lessB = this instanceof Shot;
	if(lessB && this.bounces <= 0) return true; /* uz moc odrazu, asi pomale */

	if(this.x+this.size < 0 || this.x > gameWidth) return true;

	if(this.y+this.size > height-50){ /* ground */
		this.y = height-50-this.size;
		this.vy = -Math.abs(this.vy);
		this.vy *= 0.75;
		if(lessB) this.bounces--;
		return false;
	}

	for(var i=1;i<objects.length;i++){ /* od indexu 1, tedy bez ground */
		var ox = objects[i].x; var oxS = objects[i].xSize;
		var oy = objects[i].y; var oyS = objects[i].ySize;
		if(this.x+this.size > ox && this.x < ox+oxS && this.y+this.size > oy && this.y < oy+oyS){ /* inside */
		  	/* bounce from boxes*/
			var tmx =  this.x+this.size/2;	var tmy = this.y+this.size/2;
			var ar = new Array();
			ar.push({name:"leftS", val: Math.abs(tmx-ox)}, {name:"rightS", val: Math.abs(tmx-(ox+oxS))},
				{name: "upS", val: Math.abs(tmy-oy)}, {name: "downS", val: Math.abs(tmy-(oy+oyS))});
			ar.sort(function(a, b){ return a.val- b.val});
			/*ke ktere strane to je nejbliz? */
			var closest = ar[0].name;
			switch(closest){
				case "leftS":
					this.x = ox-this.size;
					this.vx = -Math.abs(this.vx); //abs jen pro jistotu
					break;
				case "rightS":
					this.x = ox+oxS;
					this.vx = Math.abs(this.vx); //kladne poleti zpet doprava
					break;
				case "upS":
					this.y = oy-this.size;
					this.vy = -Math.abs(this.vy);
					break;
				case "downS":
					this.y = oy+oyS;
					this.vy = Math.abs(this.vy);
					break;
			}
			if(lessB) this.bounces--;
		}
	}
	return false;
};

