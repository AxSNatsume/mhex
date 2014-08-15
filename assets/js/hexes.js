// Sample from https://www.dashingd3js.com/table-of-contents


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

var type_colors = {
	water: 'royalblue'
	, ocean: 'navy'
	, sand: 'yellow'
	, grass: 'lime'
	, forest: 'darkgreen'
	, mountain: 'SaddleBrown'
	, snow: 'white'
	, rock: 'silver'
	, lava: 'red'
	, creep: 'purple'
};


var radius = 30;
var lines = 20;
var cols = 20;

var grid = [
    {x:1, y:1, type: 'grass'}
    , {x:2, y:1, type: 'water'}
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

var grid = [];

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
    .attr('width', (2*cols+1)*radius)
    .attr('height', (line/2*3-1)*radius)
    .style('border', '1px solid white');


/* def:patterns */
var defs = svgContainer.append('svg:defs');
defs.append('svg:pattern')
  .attr('id', 'tile-water')
	.attr('patternUnits', 'userSpaceOnUse')
	.attr('width', '100')
	.attr('height', '100')
  .append('svg:image')
	.attr('xlink:href', 'assets/img/tile-water.png')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', 100)
	.attr('height', 100);
defs.append('svg:pattern')
  .attr('id', 'tile-ocean')
	.attr('patternUnits', 'userSpaceOnUse')
	.attr('width', '100')
	.attr('height', '100')
  .append('svg:image')
	.attr('xlink:href', 'assets/img/tile-ocean.png')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', 100)
	.attr('height', 100);
defs.append('svg:pattern')
  .attr('id', 'tile-lava')
	.attr('patternUnits', 'userSpaceOnUse')
	.attr('width', '100')
	.attr('height', '100')
  .append('svg:image')
	.attr('xlink:href', 'assets/img/tile-lava.png')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', 100)
	.attr('height', 100);
defs.append('svg:pattern')
  .attr('id', 'tile-sand')
	.attr('patternUnits', 'userSpaceOnUse')
	.attr('width', '100')
	.attr('height', '100')
  .append('svg:image')
	.attr('xlink:href', 'assets/img/tile-sand.png')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', 100)
	.attr('height', 100);

/* cells */
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
		return 'M' + (d.r * radius * 1) + ' ' + (d.r * radius * 0)
			+ 'L' + (d.r * radius * 2) + ' ' + (d.r * radius * 0.5)
			+ 'L' + (d.r * radius * 2) + ' ' + (d.r * radius * 1.5)
			+ 'L' + (d.r * radius * 1) + ' ' + (d.r * radius * 2)
			+ 'L' + (d.r * radius * 0) + ' ' + (d.r * radius * 1.5)
			+ 'L' + (d.r * radius * 0) + ' ' + (d.r * radius * 0.5)
			+ 'Z'
		;
	})
	.attr('transform', function(d) {
		return 'translate'
			+ ' (' + ((d.x -1) * 2*radius + radius*(d.y -1))
			+ ',' + ((d.y -1) * 1.5*radius)
			+ ')';
	})
	.attr('class', function(d) {return 'terrain-' + d.type;})
	.style('stroke', 'black')
	.style('stroke-width', 0.2)
	.style('fill', function(d) {
		return 'url(#tile-' + d.type + ') ' + type_colors[d.type];
	})
	.on('mouseover', function(d,i) {
		d3.select(this)
			.style('fill', type_colors[d.type]);
	})
	.on('mouseout', function(d) {
		d3.select(this)
			.style('fill', 'url(#tile-' + d.type + ') ' + type_colors[d.type]);
	})
	.on('click', function(d) {
		console.log(this, d);
	})
;
