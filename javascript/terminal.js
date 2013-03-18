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
  $("#terminal-input").val($("#terminal-input").val() + text + "\n");
}

// add text, plus a prompt
function addResponse(text) {
  $("#terminal-input").val($("#terminal-input").val() + "\n" + text + "\n" + "> ");
  $("#terminal-input").scrollTop(
    $("#terminal-input")[0].scrollHeight - $("#terminal-input").height()
  );
}

// the help text, gets called when the page loads
function showHelp() {
  $("#terminal-input").val("");
  addText("Welcome to Taylor Lapeyre's website terminal (beta)!i\n");
  addText("print [something]:");
  addText("    Print [something] to the screen.");
  addText("message [content]:");
  addText("    Send an email to Taylor Lapeyre with the body [content]. (not yet functional)");
  addText("goto [location]:");
  addText("    Go to [location] in the site. (valid input: 'stories', 'about')");
  addText("speaktome:");
  addText("    Get some words of wisdom.");
  $("#terminal-input").val($("#terminal-input").val() + "\n> ");

  // set the cursor to the last character of the box
  var input = $("#terminal-input");
  var temp;
  temp = input.val();
  input.val('');
  input.focus();
  input.val(temp);
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

    case "speaktome":
      var quote = quotes[Math.floor(Math.random() * quotes.length)];
      addResponse(quote);
      break;

    default:
      addResponse("Unrecognized Command.");
  }
}

