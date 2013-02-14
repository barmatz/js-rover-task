/** namespaces **/
window.barmatz = {
	events: {},
	iterator: {},
	mvc: {},
	rover: {}
};
/** array **/
Object.defineProperties(Array.prototype, 
{
	shuffle: {value: function()
	{
		for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
		return this;
	}}
});
/** barmatz.events.Event **/
window.barmatz.events.Event = function(type)
{
	this._type = type;
};

Object.defineProperties(barmatz.events.Event.prototype,
{
	target: {get: function()
	{
		return this._target;
	}},
	type: {get: function()
	{
		return this._type;
	}},
	clone: {value: function(type)
	{
		var event = new barmatz.events.Event(type);
		event._target = this.target;
		return event;
	}},
	formatToString: {value: function(className)
	{
		var parameters = [], i;
		
		arguments = Array.prototype.slice.call(arguments);
		
		for(i = 1; i < arguments.length; i++)
			parameters.push(arguments[i] + '=' + this[arguments[i]]);
		
		return '[' + className + '(' + parameters.join(', ') + ')]';
	}},
	toString: {value: function()
	{
		return this.formatToString('Event', 'type');
	}}
});
/** barmatz.events.EventDispatcher **/
window.barmatz.events.EventDispatcher = function()
{
	this._listeners = {};
};

Object.defineProperties(barmatz.events.EventDispatcher.prototype, 
{
	addEventListener: {value: function(type, listener)
	{
		if(typeof type != 'string')
			throw new TypeError('type is not a String');
		
		if(typeof listener != 'function')
			throw new TypeError('listener is not a Function');
		
		if(!this._listeners[type])
			this._listeners[type] = [];
		
		this._listeners[type].push(listener);
	}},
	dispatchEvent: {value: function(event)
	{
		var i, c;
		
		if(!(event instanceof barmatz.events.Event))
			throw new TypeError('event is not an Event object');
		
		event._target = this;
		
		for(i in this._listeners)
		{
			if(i === event.type)
				for(c in this._listeners[i])
					this._listeners[i][c](event);
		}
	}},
	hasEventListener: {value: function(type)
	{
		return this._listeners[type] ? true : false;
	}},
	removeEventListener: {value: function(type, listener)
	{
		var i;
		
		if(this._listeners[type])
		{
			for(i = 0; i < this._listeners[type].length; i++)
				if(this._listeners[type][i] === listener)
					this._listeners[type].splice(i, 1);
			
			if(this._listeners[type].length == 0)
				delete this._listeners[type];
		}
	}}
});

/** barmatz.events.ModelEvent **/
window.barmatz.events.ModelEvent = function(type)
{
	barmatz.events.Event.call(this, type);
	
	switch(type)
	{
		case barmatz.events.ModelEvent.VALUE_CHANGED:
			this._key = arguments[1];
			this._value = arguments[2];
			this._oldValue = arguments[3];
			break;
	}
};

barmatz.events.ModelEvent.prototype = new barmatz.events.Event();
barmatz.events.ModelEvent.prototype.constructor = barmatz.events.ModelEvent;

Object.defineProperties(barmatz.events.ModelEvent, 
{
	VALUE_CHANGED: {value: 'valueChanged'}
});
Object.defineProperties(barmatz.events.ModelEvent.prototype, 
{
	key: {get: function()
	{
		return this._key;
	}},
	value: {get: function()
	{
		return this._value;
	}},
	oldValue: {get: function()
	{
		return this._oldValue;
	}}
});
/** barmatz.iterator.ArrayCollection **/
window.barmatz.iterator.ArrayCollection = function()
{
	this._collection = [];
	this._iterator = new barmatz.iterator.ArrayIterator(this._collection);
};

