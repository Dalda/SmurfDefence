function TowerHealth(width, height){
	this.width = width;
	this.height = height;
	this.health;
}
TowerHealth.prototype.update = function(th){
	this.health = th;
};
TowerHealth.prototype.draw = function(ctx){
	ctx.fillStyle = "#000000";
	ctx.fillRect(35, 30, 100*2, 20);
	ctx.fillStyle = "#1BC43A";
	ctx.fillRect(35, 30, this.health*2/100, 20);
	ctx.strokeStyle = "#FFFF00";
	var o = 1;
	ctx.beginPath();
	ctx.rect(35-o, 30-o, 100*2+2*o, 20+2*o);
	ctx.closePath();
	ctx.stroke();
};
