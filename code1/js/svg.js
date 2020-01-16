
var Rects = [65, 30, 80, 70,  20]; // this is the height array of rectangles

var width = 700;
var	height = 450;

var firstObject = -1;

var barx = d3.scale.ordinal()   // define the x scale
	.domain(d3.range(5))
	.rangePoints([0, width],1);

var bary = d3.scale.linear()  // define the y scale
	.domain([100, 0])
	.range([0, height]);

var svg = d3.select("body")  // create svg object
	.append("svg")
	.attr("width", width + 50)
	.attr("height", height);

var g = svg.selectAll(".bar")  // create 5 group for each rect and add the translate attributes
	.data(d3.range(5))
	.enter().append("g")
	.attr("id", function(d){
		return 'bar' + d;
	})
	.attr("transform", function(d) { return "translate(" + barx(d)  + ", " + 0  + " )"; });

	
g.append("rect")      // append the rect object to each group 
.attr("id", function(d){
	return 'rect' + d;
})
.attr("y", function(d) { 
	return bary(Rects[d]); })
.attr("height", function(d) { 
	return height  - bary(Rects[d]); })
.attr("width", height/Rects.length)
.on('click', function(d){

	if (firstObject == -1) {
		firstObject = d;
		d3.select(this).classed("onHover", true);     // set the css class on this rect to hightlight the rect
	}
	else 
	{
		if(firstObject == d)
		{
			firstObject = -1;
			d3.select(this).classed("onHover", false);  // remove the css class on first rect to hightlight the rect
		}
		else
		{
			d3.select(this).classed("onHover", true);    // set the css class on this rect to hightlight the rect

			var h1 = d3.select("#rect" + firstObject).attr('height');     // get the height of rectangle which is selected first
			var h2 = d3.select(this).attr('height');         // get the height of rectangle which is selected second

			var y1 = d3.select("#rect" + firstObject).attr('y');        // get the y value of rectangle which is selected first
			var y2 = d3.select(this).attr('y');   // get the y value of rectangle which is selected second

			// this code exchange the y and height value of selected two rectangles to show the exchange animation
			d3.select("#rect" + firstObject).transition().duration(700).attr('y', y2).attr('height', h2);
			d3.select(this).transition().duration(700).attr('y', y1).attr('height', h1);


			d3.select("#rect" + firstObject).classed("onHover", false);  // reset the highlight css of the first rectangle
			d3.select(this).classed("onHover", false);        // reset the highlight css of the second rectangle
			firstObject = -1;  
		}
	}
	
});

