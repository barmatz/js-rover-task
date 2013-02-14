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

