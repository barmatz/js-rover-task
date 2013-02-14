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