var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 1600,
    height = 800,
    svg = d3.select('body').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom);

d3.json('sidemap.json',function(error,json){
  if (error) return console.warn(error);

  var data = json[0];

  var split_index = Math.round(data.children.length / 2)

  // Left data
  var data1 = {
    "name": data.name,
    "children": JSON.parse(JSON.stringify(data.children.slice(0, split_index)))
  };

  // Right data
  var data2 = {
    "name": data.name,
    "children": JSON.parse(JSON.stringify(data.children.slice(split_index)))
  };

  var right = d3.hierarchy(data1);
  var left = d3.hierarchy(data2);

  drawTree(right, "right")
  drawTree(left, "left")

})//end get json

function drawTree(root, pos) {

  var SWITCH_CONST = 1;
  if (pos === "left") {
    SWITCH_CONST = -1;
  }

  var g = svg.append('g').attr("transform", "translate(" + width / 2 + ",0)");

  var tree = d3.tree().size([height, SWITCH_CONST * (width - 150) / 2]);

  tree(root)

  var nodes = root.descendants();
  var links = root.links();

  // Set both root nodes to be dead center vertically
  nodes[0].x = height / 2

  var link = g.selectAll(".link")
    .data(links)
    .enter()

  link.append("path")
    .attr("class", "link")
    .attr("d", function(d) {
      return "M" + d.target.y + "," + d.target.x + "C" + (d.target.y + d.source.y) / 2.5 + "," + d.target.x + " " + (d.target.y + d.source.y) / 2 + "," + d.source.x + " " + d.source.y + "," + d.source.x;
    });

  var node = g.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", function(d) {
      return "node" + (d.children ? " node--internal" : " node--leaf");
    })
    .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")";
    })

  node.append("circle")
    .attr("r", function(d, i) {
      return 2.5
    });

  node.append("text")
    .attr("dy", -5)
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.name
    });
}
