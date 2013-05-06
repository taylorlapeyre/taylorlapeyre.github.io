---
layout: story
title: A Better Development Workflow with Vagrant
date: 2013-04-16
---

In this post, I'd like to tell you about how I have abstracted almost everything away from my computer using just a couple tools: git and vagrant.

#### So what's so great about Vagrant?

Anybody that knows me can tell you that I'm a neat freak when it comes to software and my development enviroment. Scattered binaries are a sickness to me, and it was only recently that I discovered the best medicine in the world for it - [vagrant][1].

I won't go into detail about how vagrant works, but concisely it is a utility that allows you to quickly maintain, create, run, and destroy disposable virtual machines. "But Taylor," you may ask, "why would this be useful to me, who has no need for fancy virtual machines?" The answer is that precisely configured VMs allow you to abstract almost every development tool away from your actual setup.

#### An Example

Say that I'm a developer that mainly works with PHP web frameworks, Rails, miscellaneous Ruby and Python projects, and is learning the [Clojure][2] programming language on the side. At the moment, I have...

- MAMP installed on my system for my PHP / database needs
- Various versions of ruby that I keep track of with rbenv (although I also have rvm installed from when I experimented with that)
- Rails installed as a gem (along with countless other gems)
- Python installed with virtualenv and other various utilities
- Clojure and Leiningen

This is a mess to me. In my opinion we should take all of these different developement utilities and consolidate them in a seperate system that is specifically configured for them. Vagrant lets us do this, and that's exactly what I did.

I made a new vagrant box called `develop.box` based on Ubuntu 12.04 x64, which contains all of the things listed above. These utilities and programs were installed in an organized way with [Chef][3], and configured specificaly for the VM.

To use all of these things for a certain project, I simply `cd` into the project directory and run `vagrant init develop`, forward my ports in the Vagrantfile if necessary, and boot up the system with `vagrant up`.

From then on, I can run all of my programs through the VM with `vagrant ssh`. If the project has extra dependencies, I simply specify them in the Vagrantfile for that project. Once I'm done developing for the day, I just `vagrant destroy` to erase all sign of the VM from my computer.

This setup also allows me to try out new languages, frameworks, CMS's, and more without muddying up my local computer.

#### Why This is Simpler

You may be thinking to yourself, "That's neat, but this is all terribly confusing and complicated. The original setup seemed much simpler!". In reality, once the VM has been saved as a box it makes my life about 130% simpler. Using a new machine? No problem, just install git and vagrant, copy over `develop.box`, and I have my entire development enviroment immediately at my fingertips.

So what *do* I keep on my computer? Well, my [editor][4] stays on my computer where I use it to manipulate all of my files exactly the same as I did before. Any changes get automatically mirrored over to my development VM. And that's about it. Everything else is nestled away in its VM, where it is far away from OSX's binaries.

My development box is available [here][5] if you'd like to download it, as well as a more lightweight LAMP setup for smaller projects.

Feel free to join the [HN discussion][6].

[1]: http://www.vagrantup.com/
[2]: http://clojure.org/
[3]: http://www.opscode.com/chef/
[4]: http://www.sublimetext.com/
[5]: http://files.taylorlapeyre.me/treasure/boxes/
[6]: https://news.ycombinator.com/item?id=5559856
