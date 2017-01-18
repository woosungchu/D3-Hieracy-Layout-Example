var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 1600,
    height = 800,
    gap = 10,
    svg = d3.select('body').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom);

d3.json('sidemap.json',function(error,json){
  if (error) return console.warn(error);

  var data = json[0];

  var split_index =  Math.round(data.children.length / 2);

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

  var flag = (pos === "left") ? -1 : 1;

  var g = svg.append('g').attr("transform", "translate(" + width / 2 + ",0)");

  var tree = d3.tree()
                .separation(function(a,b){
                    var sibling = (a.parent == b.parent);
                    var hasDetail = b.data.detail !== undefined;

                    return sibling && hasDetail ? gap/2 : 1;
                })
                .size([height, flag * (width - 150) / 2]);

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
      return "M" + d.source.y + "," + d.source.x
          + "H" + (d.source.y+ (d.target.y-d.source.y)/2 )
          + "V" + d.target.x + "H" + d.target.y;
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

    var detail = node.filter(function(d,i){
                 return d.data.detail !== undefined ? this : null;
               })
              .append('text')
              .attr('class','node-detail')
              .attr('x',0).attr('y',0).attr('dy',0)
              .style("text-anchor", "middle");

  	detail.each(function(d){
    	var str = d.data.detail;
    	var limit = Math.ceil(str.length / gap);
      var node = d3.select(this);
      var textLength = d.data.detail.length / gap;;

      for(var i = 0 ; i < gap + 1 ; i++ ){
        	var point = textLength * i ;

        	node.append('tspan')
          		.attr('x','0')
          		.attr('y', (i*12)+15)
          		.text(str.slice(point , (point+ textLength)))
      }

    })
}