quotes = ["Calm down. its only ones and zeros. ",
"Daddy, what does FORMATTING DRIVE C mean? ",
"I am logged in, therefore I am. ",
"I tried to think but nothing happened!  Curly",
"(A)bort, (R)etry, (P)retend this never happened...  ",
"Real Programmers Practice Safe HEX. ",
"911... Press 1 if your house is on fire... Press 2 if...  ",
"A diplomat thinks twice before saying nothing.  ",
"A feature is a bug with seniority.  ",
"A man is not complete until he is married. Then he is finished. ",
"A seminar on Time Travel will be held two weeks ago.  ",
"AAAAA - American Association Against Acronym Abuse. ",
"Anything worth doing, is worth getting someone else to do.  ",
"As easy as 1, 2, 3.1415926535897932384626433832795028841  ",
"As I said before, I never repeat myself.  ",
"Avoid hangovers: Stay drunken.  ",
"Back up my hard disk? I cant find the reverse switch! ",
"Backup aborted: Please remove disk #192 and start over. ",
"Be nice to your kids. They'll choose your nursing home. ",
"Behind a successful man is an exhausted woman.  ",
"Best file compression around: 'rm -rf /' = 100% compression.  ",
"Black holes really suck...  ",
"Bugs come in through open Windows.  ",
"Computer Lie #1: Youll never use all that disk space. ",
"Computers make very fast, very accurate mistakes. ",
"Crime doesn't pay... does that mean my job is a crime?  ",
"Daddy, why doesn't this magnet pick up this floppy disk?  ",
"Discoveries are made by not following instructions. ",
"DisneyLand: A people trap operated by a mouse.  ",
"Documentation -- The worst part of programming. ",
"Doesn't expecting the unexpected make the unexpected become the expected? ",
"Don't play stupid with me! I'm better at it.  ",
"Don't take life so seriously. It won't last.  ",
"Don't talk unless you can improve the silence.  ",
"ERROR 406: file corrupt: config.earth -- reboot universe? (Y/N) ",
"Enter any 11-digit prime number to continue...  ",
"Eat right, exercise daily, live clean, die anyway.  ",
"Error 99 - CPU too tired to continue... ",
"Everybody lies; but it doesn't matter much since nobody listens.  ",
"Facts are stubborn things.  ",
"Feel lucky???? Update your software!  ",
"Follow-ups to alt.nobody.really.cares ",
"Friend: someone who likes you even after they know you. ",
"Get the facts first - you can distort them later! ",
"Growing old is mandatory; growing up is optional! ",
"I don't have a solution but I admire the problem. ",
"I haven't lost my mind; it's backed up on tape somewhere! ",
"Hardware (n): The part of the computer that can be kicked.  ",
"I.R.S.: Weve got what it takes to take what you've got! ",
"If in doubt, make it sound convincing.  ",
"If you're not confused, you're not paying attention.  ",
"Junk: stuff we throw away. Stuff: junk we keep. ",
"Keyboard not found. Press any key to continue...  ",
"Nothing is 100% certain, bug free or IBM compatible.  ",
"One persons error is another persons data.  ",
"OUT TO LUNCH -- If not back at five, OUT TO DINNER! ",
"RAM = Rarely Adequate Memory. ",
"Remember that you are unique. Just like everyone else.  ",
"Take my advice, I don't use it anyway.  ",
"Teamwork is essential. It allows you to blame someone else. ",
"The best way to have a good idea is to have lots of ideas.  Linus Pauling",
"The American version of the Golden Rule: He who has the gold makes the rules.",
"Those who are ready to sacrifice freedom for security ultimately will lose both.  Abraham Lincoln",
"The truth is out there? Anyone know the URL?  ",
"There are 3 kinds of lies: lies, damn lies & statistics.  ",
"There must be more to life than sitting there wondering if there is more to life. ",
"Time flies when you are having mail.  ",
"To err is human -- and to blame it on a computer is even more so.",
"Two most common elements in the universe: Hydrogen & Stupidity. ",
"User -- a technical term used by computer pros. See idiot.  ",
"When you kill a bug, ten more come for the funeral. ",
"WindowError:005 Multitasking attempted. System confused.  ",
"WindowError:01F Reserved for future mistakes. ",
"Wedding: A funeral where you smell your own flowers.  ",
"Time is the best teacher. Unfortunately, it kills all its students. Hector Berlioz",
"Windows Error: 001 - Windows loaded. System in danger.  ",
"You can't have everything... where would you put it?  ",
"You never finish a program, you just stop working on it.  ",
"Have you ever noticed? Anybody going slower than you is an idiot, and anyone going faster than you is a maniac. Jerry Seinfeld",
"I've always wanted to be somebody, but I should have been more specific.  Jerry Seinfeld",
"Without freedom of thought there can be no such thing as wisdom and no such thing as public liberty without freedom of speech.  Benjamin Franklin, 1722",
"Everything that can be invented has been invented.  Charles H. Duell, Commissioner, U.S. Office of Patents, 1899",
"Good people do not need laws to tell them to act responsibly, while bad people will find a way around the laws. Plato",
"We abuse land because we regard it as a commodity belonging to us. When we see land as a community to which we belong, we may begin to use it with love and respect.  Aldo Leopold",
"Science without religion is lame; religion without science is blind.  Albert Einstein",
"Democracy is when the indigent, and not the men of property, are the rulers.  Aristotle",
"There never was a good war or a bad peace.  Benjamin Franklin 1706-1790",
"Our products just aren't engineered for security. Brian Valentine, Microsoft VP of Windows development",
"Pleasure in the job put perfection in the work.  Aristotle",
"Much learning does not teach understanding. Heraclitus",
"Advertising may be described as the science of arresting human intelligence long enough to get money from it. Stephen Leacock",
"When a man tells you that he got rich through hard work, ask him whose.     Don Marquis",
"The man who does not read good books has no advantage over the man who cannot read them.  Mark Twain",
"The essence of XML is this: the problem it solves is not hard, and it does not solve the problem well.  Phil Wadler, POPL 2003",
"Those who would give up essential liberty for temporary safety deserve neither liberty nor safety.  Benjamin Franklin",
"To not know is bad. To wish not to know is worse. African proverb",
"As we enjoy great advantages from the inventions of others, we should be glad to serve others by any invention of ours. Benjamin Franklin, explaining why he refused to take out patents on his inventions.",
"In just 14 days the problems of the poorest countries in the world -- starvation, lack of education, scarcity of potable water, etc. - could be solved if each nation donated its military spending budget for just that period of time - 14 days.  Thomas Kostigen, June 1, 2004, cbs.marketwatch.com",
"An imbalance between rich and poor is the oldest and most fatal ailment of all republics. Plutarch",
"Any city, however small, is in fact divided into two, one the city of the poor, the other of the rich; these are at war with one another. Plato, The Republic",
"How does one put together a democracy based on the concept of equality while running an economy with ever greater degrees of economic inequality? Lester Thurow, MIT, Shifting Fortunes (1999)",
"The rich have decided that, since they don't use public services any more, they shouldn't have to pay for them. Ed Finn",
"No one who works for a living should live in poverty. Senator Edward Kennedy",
"Perhaps I am too cynical, but I believe there is a separate class of people in this country called Too Rich to Go to Prison.  Molly Ivins",
"[A computer is] like an Old Testament god, with a lot of rules and no mercy.  Joseph Campbell",
"When I give food to the poor, they call me a saint. When I ask why the poor have no food, they call me a communist. Dom Helder Camera",
"Be the change you wish to see in the world. M. K. Gandhi",
"A hundred times a day, I tell myself that my inner and outer life are based on labors of other men, living and dead and I must exert myself in order to give in the same measure as I have received and am still receiving. Albert Einstein",
"Statistics are like a bikini: they show interesting details but hide the important stuff. Anonymous college math professor",
"I see design standards that don't tell you how to come up with a good design (only how to write it down), employee evaluation standards that don't help you build meaningful long-term relationships with staff, testing standards that don't tell you how to invent a test that is worth running. Tom DeMarco, Slack",
"I came to America because of the great, great freedom which I heard existed in this country. I made a mistake in selecting America as a land of freedom, a mistake I cannot repair in the balance of my lifetime. Albert Einstein, 1947",
"Fast fact: Of the 34 chemicals most widely used on lawns, 25% are widely believed to cause birth defects, genetic mutation, and cancer. ",
"Hundreds of billions of dollars are spent every year to control the public mind.  MIT professor Noam Chomsky",
"There are three steps in the history of a great discovery. First, its opponents say that the discoverer is crazy; later that he is sane but that his discovery is of no real importance; and last, that the discovery is important but everybody has known it right along.  Sigmund Freud",
"He who asks is a fool for five minutes, but he who does not ask remains a fool forever. Chinese proverb",
"Heroism on command, senseless violence, and all the loathsome nonsense that goes by the name of patriotism -- how passionately I hate them! Albert Einstein",
"In business, the customer is always right. In banking, the customer is always the customer. In computer support, the customer is always an idiot.",
"A man's got to do what a man's got to do. A woman must do what he can't.  Rhonda Hansome",
"Nobody can make you feel inferior without your permission.  Eleanor Roosevelt",
"Apparently, a democracy is a place where numerous elections are held at great cost without issues and with interchangeable candidates.  Gore Vidal",
"Our greatest glory is not in never falling, but in rising every time we fall. Confucius",
"The important thing is not to stop questioning. Albert Einstein",
"How the mind works is still a mystery. We understand the hardware, but we don't have a clue about the operating system. James Watson",
"And remember, my sentimental friend, that a heart is not judged by how much you love, but by how much you are loved by others.  Professor Marvel, Wizard of Oz",
"So long as a subject seems dull, you can be sure that you are approaching it from the wrong angle.  W. W. Sawyer",
"If you start by trying to be perfect, you will get nowhere. The road to perfection is by way of making mistakes.  W. W. Sawyer",
"At present there are books which do really teach. It is better to spend hours searching a big library for such a book, rather than to read hundreds of books by second-rate authors.  W. W. Sawyer",
"Program testing can be used to show the presence of bugs but never to show their absence!   Edsger W. Dijkstra",
"The world's 500 richest people have more money than the annual earnings of the poorest 3 billion. George Monbiot",
"The only reward of virtue is virtue.  Ralph Waldo Emerson",
"Experience is the worst teacher. It always gives the test first and the instruction afterward.",
"Good judgement comes from experience. Experience comes from bad judgement.  Jim Horning",
"It is not enough to be busy; so are the ants. The question is: What are we busy about?  Henry David Thoreau"];
