/** barmatz.rover.TestController **/
window.barmatz.rover.TestController = function(gridModel, roverModel, obstacleCollection, canvas, moveButton, rotateCWButton, rotateCCWButton)
{
	var _this = this;

	barmatz.mvc.Controller.call(this);
	
	this.gridModel = gridModel;
	this.roverModel = roverModel;
	this.obstacleCollection = obstacleCollection;
	this.canvasContext = canvas.getContext('2d');
	
	gridModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onGridModelValueChanged);
	roverModel.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, onRoverModelValueChanged);
	window.addEventListener('keydown', onWindowKeyDown);
	moveButton.addEventListener('click', onMoveButtonClick);
	rotateCWButton.addEventListener('click', onRotateCWButtonClick);
	rotateCCWButton.addEventListener('click', onRotateCCWButtonClick);
	
	drawCanvas();
	
	function drawCanvas()
	{
		barmatz.rover.CanvasManager.draw(_this.canvasContext, _this.gridModel.rows, _this.gridModel.cols, _this.obstacleCollection, _this.roverModel);
	}
	
	function rotateRoverCCW()
	{
		_this.roverModel.rotateCCW();
	}
	
	function rotateRoverCW()
	{
		_this.roverModel.rotateCW();
	}
	
	function moveRover()
	{
		_this.roverModel.move();
	}
	
	function onWindowKeyDown(event)
	{
		switch(event.keyCode)
		{
			case 37:
				rotateRoverCCW();
				break;
			case 38:
				moveRover();
				break;
			case 39:
				rotateRoverCW();
				break;
		}
	}
	
	function onMoveButtonClick(event)
	{
		moveRover();
	}
	
	function onRotateCCWButtonClick(event)
	{
		rotateRoverCCW();
	}
	
	function onRotateCWButtonClick(event)
	{
		rotateRoverCW();
	}
	
	function onGridModelValueChanged(event)
	{
		switch(event.key)
		{
			case 'numCols':
			case 'numRows':
			case 'numObstacles':
				drawCanvas();
				break;
		}
	}
	
	function onRoverModelValueChanged(event)
	{
		switch(event.key)
		{
			case 'x':
			case 'y':
				if(event.key == 'x')
					restrictValue(event.target, event.key, event.value, 0, _this.gridModel.cols - 1, event.oldValue);
				else if(event.key == 'y')
					restrictValue(event.target, event.key, event.value, 0, _this.gridModel.rows - 1, event.oldValue);
			case 'rotation':
				drawCanvas();
				break;
		}
		
		function restrictValue(target, key, value, minValue, maxValue, oldValue)
		{
			var occupied = false;
			
			if(value < minValue || value > maxValue)
				target[key] = Math.between(value, minValue, maxValue);
			
			obstacleCollection.each(function(model, index, collection)
			{
				if(model.x == target.x && model.y == target.y)
					occupied = true;
			});
			
			if(occupied)
				target[key] = oldValue;
		}
	}
};

barmatz.rover.TestController.prototype = new barmatz.mvc.Controller();
barmatz.rover.TestController.prototype.constructor = barmatz.rover.TestController;