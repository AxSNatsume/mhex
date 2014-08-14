// Sample from https://www.dashingd3js.com/table-of-contents

var radius = 20;
var grid = [
    {x:1, y:1, r:1, c: 'green'}
    , {x:2, y:1, r:0.5, c: 'green'}
    , {x:3, y:1, r:1, c: 'yellow'}
    , {x:1, y:2, r:0.8, c: 'green'}
    , {x:2, y:2, r:1, c: 'yellow'}
    , {x:3, y:2, r:1, c: 'red'}
    , {x:1, y:3, r:1, c: 'red'}
    , {x:2, y:3, r:1, c: 'green'}
    , {x:3, y:3, r:1, c: 'green'}
    , {x:0, y:3, r:1, c: 'green'}
];

var svgContainer = d3.select('body').append('svg')
    .attr('width', 1000)
    .attr('height', 600)
    .style('border', '1px solid white');

var cells = svgContainer
	.append('g')
	.selectAll('.cell')
    .data(grid)
    .enter()
    .append('path')
	.attr('class', 'cell');

var cellsAttributes = cells
	.attr('d', function(d) {
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
    .style('fill', function(d) {return d.c; })
	.style('stroke', 'white')
	.style('stroke-width', '1');
