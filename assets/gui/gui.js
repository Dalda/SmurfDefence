function GUI(width, height){  //canvas
	this.width = width;
	this.height = height;
	this.elements ={"health": new Health(width, height),
					"towerhealth": new TowerHealth(width, height),
					"wavebutton": new WaveButton(width, height)};
}
GUI.prototype.update = function(mx, my, h, wn, th){
	this.elements["wavebutton"].updateHover(mx, my);
	this.elements["wavebutton"].updateNumber(wn);
	this.elements["towerhealth"].update(th);
	this.elements["health"].update(h);
};
GUI.prototype.draw = function(ctx){
	for(var el in this.elements){
		this.elements[el].draw(ctx);
	}
};
