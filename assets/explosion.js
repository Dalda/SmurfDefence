function Explosion(x, y){
	this.x = x;
	this.y = y;
	this.init();
}
Explosion.prototype.init = function(){
	alert("init exploze");
};
