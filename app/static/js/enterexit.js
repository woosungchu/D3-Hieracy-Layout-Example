var body = d3.select('body')
body.append('button').attr('onclick','action1()').text('no merge')
var firstDiv = body.append('div').attr('id','content1').attr('class','content')
body.append('button').attr('onclick','action2()').text('merge')
var secondDiv = body.append('div').attr('id','content2').attr('class','content')
body.append('button').attr('onclick','action3()').text('update')
var thirdDiv = body.append('div').attr('id','content3').attr('class','small-content')
body.append('button').attr('onclick','action4()').text('update')
var fourthDiv = body.append('div').attr('id','content4').attr('class','small-content')

function init(div,count){
  for(var int = 0 ; int < count; int++){
    div.append('div')
  }
}

init(firstDiv,3);
init(secondDiv,3);
init(thirdDiv,3);

// merge
var myData = ['A','B','C','D','E'];

function action1(){
  var before = d3.select('#content1')
                  .selectAll('div')
                  .data(myData);

  before.enter()
        .append('div')
        .text(function(d){
          return d;
        })
}

function action2(){
  var after = d3.select('#content2')
                .selectAll('div')
                .data(myData);

  after.enter()
        .append('div')
        .merge(after) // this is point
        .text(function(d){
          return d;
        })

}

//General Update Pattern
//A common pattern is to encapsulate the above behaviour of adding, removing and updating DOM elements in a single function
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function action3() {
	var rand = Math.floor( Math.random() * 26 );
	var myData = letters.slice(0, rand).split('');
	update(myData);
}

function update(data){
  var u = d3.select('#content3')
              .selectAll('div')
              .data(data);

  u.enter()
    .append('div')
    .merge(u)
    .text(function(d){
      return d;
    })

  u.exit().remove();
}

//Data join Key function
var i = 25;
function action4(){
  if(i<0) return;
  var myData = letters.slice(i).split('');
  i--;
  keyUpdate(myData);
}

function keyUpdate(data){
  var u = d3.select('#content4')
            .selectAll('div')
            //This function should return a unique id value for each array element,
            //allowing D3 to make sure each array element stays joined to the same DOM element
            .data(data,function(d){ // Data join key function
              return d;
            });

  u.enter()
    .append('div')
    .merge(u)
    .transition() // resort DOM
    .style('left',function(d,i){
      return i * 32 + 'px';
    })
    .text(function(d){
      return d;
    })
}
