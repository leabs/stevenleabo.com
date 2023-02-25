---
title: "Adding API keys to a Jekyll site"
description: "I came up with a creative ways to call sensitive data like API keys within a Jekyll site without a node package."
date: "2023-02-25"
tags: ["jekyll"]
featured: true
layout: post
---
I've been working on a Jekyll site for a while now, and I've been trying to figure out how to call sensitive data from the site. I've seen a few different ways to do this, but I wanted to share my own method.

Adding `env.yml` to the `_data` folder allows me to call API data using Jekyll's liquid templating engine with the `site.data` call. Since the file is in the `_data` folder, it's not included in the build process, so it's not publicly accessible. I can then call the data using `site.data.env.API_KEY_NAME` and add `_data/env.yml` to my `.gitignore` file. I'll also add `env-example.yml` to the `_data` folder so that I can share the structure of the file with others.

I'm using this to store my Google API key for the youtube video embeds on the site. I spent a lot of time trying to figure out how to do this, but most places recommended using a node package to do this. I wanted to keep it simple, so I went with this method that is jekyll/Ruby friendly.