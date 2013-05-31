function Shot(x, y){
	this.x = x+20;
	this.y = y+30;
	this.speed = Math.random()*3+7;
	this.size = 4;
	this.vx = 0;
	this.vy = 0;
	this.bounces = 5; //vydrzi 5 odrazy od zeme
}
Shot.prototype.init = function(nx, ny, facingR){
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

Shot.prototype.draw = function(ctx){
	ctx.fillStyle = "#00AAFF";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
};
Shot.prototype.update = function(){
	this.y += this.vy;
	this.x += this.vx;
	this.vy += 0.1;
	this.vy *= 0.99;
	this.vx *= 0.99;
};
Shot.prototype.collide = function(objects, width, height){
	if(this.bounces <= 0) return true; //uz moc odrazu, asi pomale

	if(this.x <= 0 || this.x > width || this.y <= 0) return true;
	if(this.y > height-50){
		this.y = height-50-this.size;
		this.vy = -Math.abs(this.vy);
		this.vy *= 0.7;
		this.bounces--;
		return false;
	}

	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].width;
		var oy = objects[i].y;var oyS = objects[i].height;
		if(this.x > ox && this.x < ox+oxS && this.y > oy && this.y < oy+oyS){
			var bncd = false;
			if((this.x<=ox && this.x+this.size*2 >= ox) || (this.x<=ox+oxS && this.x+this.size*2 >=ox+oxS)){
				bncd = true;
				this.vx = -this.vx;
			}
			if((this.y<=oy && this.y+this.size*2 >= oy) || (this.y<=oy+oyS && this.y+this.size*2 >=oy+oyS)){
				bncd = true;
				this.vy = -this.vy;
			}
			if(!bncd) return true;
			this.bounces--;
		}
	}
	return false;
};
