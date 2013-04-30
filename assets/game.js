function Game(){ 
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = $(window).width();
	this.canvas.height = $(window).height();

	this.fps = 60;
	this.interval = false;
	
	this.init = function(){
		console.log(document.body);
		document.body.appendChild(this.canvas);
		this.interval = setInterval(this.run(), 1000/this.fps);
	};
	
	this.draw = function(){
		this.ctx.fillRect(0, 0, 100, 100);
	}
	this.update = function(){
		//
	};
	this.run = function(){
		this.update();
		this.draw();
	};
};
