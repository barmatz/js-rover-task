/** barmatz.rover.CanvasManager **/
window.barmatz.rover.CanvasManager = function()
{
	this._obstaclesSet = false;
};

Object.defineProperties(barmatz.rover.CanvasManager,
{
	clear: {value: function(context)
	{
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}},
	draw: {value: function(context, rows, cols, obstacles, rover)
	{
		var cellWidth = context.canvas.width / cols, 
			cellHeight = context.canvas.height / rows;
		
		if(!this._obstaclesSet)
		{
			this.setObstacles(obstacles, rows, cols, cellWidth, cellHeight);
			this._obstaclesSet = true;
		}
		
		this.clear(context);
		this.drawGrid(context, rows, cols, cellWidth, cellHeight);
		this.drawObstacles(context, obstacles, cellWidth, cellHeight);
		this.drawRover(context, rover, cellWidth, cellHeight);
	}},
	reset: {value: function(context)
	{
		this.clear();
		this._obstaclesSet = false;
	}},
	setObstacles: {value: function(obstacles, rows, cols, width, height)
	{
		var rowsCollection = [],
			colsCollection = [];
		
		while(rows--)
			rowsCollection.push(rows);

		while(cols--)
			colsCollection.push(cols);
		
		rowsCollection.splice(rowsCollection.length - 1, 1);
		colsCollection.splice(colsCollection.length - 1, 1);
		
		obstacles.each(function(model, index, collection)
		{
			model.x = removeRandomElementFromArray(colsCollection);
			model.y = removeRandomElementFromArray(rowsCollection);
			model.width = width;
			model.height = height;
		});
		
		function removeRandomElementFromArray(array)
		{
			return array.shuffle().splice(array.length - 1, 1)[0];
		}
	}},
	drawGrid: {value: function(context, rows, cols, width, height)
	{
		var x, y, i, c;
		
		for(i = 0; i < rows; i++)
		{
			for(c = 0; c < cols; c++)
			{
				x = i * width;
				y = c * height;
				context.strokeRect(x, y, width, height);
			}
		}
	}},
	drawRover: {value: function(context, model, width, height)
	{
		var x = model.x * width,
			y = model.y * height,
			rotation = model.rotation;
		
		context.fillStyle = '#00F';
		context.beginPath();
		
		switch(rotation)
		{
			case 0:
				context.moveTo(x, y + height);
				context.lineTo(x + width, y + height);
				context.lineTo(x + (width / 2), y);
				break;
			case 90:
				context.moveTo(x, y);
				context.lineTo(x + width, y + (height / 2));
				context.lineTo(x, y + height);
				break;
			case 180:
				context.moveTo(x, y);
				context.lineTo(x + (width / 2), y + height);
				context.lineTo(x + width, y);
				break;
			case 270:
				context.moveTo(x + width, y);
				context.lineTo(x, y + (height / 2));
				context.lineTo(x + width, y + height);
				break;
		}

		context.fill();
		context.fillStyle = '#000';
	}},
	drawObstacles: {value: function(context, collection)
	{
		context.fillStyle = '#F00';
		context.beginPath();
		
		collection.each(function(model, index, collection)
		{
			var point, lineInitiated, method, i;
			
			for(i = 0; i < model.points.length; i++)
			{
				point = model.points[i];
				
				if(!lineInitiated)
				{
					method = context.moveTo;
					lineInitiated = true;
				}
				else
				{
					method = context.lineTo;
				}
				
				method.call(context, (model.x * model.width) + point.x, (model.y * model.height) + point.y);
			}
		});
		
		context.fill();
		context.fillStyle = '#000';
	}}
});