Object.defineProperties(barmatz.iterator.ArrayCollection.prototype,
{
	iterator: {get: function()
	{
		return this._iterator;
	}},
	createIterator: {value: function()
	{
		return new barmatz.iterator.ArrayIterator(this._collection);
	}},
	count: {get: function()
	{
		return this._collection.length;
	}},
	append: {value: function(element)
	{
		this._collection[this._collection.length] = element;
		return true;
	}},
	remove: {value: function(element)
	{
		return false;
	}},
	each: {value: function(callback)
	{
		var iterator = this.createIterator(),
			i = 0;
		
		do
		{
			callback.call(this, iterator.currentElement(), i, this._collection);
			iterator.next();
			i++;
		}
		while(iterator.hasNext());
	}}
});
/** barmatz.iterator.ArrayIterator **/
window.barmatz.iterator.ArrayIterator = function(collection)
{
	this._cursor = 0;
	this._collection = collection;
};

Object.defineProperties(barmatz.iterator.ArrayIterator.prototype,
{
	next: {value: function()
	{
		this._cursor++;
	}},
	hasNext: {value: function()
	{
		return this._cursor < this._collection.length;
	}},
	reset: {value: function()
	{
		this._cursor = 0;
	}},
	currentElement: {value: function()
	{
		return this._collection[this._cursor];
	}}
});
/** math **/
Math.between = function(currentValue, minValue, maxValue)
{
	return Math.max(minValue, Math.min(currentValue, maxValue));
};
/** barmatz.mvc.Controller **/
window.barmatz.mvc.Controller = function()
{
	barmatz.events.EventDispatcher.call(this);
};

barmatz.mvc.Controller.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Controller.prototype.constructor = barmatz.mvc.Controller;
/** barmatz.mvc.Model **/
window.barmatz.mvc.Model = function()
{
	barmatz.events.EventDispatcher.call(this);
};

barmatz.mvc.Model.prototype = new barmatz.events.EventDispatcher();
barmatz.mvc.Model.prototype.constructor = barmatz.mvc.Model;

Object.defineProperties(barmatz.mvc.Model.prototype, 
{
	get: {value: function(key)
	{
		return this['_' + key];
	}},
	set: {value: function(key, value)
	{
		var oldValue = this['_' + key];
		
		this['_' + key] = value;
		this.dispatchEvent(new barmatz.events.ModelEvent(barmatz.events.ModelEvent.VALUE_CHANGED, key, value, oldValue));
	}}
});
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
/** barmatz.rover.CellObjectModel **/
window.barmatz.rover.CellObjectModel = function(type, x, y)
{
	barmatz.mvc.Model.call(this);
	
	this.set('type', type);
	this.set('x', x);
	this.set('y', y);
};

barmatz.rover.CellObjectModel.prototype = new barmatz.mvc.Model();
barmatz.rover.CellObjectModel.prototype.constructor = barmatz.rover.CellObjectModel;

Object.defineProperties(barmatz.rover.CellObjectModel, 
{
	EMPTY: {value: 'empty'}
}); 
Object.defineProperties(barmatz.rover.CellObjectModel.prototype, 
{
	type: {get: function()
	{
		return this.get('type');
	}},
	x: {get: function()
	{
		return this.get('x');
	}, set: function(value)
	{
		this.set('x', value);
	}},
	y: {get: function()
	{
		return this.get('y');
	}, set: function(value)
	{
		this.set('y', value);
	}}
});


/** barmatz.rover.GridModel **/
window.barmatz.rover.GridModel = function(rows, cols)
{
	barmatz.mvc.Model.call(this);
	
	this.set('rows', rows);
	this.set('cols', cols);
};

barmatz.rover.GridModel.prototype = new barmatz.mvc.Model();
barmatz.rover.GridModel.prototype.constructor = barmatz.rover.GridModel;

Object.defineProperties(barmatz.rover.GridModel.prototype, 
{
	rows: {get: function()
	{
		return this.get('rows');
	}, set: function(value)
	{
		this.set('rows', value);
	}},
	cols: {get: function()
	{
		return this.get('cols');
	}, set: function(value)
	{
		this.set('cols', value);
	}}
});
/** barmatz.rover.ObstacleCollection **/
window.barmatz.rover.ObstacleCollection = function(num)
{
	barmatz.iterator.ArrayCollection.call(this);
	
	while(num--)
	{
		this.append(new barmatz.rover.ObstacleModel(0, 0, 0, 0));
	}
};

