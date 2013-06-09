function Waves(npcs, gW, height){
	this.gameWidth = gW;
	this.height = height;
	this.waveNum = 0;
	this.waveActive = false;
	this.npcs = npcs;
	this.timer = 0;
	this.interval = false;
}
Waves.prototype.next = function(){
	if(this.waveActive) return;

	this.waveActive = true;
	this.waveNum++;
	this.startWave();
};
Waves.prototype.startWave = function(){
	this.timer = 0;
	var _this = this;
	switch(this.waveNum){
		case 1: /*prvni vlna nepřátel */
			this.interval = window.setInterval(function(){_this.wave1(_this)}, 2000);
			break;
		case 2:
			this.interval = window.setInterval(function(){_this.wave2(_this)}, 2000);
			break;
		default: console.log("trouble");

	}

};
Waves.prototype.wave1 = function(_this){
	_this.timer++;
	this.npcs.push(new NPC(_this.gameWidth-100, _this.height/2, 'pawn'));
	if(_this.timer == 2){
		_this.waveActive = false;
		window.clearInterval(_this.interval);
	}
};
Waves.prototype.wave2 = function(_this){
	_this.timer++;
	this.npcs.push(new NPC(_this.gameWidth-100, _this.height/2, 'sprinter'));
	if(_this.timer == 4){
		_this.waveActive = false;
		window.clearInterval(_this.interval);
	}
};
