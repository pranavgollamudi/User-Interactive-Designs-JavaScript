
var width = 700;
var	height = 450;

// append svg for bar chart
var barchart = d3.select("body")
	.append("svg")
	.attr("width", width + 50)
	.attr("height", height);

var idArr = [0, 1, 2, 3, 4];
// define the x axis map
var x = d3.scale.ordinal()
	.domain(idArr)
	.rangePoints([0, width],1);
// define the y axis map
var y = d3.scale.linear()
	.domain([100, 0])
	.range([0, height]);

var draggingObject = {};  // variable to store the current dragging object
var RectHeight = [55, 30, 80, 70,  90];

var g = barchart.selectAll(".bar") // append group element
	.data(idArr)
	.enter().append("g")
	.attr("class", "bar")
	.attr("transform", function(d) { return "translate(" + x(d)  + ", " + 0  + " )"; })   // translate to proper position of x axis
	.call(d3.behavior.drag()
	    .origin(function(d) { 
	    	return {x: x(d)}; }) 
	    .on("dragstart", function(d) {
			draggingObject[d] = x(d);  // store the current drag object's x position
	    })
	    .on("drag", function(d) {
	      	draggingObject[d] = Math.min(width, Math.max(0, d3.event.x));  // store current cursor x position
	      	idArr.sort(function(a, b) { return getPos(a) - getPos(b); }); // sort the rect index array by it's position
	      	x.domain(idArr); // reset the domain for x map
	      	g.attr("transform", function(d) {    // rearrange the rectangles 
	    		return "translate(" + getPos(d) + "," + 0  + ")"; })
	    })
	    .on("dragend", function(d) {
	      	delete draggingObject[d];  // delete current dragging object
	      	d3.select(this).attr("transform", "translate(" + x(d)  + ", " + 0  +  ")").transition().duration(500); // place this rectangle to new position
	    })
	);

g.append("rect")       // this append rectangle to each group element
.attr("y", function(d) { 
	return y(RectHeight[d]); })
.attr("height", function(d) { 
	return height  - y(RectHeight[d]); })
.attr("width", height/RectHeight.length);

// this function is used to get the new position when draggin is in progress.
function getPos(d) {
  	if (draggingObject[d] == null) {
  		return x(d);
  	}
  	else
  	{
  		return draggingObject[d];
  	}
}
