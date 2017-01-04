/*
line	Generates path data for a multi-segment line (typically for line charts)
area	Generates path data for an area (typically for stacked line charts and streamgraphs)
stack	Generates stack data from multi-series data
arc	Generates path data for an arc (typically for pie charts)
pie	Generates pie angle data from array of data
symbol	Generates path data for symbols such as plus, star, diamond
*/

// Select the path element and set its d attribute
var points = [[0, 80],[100, 100],[200, 30],[300, 50], [400, 40],[500, 80]],
    lineGenerator = d3.line();

draw(lineGenerator(points))

//.x() and .y() accessor functions
var data = [{value: 10}, {value: 50}, {value: 30}, {value: 40}, {value: 20}, {value: 70},{value: 50}],
    xScale = d3.scaleLinear().domain([0, 6]).range([0, 600]),
    yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]),
    lineGenerator = d3.line()
                        .x(function(d,i){
                          return xScale(i);
                        })
                        .y(function(d,i){
                          return yScale(d.value);
                        });

draw(lineGenerator(data));

//defined()
var definedPoints = [[0, 80],[100, 100],null,[300, 50],[400, 40],[500, 80]],
    lineGenerator = d3.line()
                        .defined(function(d){
                          return d !== null;
                        });

draw(lineGenerator(definedPoints));

//Area
var areaGenerator = d3.area();
draw(areaGenerator(points),true);

//stack
var stackData = [
            {day: 'Mon', apricots: 120, blueberries: 180, cherries: 100},
            {day: 'Tue', apricots: 60,  blueberries: 185, cherries: 105},
            {day: 'Wed', apricots: 100, blueberries: 215, cherries: 110},
            {day: 'Thu', apricots: 80,  blueberries: 230, cherries: 105},
            {day: 'Fri', apricots: 120, blueberries: 240, cherries: 105}
          ],
    stack = d3.stack().keys(['apricots','blueberries','cherries']);

//sorry too boring to keep writing

function draw(pathData,g){
  var w = 700, h= 110,
      body = d3.select('body'),
      svg = body.append('svg').attr('width',w).attr('height',h);

  if(g === true){
    svg.append('g').append('path').attr('d',pathData).attr('class','g');
  }else{
    svg.append('path').attr('d',pathData);
  }

  body.append('hr')
}