barmatz.rover.ObstacleCollection.prototype = new barmatz.iterator.ArrayCollection();
barmatz.rover.ObstacleCollection.prototype.constructor = barmatz.rover.ObstacleCollection;
/** barmatz.rover.ObstacleModel **/
window.barmatz.rover.ObstacleModel = function(x, y, width, height)
{
	barmatz.rover.CellObjectModel.call(this, barmatz.rover.ObstacleModel.OBSTACL, x, y);
	
	this.set('width', width);
	this.set('height', height);
};

barmatz.rover.ObstacleModel.prototype = new barmatz.rover.CellObjectModel();
barmatz.rover.ObstacleModel.prototype.constructor = barmatz.rover.ObstacleModel;

Object.defineProperties(barmatz.rover.ObstacleModel,
{
	OBSTACLE: {value: 'obstacle'}
});
Object.defineProperties(barmatz.rover.ObstacleModel.prototype,
{
	points: {get: function()
	{
		var points = this.get('points'), 
			width = this.get('width'), 
			height = this.get('height'), 
			angle = 0;
		
		if(!points)
		{
			points = [];
			
			while(angle < 360)
			{
				angle = Math.min(angle + Math.floor(10 + Math.random() * 90), 360);
				radians = angle * Math.PI / 180;
				points.push({
					x: (width / 2) * Math.cos(radians) + (width / 2),
					y: (height / 2) * Math.sin(radians) + (height / 2)
				});
			}
			
			this.set('points', points);
		}
		
		return points;
	}},
	width: {get: function()
	{
		return this.get('width');
	}, set: function(value)
	{
		this.set('width', value);
		this.set('points', null);
	}},
	height: {get: function()
	{
		return this.get('height');
	}, set: function(value)
	{
		this.set('height', value);
		this.set('points', null);
	}}
});
/** barmatz.rover.RoverModel **/
window.barmatz.rover.RoverModel = function(x, y)
{
	barmatz.rover.CellObjectModel.call(this, barmatz.rover.RoverModel.ROVER, x, y);
	
	this.set('rotation', 0);
};

barmatz.rover.RoverModel.prototype = new barmatz.rover.CellObjectModel();
barmatz.rover.RoverModel.prototype.constructor = barmatz.rover.RoverModel;

Object.defineProperties(barmatz.rover.RoverModel,
{
	CW: {value: 'cw'},
	CCW: {value: 'ccw'},
	ROVER: {value: 'rover'}
}); 
Object.defineProperties(barmatz.rover.RoverModel.prototype, 
{
	rotation: {get: function()
	{
		return this.get('rotation');
	}, set: function(value)
	{
		this.set('rotation', value);
	}},
	rotateCW: {value: function()
	{
		this.rotate(barmatz.rover.RoverModel.CW);
	}},
	rotateCCW: {value: function()
	{
		this.rotate(barmatz.rover.RoverModel.CCW);
	}},
	rotate: {value: function(action)
	{
		var rotation = this.rotation;
		
		switch(action)
		{
			case barmatz.rover.RoverModel.CW:
				if(rotation < 270)
					rotation += 90;
				else
					rotation = 0;
				break;
			case barmatz.rover.RoverModel.CCW:
				if(rotation > 0)
					rotation -= 90;
				else
					rotation = 270;
				break;
		}

		this.set('rotation', rotation);
	}},
	move: {value: function()
	{
		var rotation = this.get('rotation');
		
		if(rotation >= 315 || rotation < 45)
			this.set('y', this.get('y') - 1);
		else if(rotation >= 45 && rotation < 135)
			this.set('x', this.get('x') + 1);
		else if(rotation >= 135 && rotation < 225)
			this.set('y', this.get('y') + 1);
		else if(rotation >= 225 && rotation < 315)
			this.set('x', this.get('x') - 1);
	}}
});
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
/** main **/
barmatz.rover.Test.init(document.getElementById('canvas'), 20, 20, 5);
