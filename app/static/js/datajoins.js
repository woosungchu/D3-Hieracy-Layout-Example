var scores = [
  {
    "name": "Andy",
    "score": 25
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 42
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 48
  }
];

var w = 800,
    h = 200,
    svg = d3.select('body')
            .append('svg')
            .attr('width',w)
            .attr('height',h),
    svg2 = d3.select('body')
              .append('svg')
              .attr('width',w)
              .attr('height',h)


svg.selectAll('g')
    .data(scores)
    .enter()
    .append('g')
    .attr('transform',function(d,i){
      var x = i * 120 + 100;
      var y = 100;
      return 'translate('+ x +','+ y +')';
    })
    .append('circle')
    .style('fill','orange')
    .attr('r', function(d,i){
      return d.score / 2;
    })
    .attr('cx', function(d, i) {
      return i * 20;
    })
    .classed('high',function(d,i){
      return d >= 40;
    })

//cities
var cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000},
  { name: 'Paris', population: 2244000},
  { name: 'Beijing', population: 11510000}
];

var graph = svg2.selectAll('g')
                  .data(cities)
                  .enter()

graph.append('g').attr('transform','translate(70, 30)')
      .append('rect')
      .attr('height', 19)
      .attr('width', function(d) {
        var scaleFactor = 0.00004;
        return d.population * scaleFactor;
      })
      .attr('y', function(d, i) {
        return i * 20;
      })

graph.append('g').attr('transform','translate(70, 30)')
    .append('text')
    .attr('y', function(d, i) {
      return i * 20 + 13;
    })
    .attr('x', -4)
    .text(function(d) {
      return d.name;
    });
