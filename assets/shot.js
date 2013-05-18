function Shot(x, y, nx, ny){
	this.x = x;
	this.y = y;
	this.angle = Math.atan2((ny-y), (nx-x));
	this.speed = Math.random()*10+3;
	this.size = 4;
	this.vx = this.speed*Math.cos(this.angle);
	this.vy = this.speed*Math.sin(this.angle);
	this.bounces = 5; //vydrzi 5 odrazy od zeme
}
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
		if(this.x > ox && this.x < ox+oxS && this.y > oy && this.y < oy+oyS) return true;
	}
	return false;
};
