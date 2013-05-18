function Shot(x, y, nx, ny){
	this.x = x;
	this.y = y;
	this.angle = this.initAngle(x, y, nx, ny);
	this.speed = 6;
	this.size = 5;
}
Shot.prototype.initAngle = function(x, y, nx, ny){
	var fx = nx-x;
	var fy = y-ny;
	var vys;
	if(fx < 0)
		vys = Math.atan((y-ny)/(nx-x))+Math.PI;
	else
		vys = Math.atan((y-ny)/(nx-x));
	return vys;
};
Shot.prototype.draw = function(ctx){
	ctx.fillStyle = "#00FFFF";
	ctx.fillRect(this.x, this.y, this.size, this.size);
};
Shot.prototype.update = function(){
	this.y -= this.speed*Math.sin(this.angle);
	this.x += this.speed*Math.cos(this.angle);
};
Shot.prototype.collide = function(objects, width, height){
	if(this.x <= 0 || this.x > width || this.y <= 0 || this.y > height-50) return true;

	for(var i=0;i<objects.length;i++){
		var ox = objects[i].x;var oxS = objects[i].width;
		var oy = objects[i].y;var oyS = objects[i].height;
		if(this.x > ox && this.x < ox+oxS && this.y > oy && this.y < oy+oyS) return true;
	}
	return false;
};
