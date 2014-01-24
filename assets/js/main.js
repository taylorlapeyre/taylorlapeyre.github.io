(function() {

	var Terminal = {
		el: document.querySelector('.terminal'),
		history: [],

		initialize: function() {
			this.el.addEventListener('keydown', function(event) {
				console.log(event.keyCode)
				if (event.keyCode == 13) {
					Terminal.readInput();
					event.preventDefault();
				} else if (event.keyCode == 38) {
					event.preventDefault();
					var words = Terminal.el.value.split("\n");
					var tmp = words.slice(0, words.length - 1);
					tmp.push(Terminal.history[Terminal.history.length]);
					Terminal.value = tmp.join("\n");
				}
			});

			this.run.help();
		},

		readInput: function() {
			var lines     = this.el.value.split("\n");
			var words     = lines[lines.length - 1].split(' ');
			var command   = words[1];
			var arguments = words.slice(2, words.length);

			this.history.push(words.join(' '));
			console.log(this.history);

			if (command in this.run) {
				this.run[command](arguments);
			}
		},

		addLine: function(text) {
			this.el.value = this.el.value + "\n" + text + "\n";
		},

		respond: function(text) {
			this.el.value = this.el.value + "\n" + text + "\n> ";
			this.el.scrollTop = this.el.scrollHeight - this.el.offsetHeight;
		},

		run: {
			print: function(arguments) {
				Terminal.respond(arguments.join(' '));
			},

			message: function(arguments) {
				var str = 'http://mail.google.com/mail/?view=cm&fs=1'+
				    '&to=hello@taylorlapeyre.com' +
				    '&su=Hello!' +
				    '&body=' + arguments.join(' ') +
				    '&ui=1';
				location.href = str;
			},

			open: function(arguments) {
				var keywordToUrl = {
					home: '/',
					about: '/about',
					twitter: 'https://twitter.com/taylorlapeyre',
					writing: 'https://medium.com/@taylorlapeyre/latest',
					github: 'https://github.com/taylorlapeyre'
				}

				for (var i = 0; i < arguments.length; i++) {
					window.open(keywordToUrl[arguments[i]], '_blank');
					Terminal.respond('Opened in a new tab');
				}
			},

			help: function(arguments) {
				Terminal.el.value = '';
				helpText  = "Welcome to Taylor Lapeyre's website terminal.";
				helpText += "\n  print [something]:";
				helpText +=	"\n    Print [something] to the screen.";
				helpText += "\n  message [content]:";
				helpText += "\n    Send an email to Taylor Lapeyre with the body [content].";
				helpText += "\n  open [location]:";
				helpText += "\n    Go to [location]. Example: home, twitter, stories, about, github)";
				Terminal.respond(helpText);
			}
		}
	};

	Terminal.initialize();

})();
