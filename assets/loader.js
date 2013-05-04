function Loader(){
	//zkus pouzit onu knihovnu s fyzikou?
	
}
Loader.prototype.loadObjects = function(objects){ //jak se muzu dostat k parent variable objects?
	//every objects has to have x, y, width, height - for collision check
	objects.push(new Box(0, 400, 1000, 100, "#0FA833")); //ground
	objects.push(new Box(700, 350, 50, 50, "#875624")); //ordinary box
	objects.push(new Box(500, 100, 100, 100, "#875624"));
	objects.push(new Box(830, 300, 100, 50, "#875624"));
};

