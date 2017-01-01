/* Refrence
  https://egghead.io/lessons/d3-install-and-configure-d3-v4

*/

//1.Test
d3.select('body').append('div').text('new Text')

var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
//2.From data to DOM
// d3.js create DOM elements based on data
/*

d3.select('body').selectAll('div')
  .data(data)
  .enter()
  .append('div')

//3.Graph
// .style('key',value') with callback fn
  .style('height',function(d){
    return d+'px';
  })
  .style('width',function(d){
    return '20px';
  })
  .attr('class','bar-chart');
*/

//4. SVG is better than division to draw in html
var w = 200,
    h = 100,
    svg = d3.select('body')
            .append('svg')
            .attr('width',w)
            .attr('height',h);

//add DOM
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    //add style
    .attr('x',function(d,i){
      return i * (w / data.length);
    })
    .attr('y',function(d){
      return h-d;
    })
    .attr('width', w / data.length - 1)
    .attr('height', function(d){return d;})
    .attr('fill','hotpink');

//5. add Text to SVG
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d){return d;})
    .attr('x',function(d,i){
      return i * (w / data.length) + (w/data.length) / 2;
    })
    .attr('y', function(d){
      return h - d + 10;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size','11px')
    .attr('fill','black')
    .attr('text-anchor','middle');
