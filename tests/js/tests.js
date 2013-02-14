test('events', 4, function()
{
	var valueA = 1,
		valueB = 2,
		key = 'x',
		model = new barmatz.rover.CellObjectModel(barmatz.rover.CellObjectModel.EMPTY, valueA, valueA);

	model.addEventListener(barmatz.events.ModelEvent.VALUE_CHANGED, function(event)
	{
		ok(event.target == model, 'event target property is correct');
		ok(event.key == key, 'event key property is correct');
		ok(event.oldValue == valueA, 'event oldValue property is correct');
		ok(event.value == valueB, 'event value property is correct');
	});
	model[key] = valueB;
});
test('rover.CellObjectModel', function()
{
	var x = 1,
		y = 2,
		type = barmatz.rover.CellObjectModel.EMPTY,
		model = new barmatz.rover.CellObjectModel(type, x, y);
	
	ok(model.type == type, 'type property was set correctly');
	ok(model.x == x, 'x property was set correctly');
	ok(model.y == y, 'y property was set correctly');
});
test('rover.GridModel', function()
{
	var rows = 1,
		cols = 2,
		model = new barmatz.rover.GridModel(rows, cols);
	
	ok(model.rows == rows, 'rows property was set correctly');
	ok(model.cols == cols, 'cols property was set correctly');
});
test('rover.ObstacleCollection', function()
{
	var count = 10,
		collection = new barmatz.rover.ObstacleCollection(count);
	
	ok(collection.count == count, 'right amount of elements where added to the collection');
});
test('rover.ObstacleModel', function()
{
	var x = 1,
		y = 2,
		width = 3,
		height = 4,
		model = new barmatz.rover.ObstacleModel(x, y, width, height),
		points = model.points;
	
	ok(model.width == width, 'width property was set correctly');
	ok(model.height == height, 'height property was set correctly');
	ok(model.points == points, 'points property has not changed and is fixed');
	ok(model.points != null, 'points property is not null');
	ok(model.points.length > 0, 'object has points');
});
test('rover.RoverModel', function()
{
	var x = 1,
		y = 2,
		rotation = 3,
		model = new barmatz.rover.RoverModel(x, y);
	
	ok(model.rotation = rotation, 'rotation property was set correctly');
	model.rotateCW();
	ok(model.rotation == rotation + 90, 'object rotated CW');
	model.rotateCCW();
	ok(model.rotation == rotation, 'object rotated CCW');
	model.move();
	ok(model.y < y, 'object has moved up');
	model.rotateCW();
	model.move();
	ok(model.x > x, 'object has moved right');
	model.rotateCW();
	model.move();
	ok(model.y == y, 'object has moved down');
	model.rotateCW();
	model.move();
	ok(model.x == x, 'object has moved left');
});