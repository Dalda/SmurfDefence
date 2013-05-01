var game;

$(document).ready(function(){
	console.log($(window).height());
	console.log($(window).width());
	game = new Game();
	game.init();
});