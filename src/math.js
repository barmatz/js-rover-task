/** math **/
Math.between = function(currentValue, minValue, maxValue)
{
	return Math.max(minValue, Math.min(currentValue, maxValue));
};