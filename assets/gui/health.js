function Health(width, height){
	this.width = width;
	this.height = height;
	this.health = 80;
}
Health.prototype.update = function(h){
	this.health = h;
};
Health.prototype.draw = function(ctx){
	ctx.fillStyle = "#000000";
	ctx.fillRect(35, 30, 100*2, 20);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(35, 30, this.health*2, 20);
	ctx.strokeStyle = "#FFFF00";
	var o = 1;
	ctx.beginPath();
	ctx.rect(35-o, 30-o, 100*2+2*o, 20+2*o);
	ctx.closePath();
	ctx.stroke();
};
