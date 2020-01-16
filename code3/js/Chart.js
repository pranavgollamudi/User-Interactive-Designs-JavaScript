
var BarArr = [55, 110, 80, 140,  90];
var numArray = [0, 1, 2, 3, 4];
var svgwidth = 500;
var	height = 400;

// x scale
var x = d3.scale.ordinal().domain(numArray).rangePoints([0, svgwidth],1);
// y scale
var y = d3.scale.linear().domain([180, 0]).range([0, height]);

var curselectedBar = null; // current selected rectangle


// append svg element
var chart = d3.select(".svg_chart")
	.append("svg")
	.attr("width", svgwidth + 50)
	.attr("height", height);

// append  5 group
var g = chart.selectAll(".bar")
	.data(numArray)
	.enter().append("g")
	.attr("id", function(d){
		return 'bar' + d;
	})
	.attr("transform", function(d) { return "translate(" + x(d)  + ", " + 0  + " )"; })
	
	.on("click", function(d){
		curselectedBar = d3.select(this);  // store current selected rectangle bar when the mouse is clicked on this element
	});

// append rectangles to each group bar
g.append("rect")
	.attr("id", function(d){
		return 'rect' + d;
	})
	.attr("y", function(d) { 
		return y(BarArr[d]); })
	.attr("height", function(d) { 
		return height  - y(BarArr[d]); })
	.attr("width", height/BarArr.length)
	.on("click", function(d){
		d3.selectAll("rect").classed("hightlight", false);   // remove all rectangle's hightlight class
		d3.select(this).classed("hightlight", !d3.select(this).classed("hightlight"));  // toggle current rectangle's hightligh
	});

// add listener of key event to body element
var body = d3.select("body");
var p = body
  .on("keydown", function() {
  	
    if(d3.event.keyCode === 37){   // when the left arrow key is pressed
    
    	if (curselectedBar == null) {  // if there is no selected bar
    		return;
    	}
    	var idString = curselectedBar.attr("id");
		var idnum = parseInt(idString.charAt(3));
		if (idnum == 0) {
			return;
		}
		var transform1 = d3.select("#bar" + (idnum - 1)).attr("transform"); // get the transforme
		var transform2 = curselectedBar.attr("transform"); // get the transform of current bar
		
		d3.select("#bar" + (idnum - 1)).attr("transform", transform2).transition().duration(500).attr("id", "bar" + idnum); // set this transform with the second transform
		curselectedBar.attr("transform", transform1).transition().duration(500).attr("id", "bar" + (idnum - 1)); // set this transfrom with before bar transform
    }
    else if(d3.event.keyCode === 39){  // when the right arrow key is pressed
    
    	if (curselectedBar == null) {
    		return;
    	}
    	var idString = curselectedBar.attr("id");
		var idnum = parseInt(idString.charAt(3));
		if (idnum == 4) {
			return;
		}
		var transform1 = d3.select("#bar" + (idnum + 1)).attr("transform"); // get the transforme
		var transform2 = curselectedBar.attr("transform"); // get the transform of current bar
		// set this transform with the second transform
		d3.select("#bar" + (idnum + 1)).attr("transform", transform2).transition().duration(500).attr("id", "bar" + idnum);
		curselectedBar.attr("transform", transform1).transition().duration(500).attr("id", "bar" + (idnum + 1)); // set this transfrom with before bar transform
    }
  
  })