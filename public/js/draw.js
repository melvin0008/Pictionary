var pathArray;
var myPath;
function onMouseDown(event) {
  myPath= new Path();
  myPath.strokeColor = 'black';
  pathArray=[event.point];
}

function onMouseDrag(event) {
  drawLine(event.point);
  pathArray.push(event.point);
}

function onMouseUp(event) {
  pathArray.push(event.point);
  drawLine(event.point);
  emitLine(pathArray);
  pathArray= new Array(); 
}
function drawLine(point) {
  myPath.add(point);
  myPath.smooth();
  view.draw();
} 
  
function emitLine(pointList) {
  var sessionId = io.io.engineid;
  io.emit( 'drawLine', pointList, sessionId )
}


//Socket IO After it receives a client request
io.on( 'drawLine', function( data ) {
  drawOnClientEnd(data);
});

function drawOnClientEnd(data)
{
    var pathArray=data;
    var myPath= new Path();
    myPath.strokeColor = 'black';
    pathArray.forEach(function(point) {
      myPath.add(new Point(point[1],point[2]));
    });
    myPath.close=true;
    myPath.smooth();
    view.draw();
    console.log("Drawn");
}