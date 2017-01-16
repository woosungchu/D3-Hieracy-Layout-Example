//http://jsfiddle.net/5TK3d/
/**
1.both side map
2. use separation as divmap
3. data should also have height of its detail box
*/

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960,
    height = 2400,
    svg = d3.select('body').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var tree = d3.tree()
      // .separation(function(a,b){
      //   var gap = a.data.height;
      //   return gap !== 0 ? gap : 10;
      // })
      .size([width,height]);

var nodes = "",
    flag = false,
    count = 0;

d3.json('sidemap.json',function(error,json){
  if (error) return console.warn(error);

  nodes = tree(d3.hierarchy(json[0]));

  var link = svg.selectAll('.link')
        .data(nodes.descendants().slice(1))
        .enter().append('path')
        .attr('class','link')
        .attr('d',function(d){
          count++;
          flag = count > nodes.descendants().length/2;
          console.log(flag)
            return flag ?diagonalRight(d):diagonalLeft(d);
        });

  var node = svg.selectAll('.node')
        .data(nodes.descendants())
        .enter().append('g')
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

})//end get json

var diagonalRight = function(d){
  return "M" + d.y + "," + d.x
      + "C" + (d.parent.y + 100) + "," + d.x
      + " " + (d.parent.y + 100) + "," + d.parent.x
      + " " + d.parent.y + "," + d.parent.x;
};

var diagonalLeft = function(d){
  return "M" + -d.y + "," + d.x
      + "C" + (-d.parent.y + 100) + "," + d.x
      + " " + (-d.parent.y + 100) + "," + d.parent.x
      + " " + -d.parent.y + "," + d.parent.x;
};
