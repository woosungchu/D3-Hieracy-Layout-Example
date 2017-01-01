/**
d3.select('body').append('div').text('new Text')
*/

var w = 900,
    h = 500,
    status = d3.select('body')
              .append('p')
              .classed('status',true)
              .text('Welcome to circle practice'),
    svg = d3.select('body')
            .append('svg')
            .attr('width',w)
            .attr('height',h),
    data = [20,30,40,50,60];

//DOM
svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform',function(d,i){
    //x,y coordinate
    var x = i * 150 + d;
    var y = 100;
    return 'translate('+ x +','+ y +')';
  })
  .classed('item',true);
/*
  .append('circle')
	.attr('r', function(d,i){
    return d
  })
  .attr('cx', function(d,i){
    return (i + 1) * 70;
  })
  .classed('selected',false)
*/



//insert
function addNumberedCircle(d,i){
  var odd = i % 2 === 1;

  d3.select(this)
  .append('circle')
  .attr('r', d)
  .attr('cx', i * 40 / 2)
  .each(function() {
    d3.select(this).classed('selected', odd);
  });
  //.classed('selected',false)
  /*
  //filter
  .filter(function(d, i) {
    return i % 2 === 0;
  })
  */

  d3.select(this)
    .append('text')
    .text(i+1)
    .attr('x',d )
    .attr('y',d * 2);
}

d3.selectAll('g.item').each(addNumberedCircle);

//add event
d3.selectAll('circle')
.on('click',function(d,i){
  //message
  d3.select('.status').text('You clicked on circle' + i);

  //coloring
  d3.select(this).classed('selected',function(d,i){
    return !d3.select(this).classed('selected');
  })

})
