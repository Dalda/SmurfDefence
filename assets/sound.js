function Sound(){
	this.normal = false; //bg music playing
}
Sound.prototype.mBG = new Audio("assets/sounds/explore.mp3");
Sound.prototype.mBG.volume = 0.9;
Sound.prototype.mBG.ended = function(){
	this.pause();
	this.currentTime = 0;
	this.play();
};
Sound.prototype.mBattle = new Audio("assets/sounds/battle.mp3");
Sound.prototype.mBattle.volume = 0.6;
Sound.prototype.mBattle.ended = function(){
	this.pause();
	this.currentTime = 0;
	this.play();
};

Sound.prototype.init = function(){
	this.normal = true;
	this.mBG.play();
};
Sound.prototype.stop = function(){
	this.mBG.pause();
	this.mBattle.pause();
}
Sound.prototype.swap = function(){
	if(this.normal){
		this.normal = false;
		this.mBG.pause();
		this.mBattle.play();
	}
	else{
		this.normal = true;
		this.mBattle.pause();
		this.mBattle.currentTime = 0;
		this.mBG.play();
	}
};


