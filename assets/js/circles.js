// Sample from https://www.dashingd3js.com/table-of-contents

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
];

var svgContainer = d3.select('body').append('svg')
    .attr('width', 200)
    .attr('height', 200)
    .style('border', '1px solid black');

var circles = svgContainer.selectAll('circles')
    .data(grid)
    .enter()
    .append('circle');

var circleAttributes = circles
    .attr('cx', function(d) {return 20+40*(d.x-1)+20*(d.y-1); })
    .attr('cy', function(d) {return 20+40*(d.y-1);})
    .attr('r', 20)
    .style('fill', function(d) {return d.c; });
