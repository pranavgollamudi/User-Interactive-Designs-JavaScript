
var RectHeight = [55, 30, 80, 70,  90];
var width = 500;
var	height = 300;


var xScale = d3.scale.ordinal() // x scale map function
	.domain([0, 1, 2, 3, 4])
	.rangePoints([0, width],1);

var yScale = d3.scale.linear()  // y scale map function
	.domain([100, 0])
	.range([0, height]);

var svg = d3.select("body")  // append a svg element
	.append("svg")
	.attr("width", width + 50)
	.attr("height", height);

var g = svg.selectAll(".bar") 
	.data([0, 1, 2, 3, 4])
	.enter().append("g")
	.attr("id", function(d){
		return 'bar' + d;   // assign the id to each group
	})
	.attr("transform", function(d) { return "translate(" + xScale(d)  + ", " + 0  + " )"; }) // translate this group 
	.on('dblclick', function(d){
		console.log(d);
		
		var idString = d3.select(this).attr("id");  // get the current selected bar's id
		var id1 = parseInt(idString.charAt(3)); // get the id number of this bar
		var temp1 = d3.select("#bar" + (id1 - 1)).attr("transform");  // get the transform of preceding bar 
		var temp2 = d3.select(this).attr("transform");  // get the transform of current selected bar
		console.log(d3.select(this).attr("id"));
		// this exchanges the transform of current bar and preceding bar
		d3.select("#bar" + (id1 - 1)).attr("transform", temp2).transition().duration(700).attr("id", "bar" + id1);
		d3.select(this).attr("transform", temp1).transition().duration(700).attr("id", "bar" + (id1 - 1));
	});
	
// this append the rectangles
g.append("rect")
.attr("y", function(d) { 
	return yScale(RectHeight[d]); })
.attr("height", function(d) { 
	return height  - yScale(RectHeight[d]); })
.attr("width", height/RectHeight.length);


