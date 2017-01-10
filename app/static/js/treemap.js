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
          .attr('id','treemap')
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
              .attr('class','node')
              .attr('transform',function(d){
                return 'translate('+ d.y + ',' + d.x + ')';
              });
    node.append('text')
          .attr('dy','-0.5em')
          .attr('class','node-text')
          .style('text-anchor', 'end')
          .text(function(d){ return d.data.name });


var updateData = {
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
      "name": "Maker",
      "children": [
        {
          "name": "Erika"
        },
        {
          "name": "Zebra"
        }
      ]
    },
    {
      "name": "Noa"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Ezreal"
        },
        {
          "name": "Blitz"
        },
        {
          "name": "Crank"
        },
        {
          "name": "Enos"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
};

function update(data){
  var hierarchy = d3.hierarchy(data,function(d){
        return d.children;
      }),
      nodes = treemap(hierarchy);

  var link = d3.select('#treemap').selectAll('.link')
              .data(nodes.descendants().slice(1)),
      node = d3.select('#treemap').selectAll('.node')
              .data(nodes.descendants());

      link.enter()
          .append('path')
          .merge(link)
          .transition()
          .duration(1000)
          .attr('class','link')
          .attr('d',function(d){
            return 'M'+ d.y + ',' + d.x
              + 'C' + (d.y + d.parent.y ) / 2 + ',' + d.x
              + ' ' + (d.y + d.parent.y ) / 2 + ',' + d.parent.x
              + ' ' + d.parent.y + "," + d.parent.x ;
          });


var g = node.enter().append('g').attr('class','node');

    //new Data
    g.append('text')
      .attr('dy','-0.5em')
      .style('text-anchor', 'end')

    //merge and relocate
    g.merge(node)
      .attr('transform',function(d){
        return 'translate('+ d.y + ',' + d.x + ')';
      })
      .transition()
      .duration(5000)
      .select('text')
      .text(function(d){ return d.data.name });

}

svg.attr('onclick', 'update(updateData)');
