/** barmatz.rover.Test **/
window.barmatz.rover.Test = function(){};

Object.defineProperties(barmatz.rover.Test, 
{
	init: {value: function(canvas, rows, cols, numObstacles)
	{
		var grid, rover, obstacles, controller;
		
		rows = Math.between(rows, 5, 20);
		cols = Math.between(cols, 5, 20);
		numObstacles = Math.between(numObstacles, 1, 5);
		
		obstacles = new barmatz.rover.ObstacleCollection(numObstacles);
		grid = new barmatz.rover.GridModel(rows, cols);
		rover = new barmatz.rover.RoverModel(0, 0);
		controller = new barmatz.rover.TestController(grid, rover, obstacles, canvas, document.getElementById('moveButton'), document.getElementById('rotateCWButton'), document.getElementById('rotateCCWButton'));
	}}
});
