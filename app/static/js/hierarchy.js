var treemapData = {
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
};

var margin = {top:20, right:90, bottom:30, left:90},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

//declaration
var treemap = d3.tree().size([width,height]),
    hierarchy = d3.hierarchy(treemapData,function(d){
      return d.children;
    }),
    nodes = treemap(hierarchy);

var svg = d3.select('body').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', width + margin.top + margin.bottom),
    g = svg.append('g')
          .attr('transform','translate('+ margin.left +','+ margin.right +')');

var link = g.selectAll('.link')
              .data( nodes.descendants().slice(1))
              .enter().append('path')
                .attr('class','link')
                .attr('d',function(d){
                  return 'M'+ d.y + ',' + d.x
                    + 'C' + (d.y + d.parent.y ) / 2 + ',' + d.x
                    + ' ' + (d.y + d.parent.y ) / 2 + ',' + d.parent.x
                    + ' ' + d.parent.y + "," + d.parent.x ; 
                });

var node = g.selectAll('.node')
              .data(nodes.descendants())
              .enter().append('g')
              .attr('class',function(d){
                return 'node' + (d.children ? 'node-internal' : 'node-leaf')
              })
              .attr('transform',function(d){
                return 'translate('+ d.y + ',' + d.x + ')';
              })
