/** barmatz.rover.ObstacleModel **/
window.barmatz.rover.ObstacleModel = function(x, y, width, height)
{
	barmatz.rover.CellObjectModel.call(this, barmatz.rover.ObstacleModel.OBSTACLE, x, y);
	
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