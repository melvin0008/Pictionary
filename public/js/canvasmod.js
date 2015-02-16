
  var canvas = document.getElementById('draw');
  var ctx = canvas.getContext('2d');

  ctx.strokeStyle= "red"; //set the color of the stroke line 
  ctx.lineWidth = 3;  //define the width of the stroke line
  ctx.font = "italic bold 35pt Tahoma"; //set the font name and font size
  ctx.strokeText("StackOverFlow",30,80); //draw the text

