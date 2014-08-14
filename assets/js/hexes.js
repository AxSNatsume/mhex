// Sample from https://www.dashingd3js.com/table-of-contents

var radius = 20;
var grid = [
    {x:1, y:1, c: 'green'}
    , {x:2, y:1, c: 'green'}
    , {x:3, y:1, c: 'yellow'}

    , {x:1, y:2, c: 'green'}
    , {x:2, y:2, c: 'yellow'}
    , {x:3, y:2, c: 'red'}

    , {x:1, y:3, c: 'red'}
    , {x:2, y:3, c: 'green'}
    , {x:3, y:3, c: 'green'}
    , {x:0, y:3, c: 'green'}

	, {x:1, y:4} 
];

var lines = 20;
var cols = 30;
var grid = [];

/* colors map for random colorization */
var colors = [
	'lime'
	, 'royalblue'
	, 'navy'
	, 'yellow'
	, 'silver'
	, 'darkgreen'
	, 'red'
	, 'purple'
	, 'SaddleBrown'
];

for (var line = 1; line <= lines; line++) {
	for (var col = 1; col <= cols; col++) {
		var color = Math.round(Math.random() * (colors.length -1));
		console.log(color);
		grid.push({
			x: col - Math.floor(0.5 * (line-1))
			, y: line
			, c: colors[color]
		});
	}
}




var svgContainer = d3.select('body').append('svg')
    .attr('width', 1220)
    .attr('height', 610)
    //.style('border', '1px solid white');

var cells = svgContainer
	.append('g')
	.selectAll('.cell')
    .data(grid)
    .enter()
    .append('path')
	.attr('class', 'cell');

var cellsAttributes = cells
	.attr('d', function(d) {
		if (!d.r || d.r > 1) {d.r = 1;}
		return 'M' + (d.r * radius * -1) + ' ' + (d.r * radius * -0.5)
			+ 'L' + (d.r * radius * 0) + ' ' + (d.r * radius * -1)
			+ 'L' + (d.r * radius * 1) + ' ' + (d.r * radius * -0.5)
			+ 'L' + (d.r * radius * 1) + ' ' + (d.r * radius * 0.5)
			+ 'L' + (d.r * radius * 0) + ' ' + (d.r * radius * 1)
			+ 'L' + (d.r * radius * -1) + ' ' + (d.r * radius * 0.5)
			+ 'Z'
		;
	})
	.attr('transform', function(d) {
		return 'translate'
			+ ' (' + (radius + (d.x -1) * 2*radius + radius*(d.y -1))
			+ ',' + (radius + (d.y -1) * 1.5*radius)
			+ ')';
	})
    .style('fill', function(d) {
		return d.c||'white'; 
	})
	.style('stroke', 'white')
	.style('stroke-width', '1');
