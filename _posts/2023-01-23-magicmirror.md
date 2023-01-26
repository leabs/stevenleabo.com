---
title: "I Coded a MagicMirror Module"
description: "I coded a MagicMirror module called MMM-urbandictionary that displays a random word from Urban Dictionary."
date: "2023-01-23"
tags: ['projects', 'open-source']
featured: true
image: "mirror.png"
layout: post
---

<figure>
  <img
    src="{{site.url}}/assets/images/blog/mirror.png"
    alt="MagicMirror GUI running on my laptop during development."
  />
  <figcaption>
    MagicMirror GUI running on my laptop during development.
  </figcaption>
</figure>

<p className="lead">
  I coded a MagicMirror module called MMM-urbandictionary that displays a random word from Urban Dictionary and updates every 3 minutes.
</p>

MagicMirror is a widely popular open source project that allows you to build a smart mirror using an old monitor and a Raspberry Pi. It is written in JavaScript and runs on Node.js. Its a great project to get started with open source and I highly recommend it. There are great examples of mirrors on reddit. It's a unique project that can't be purchased anywhere and mixes hardware and software.

<figure>
  <img
    src="{{site.url}}/assets/images/blog/mirror2.png"
    alt="My MagicMirror on display."
  />
  <figcaption>
   My MagicMirror on display.
  </figcaption>
</figure>

With MagicMirror you can display things like the weather, news, traffic data. I had the idea to display a random word from urbandictionary and was surprised when I checked github to find no one had made one yet. The words on urbandictionary are often funny and I thought it would be a fun addition to my mirror.

Urbandictionary exposes a route to their api that returns a random word https://api.urbandictionary.com/v0/random which made my job of fetching data super easy.

I went through the magicmirror dev documentation and added the required files and started with a hello world example to make sure I was getting some output from my module. Then I changed the header text, and started working on the simple javascript to get the data from the api and assign it to an array. I am no JS wizard, so there is likely a simpler way to do this, but I used async/await to fetch the data and assign it to variables, then returned the variables in an array.

```javascript
  getWord: async function () {
    const response = await fetch(this.config.apiBase);
    const json = await response.json();
    const word = json.list[0].word;
    const definition = json.list[0].definition;
    const example = json.list[0].example;
    const author = json.list[0].author;
    return [word, definition, example, author];
  }
  ```

  I then assigned innerHTML elements with the array data. This part is messy but I hope to clean it up later.

```javascript
getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = this.config.classes
      ? this.config.classes
      : "urban bright pre-line";
    //wrapper.innerHTML = this.config.word;
    this.getWord().then((response) => {
      wrapper.innerHTML =
        "<div class='urban-word'>" +
        response[0] +
        "</div>" +
        "Description: " +
        response[1] +
        "<br>" +
        "Example: " +
        response[2] +
        "<br>" +
        "Author: " +
        response[3];
    });
    //wrapper.innerHTML = this.config.word;
    return wrapper;
  }
  ```

  I've seen people use template engines like handlebars for this portion, and have a seperate template file, but I don't want to have the user need to npm install in the module folder as that requires another installation step. I like that this is so painless to get going. If you're interested in trying it out, check out the readme on github for install instructions.
