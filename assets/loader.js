function Loader(){
	//zkus pouzit onu knihovnu s fyzikou?
	
}
Loader.prototype.loadObjects = function(objects){ //jak se muzu dostat k parent variable objects?
	//every objects has to have x, y, width, height - for collision check
	objects.push(new Ground(0, 450, 1000, 50)); 
	objects.push(new Box(700, 400, 50, 50));
	objects.push(new Box(500, 150, 100, 100));
	objects.push(new Box(820, 340, 100, 50));
};

