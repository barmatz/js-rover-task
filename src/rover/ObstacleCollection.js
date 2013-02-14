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