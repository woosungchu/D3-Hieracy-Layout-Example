var width = 960,
    height = 2400,
    svg = d3.select("body").append('svg')
            .attr('width',width)
            .attr('height',height),
    g = svg.append("g").attr("transform", "translate(40,0)");

var tree = d3.tree()
    .size([height - 400, width - 160]);

var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.csv("flare.csv", function(error, data) {
  if (error) throw error;

  var root = stratify(data)
      .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

  tree(root);

  var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = g.selectAll(".node")
      .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("circle")
      .attr("r", 2.5);

  //Title
  node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });

  //div
  /**
  node.append('rect')
      .attr('x',function(d){return d.children ? -8 : 8; })
      .attr("y", 10)
      .attr('width','10')
      .attr('height','10')
      .attr('fill','blue');
*/

  //Description
  node.append("text")
      .attr('class','description')
      .attr('x',function(d){return d.children ? -8 : 8; })
      .attr("y", 10)
      .text(function(d) { return 'Description' });

});

function diagonal(d) {
  return "M" + d.y + "," + d.x
      + "C" + (d.parent.y + 100) + "," + d.x
      + " " + (d.parent.y + 100) + "," + d.parent.x
      + " " + d.parent.y + "," + d.parent.x;
}
