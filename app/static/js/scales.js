var consoleDiv = d3.select('body').append('div')

//scales with 'continuous' input and 'continuous' output
//y = ax +b
var scaleLinear = d3.scaleLinear().domain([0,10]).range([0,600]);
log('d3.scaleLinear().domain([0,10]).range([0,600])',scaleLinear);

var scaleLinearColor = d3.scaleLinear().domain([0,10]).range(['yellow','red']);
log("d3.scaleLinear().domain([0,10]).range(['yellow','red'])",scaleLinearColor);

//y = m * x^k + b
var scalePow = d3.scalePow().exponent(0.5).domain([0,10]).range([0,30]);
log("d3.scalePow().exponent(0,5).domain([0,10]).range([0,30])", scalePow);

//set the area rather than the radius
var scaleSqrt = d3.scaleSqrt().domain([0,100]).range([0,30]);
log("d3.scaleSqrt().domain([0,100]).range([0,30])", scaleSqrt);


//scales with 'continuous' input and 'discrete' output


//scales with 'discrete' input and 'discrete' output




function log(title,scale){
  consoleDiv.append('p').text(title);
  for (var i = 0; i <= 10; i++) {
    consoleDiv.append('span').text(scale(i) +' , ')
  }
  consoleDiv.append('hr')
}
