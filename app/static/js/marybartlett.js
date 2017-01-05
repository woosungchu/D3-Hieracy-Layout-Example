//html
d3.select('body').attr('id','network');

//data
var network = {
    "id": 3083,
    "title": "Some test data 3083",
    "alignedToObjectiveId": 3044,
    "cachedRAG": "G",
    "noChildren": 25,
    "children": [
        {
            "id": 2921,
            "title": "Some test data 2921",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "G",
            "children": [
                {
                    "id": 4826,
                    "title": "Some test data 4826",
                    "alignedToObjectiveId": 2921,
                    "cachedRAG": "G"
                }
            ]
        },
        {
            "id": 3224,
            "title": "Some test data 3224",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "G"
        },
        {
            "id": 3223,
            "title": "Some test data 3223",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "G",
            "children": [
                {
                    "id": 3852,
                    "title": "Some test data 3852",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G"
                },
                {
                    "id": 3309,
                    "title": "Some test data 3309",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G"
                },
                {
                    "id": 3305,
                    "title": "Some test data 3305",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G"
                },
                {
                    "id": 3315,
                    "title": "Some test data 3315",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G"
                },
                {
                    "id": 3311,
                    "title": "Some test data 3311",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "R"
                },
                {
                    "id": 3314,
                    "title": "Some test data 3314",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "R"
                },
                {
                    "id": 5265,
                    "title": "Some test data 5265",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G"
                },
                {
                    "id": 3242,
                    "title": "Some test data 3242",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "R"
                },
                {
                    "id": 3317,
                    "title": "Some test data 3317",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G",
                    "children": [
                        {
                            "id": 5928,
                            "title": "Some test data 5928",
                            "alignedToObjectiveId": 3317,
                            "cachedRAG": "G"
                        }
                    ]
                },
                {
                    "id": 3398,
                    "title": "Some test data 3398",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "G",
                    "children": [
                        {
                            "id": 3477,
                            "title": "Some test data 3477",
                            "alignedToObjectiveId": 3398,
                            "cachedRAG": "R"
                        }
                    ]
                },
                {
                    "id": 3239,
                    "title": "Some test data 3239",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "R"
                },
                {
                    "id": 3241,
                    "title": "Some test data 3241",
                    "alignedToObjectiveId": 3223,
                    "cachedRAG": "R"
                }
            ]
        },
        {
            "id": 3213,
            "title": "Some test data 3213",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "R"
        },
        {
            "id": 3563,
            "title": "Some test data 3563",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "G"
        },
        {
            "id": 3562,
            "title": "Some test data 3562",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "G"
        },
        {
            "id": 2922,
            "title": "Some test data 2922",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "R"
        },
        {
            "id": 5502,
            "title": "Some test data 5502",
            "alignedToObjectiveId": 3083,
            "cachedRAG": "G",
            "children": [
                {
                    "id": 5514,
                    "title": "Some test data 5514",
                    "alignedToObjectiveId": 5502,
                    "cachedRAG": "G"
                },
                {
                    "id": 5523,
                    "title": "Some test data 5523",
                    "alignedToObjectiveId": 5502,
                    "cachedRAG": "G"
                }
            ]
        }
    ]
};

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom,
    i = 0,
    duration = 750;


var ragToClass = function (status) {
    switch (status) {
    case 'U':
        return 'node--upcoming';
    case 'G':
        return 'node--green';
    case 'A':
        return 'node--amber';
    default:
        return 'node--red';
    }
};



var createTree;
var connector = function (d) {
    return 'M' + d.x + ',' + d.y +
        'C' + (d.x + d.parent.x) / 2 + ',' + d.y +
        ' ' + (d.x + d.parent.x) / 2 + ',' + d.parent.y +
        ' ' + d.parent.x + ',' + d.parent.y;
};

var tree = d3.tree()
    .size([width, height]);

var svg = d3.select('#network').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var root = tree(d3.hierarchy(network));

var collapse = function (d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
};

root.each(function (d) {
    d.name = d.title; //transferring name to a name variable
    d.id = i; //Assigning numerical Ids
    i += i;
});

root.x0 = height / 2;
root.y0 = 0;

root.children.forEach(collapse);

createTree = function (source) {

    // Compute the new tree layout.
    var nodes = tree(root).descendants();
    var links = nodes.slice(1);
    var node;
    var nodeEnter;
    var nodeUpdate;
    var nodeExit;
    var link;
    var linkEnter;

    // Normalize for fixed-depth.
    _.forEach(nodes, function (d) {
        d.y = d.depth * 180;
    });

    // Update the nodes…
    node = svg.selectAll('g.node')
        .data(nodes, function (d) {
            return d.id || (d.id += i);
        });

    // Enter any new nodes at the parent's previous position.
    nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function () {
            return 'translate(' + source.x0 + ',' + source.y0 + ')';
        })
        .on('click', function (d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            createTree(d);
        });

    nodeEnter.append('circle')
        .attr('r', 10)
        .attr('class', function (d) {
            return ragToClass(d.data.cachedRAG);
        });

    nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('y', function (d) {
            //return d.children ? -20 : 20;
            return 20;
        })
        .style('text-anchor', 'middle')
        .text(function (d) {
            return d.data.title;
        });

    // Transition nodes to their new position.
    nodeUpdate = node.merge(nodeEnter).transition()
        .duration(duration)
        .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

    nodeUpdate.select('circle')
        .attr('r', 10)
        .attr('class', function (d) {
            return ragToClass(d.data.cachedRAG);
        });

    nodeUpdate.select('text')
        .style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', function () {
            return 'translate(' + source.x + ',' + source.y + ')';
        })
        .remove();

    nodeExit.select('circle')
        .attr('r', 10)
        .attr('class', function (d) {
            return ragToClass(d.data.cachedRAG);
        });

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);


    // Update the links…
    link = svg.selectAll('path.link')
        .data(links, function (l) {
            var id = l.id + '->' + l.parent.id;
            return id;
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr('d', connector);

    // Enter any new links at the parent's previous position.
    linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function () {
            var o = {x: source.x0, y: source.y0, parent: {x: source.x0, y: source.y0}};
            return connector(o);
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition()
        .duration(duration)
        .attr('d', connector);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr('d', function () {
            var o = {x: source.x, y: source.y, parent: {x: source.x, y: source.y}};
            return connector(o);
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
};
createTree(root);
