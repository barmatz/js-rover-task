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