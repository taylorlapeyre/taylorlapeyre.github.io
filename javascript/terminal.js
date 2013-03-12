/*
 * Form Setup
*/

$(document).ready(function() {
  // make the box scroll with the commands
  $("#terminal-input").scrollTop(
    $("#terminal-input")[0].scrollHeight - $("#terminal-input").height()
  );

  // respond when user presses enter
  $("#terminal-input").keypress(function(e) {
      var textVal = $(this).val();
      if (e.which == 13) {
        respond();
        e.preventDefault();
      }
  });

  // show/hide the terminal
  $("#toggle-terminal").click(function() {
    $("#terminal-form").slideToggle('fast', function() {
      showHelp();
    });
  });

  // automatically hide the terminal
  $("#terminal-form").hide();
});


/*
 * Displaying Text
*/

// add text, no prompt afterwards
function addText(text) {
  $("#terminal-input").val($("#terminal-input").val() + "\n" + text);
}

// add text, plus a prompt
function addResponse(text) {
  $("#terminal-input").val($("#terminal-input").val() + "\n" + text);
  $("#terminal-input").val($("#terminal-input").val() + "\n" + "> ");
  $("#terminal-input").scrollTop(
    $("#terminal-input")[0].scrollHeight - $("#terminal-input").height()
  );
}

// the help text, gets called when the page loads
function showHelp() {
  $("#terminal-input").val("");
  addText("Welcome to Taylor Lapeyre's website terminal (beta)!");
  addText("Available Commands: \n")
  addText("print [something]:");
  addText("    Print [something] to the screen.");
  addText("message [content]:");
  addText("    Send an email to Taylor Lapeyre with the body [content].");
  addText("goto [location]:");
  addText("    Go to [location] in the site.");
  addResponse("");

  // set the cursor to the last character of the box
  var input = $("#terminal-input");
  input.selectionStart = input.selectionEnd = input.val().length;
}

/*
 * Responding to Input
*/

// turns the box's text into a command + its arguments
function respond() {
  var lines = $("#terminal-input").val().split("\n");
  var input = lines[lines.length - 1];
  var words = input.split(" ");
  var command = words[1];
  var arguments = words.slice(2, words.length);

  runCommand(command, arguments);
}

// determines what to do based on the given command + arguments
function runCommand(command, arguments) {
  var argumentString = arguments.join(" ").replace(/"/g, '');
  console.log(command);

  switch (command) {
    case "print":
      addResponse('"' + argumentString + '"');
      break;

    case "message":
      console.log(argumentString);
      addResponse("Message Sent!");
      break;

    case "goto":
      if (arguments[0] == "home") window.location = "/";
      else window.location = "/" + arguments[0] + ".html";
      break;

    case "help":
      showHelp();
      break;

    default:
      addResponse("Unrecognized Command.");
  }
}