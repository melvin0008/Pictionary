var socket = io.connect("http://localhost:3000");
// var socket = io.connect("https://piction.herokuapp.com");
var FADE_TIME = 150; 
var username = (localStorage.getItem('username'))? localStorage.getItem('username'):"temp"+(Math.floor((Math.random() * 100) + 1)).toString();
var room =window.location.href;
var res=room.split("/");
var roomname=res[4];
var sessionId = socket.io.engineid;


$(document).ready(function() {
	$('#chatexpand').click(function() {
		$('#chatwindow').slideToggle("fast");
    // $("i",this).toggleClass("fa fa-plus fa fa-minus");
	});


var $window = $(window);
var $messages = $('.discussion');
var $inputMessage = $('#inputMessage');

var sendMessage =function(opt,username,message) {

    if (message) {
      if(opt=="self")
      {
        $inputMessage.val('');
      }
      addChatMessage({
        username: username,
        message: message
      },opt);
    
    }
}


  // Adds the visual chat message to the message list
var addChatMessage =function(data,opt) {
    // Don't fade the message in if there is an 'X was typing'
    var $usernameDiv = $('<label class="avatar"/>')
      .text(data.username);
    var $messageBodyDiv = $('<div class="messages">')
      .text(data.message);
    var $messageDiv = $('<li class='+opt+'/>')
      .append($usernameDiv, $messageBodyDiv);
      addMessageElement($messageDiv);
}

  $window.keydown(function (event) {
    if (event.which === 13) {

        var message = $('#inputMessage').val();
        sendMessage("self",username,message);
        socket.emit('new_message',sessionId, {message:message,user:username,room:roomname});
    }
  });

function addMessageElement (el) {
    var $el = $(el);
    $messages.append($el);
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }
  socket.on('connect', function(){
      
      socket.emit("joinroom",sessionId,{room:roomname,user:username});
      console.log("Connected");

      socket.on('displayerror',function(error)
      {
        $('#errorstring').html(error);
        $('#error').modal('show');
      });
      

      socket.on('othermessage',function(data)
      {
        sendMessage("other",data.user,data.message);
      });
});


});



