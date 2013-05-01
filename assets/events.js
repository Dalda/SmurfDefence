function registerEvents(_thisCan, _thisGame){
	_thisCan.onclick = function(){leftClick(event, _thisGame);};
	//return false for not showing context menu (browser default)
	_thisCan.oncontextmenu = function(){rightClick(event);return false;}; 
}

function leftClick(e, _thisGame){
	console.log("left click");
	if(!_thisGame.stopped){
		_thisGame.stopped = true;
	}
	else{
		_thisGame.startGame();
	}
}
function rightClick(e){
	console.log("right click");
}
