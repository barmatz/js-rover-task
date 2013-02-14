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