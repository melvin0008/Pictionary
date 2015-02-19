var socket = io.connect("http://localhost:3000");
// var socket = io.connect("https://piction.herokuapp.com");

$(document).ready(function() {
	$('#chatexpand').click(function() {
		$('#chatwindow').slideToggle("fast");
	});


var $window = $(window);
var $messages = $('.messages');
var $inputMessage = $('#inputMessage');

function sendMessage () {

    var message = $('#inputMessage').val();
    // Prevent markup from being injected into the message
//    message = cleanInput(message);
console.log(message);
    // if there is a non-empty message and a socket connection
    if (message) {
      console.log(message);
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
//      socket.emit('new message', message);
    }
}
function cleanInput (input) {
    return $('<div/>').text(input).text();
}

  // Adds the visual chat message to the message list
function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    options = options || {};

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
}

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
  
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      // if (true) {
        sendMessage();

      // }
    }
  });

function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

});



socket.on('connect', function(){
			// firing back the connect event to the server
			// and sending the nickname for the connected client
			var room =window.location.href;
			var res=room.split("/");
			var roomname=res[4];
			var username="temp"+(Math.floor((Math.random() * 100) + 1)).toString();
			var sessionId = socket.io.engineid;
			socket.emit("joinroom",sessionId,{room:roomname,user:username});
			console.log("Connected");

			socket.on('displayerror',function(error)
			{
				$('#errorstring').html(error);
				$('#error').modal('show');
			});
});
