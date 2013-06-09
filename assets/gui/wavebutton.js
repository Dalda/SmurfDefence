function WaveButton(width, height){
	this.x = 30;
	this.y = height-35;
	this.xSize = 100;
	this.ySize = 30;
	this.hover = false;
	this.wavenum = 0;
}
WaveButton.prototype.updateHover = function(mx, my){
	if(this.x <= mx && this.x+this.xSize >= mx && this.y <= my && this.y+this.ySize >= my){
		this.hover = true;
	}
	else{
		this.hover = false;
	}
};
WaveButton.prototype.updateNumber = function(wn){
	this.wavenum = wn;
};
WaveButton.prototype.draw = function(ctx){
	ctx.fillStyle = "#0099FF";
	ctx.font = "20px Arial";
	ctx.fillText("Vlna: "+this.wavenum, this.x+this.xSize+10, this.y+this.ySize-10);
	if(this.hover){
		ctx.fillStyle = "#FF0000";
	}
	ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
	ctx.fillStyle = "#000000";
	ctx.fillText("Další vlna", this.x+10, this.y+this.ySize-10);
};
