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