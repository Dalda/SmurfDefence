function Shot(x, y){
	Throwing.call(this, x+20, y+30, 4, Math.random()*3+7); //constructor

	this.bounces = 5; //vydrzi 5 odrazu od zeme
}
Shot.prototype = Object.create(Throwing.prototype);

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

