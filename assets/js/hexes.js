// Sample from https://www.dashingd3js.com/table-of-contents

var radius = 20;
var grid = [
    {x:1, y:1, type: 'grass'}
    , {x:2, y:1, type: 'grass'}
    , {x:3, y:1, type: 'sand'}

    , {x:1, y:2, type: 'grass'}
    , {x:2, y:2, type: 'sand'}
    , {x:3, y:2, type: 'lava'}

    , {x:1, y:3, type: 'lava'}
    , {x:2, y:3, type: 'grass'}
    , {x:3, y:3, type: 'forest'}
    , {x:0, y:3, type: 'grass'}

	, {x:1, y:4, type: 'creep'}
];

var lines = 20;
var cols = 30;
var grid = [];

var types = [
	'water'
	, 'ocean'
	, 'sand'
	, 'grass'
	, 'forest'
	, 'mountain'
	, 'snow'
	, 'rock'
	, 'lava'
	, 'creep'
];

for (var line = 1; line <= lines; line++) {
	for (var col = 1; col <= cols; col++) {
		var type = Math.round(Math.random() * (types.length -1));
		grid.push({
			x: col - Math.floor(0.5 * (line-1))
			, y: line
			, type: types[type]
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
	.attr('class', function(d) {return 'terrain-' + d.type;})
	.style('stroke', 'black')
	.style('stroke-width', 0.2)
;
