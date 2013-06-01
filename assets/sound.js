function Sound(){
	this.normal = false; //bg music playing
}
Sound.prototype.init = function(){
	this.normal = true;
	this.explore.play();
};
Sound.prototype.stop = function(){
	this.explore.pause();
	this.battle.pause();
};
Sound.prototype.swap = function(){
	if(this.normal){
		this.normal = false;
		this.explore.pause();
		this.battle.play();
	}
	else{
		this.normal = true;
		this.battle.pause();
		this.battle.currentTime = 0;
		this.explore.play();
	}
};
Sound.prototype.explore = new Audio("assets/sounds/explore.mp3");
Sound.prototype.explore.volume = 0.9;

Sound.prototype.battle = new Audio("assets/sounds/battle.mp3");
Sound.prototype.battle.volume = 0.6;

Sound.prototype.explosion = new Audio("assets/sounds/explosion.mp3");
Sound.prototype.explosion.volume = 0.9;
Sound.prototype.explode = function(){
	this.explosion.play();
};

Sound.prototype.shot = new Audio("assets/sounds/shot.mp3");
Sound.prototype.shot.volume = 0.9;
Sound.prototype.shoot = function(){
	this.shot.play();
};

Sound.prototype.wood = new Audio("assets/sounds/wood.mp3");
Sound.prototype.wood.volume = 0.9;
Sound.prototype.woodCrack = function(){
	this.wood.play();
};



