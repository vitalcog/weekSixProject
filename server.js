const chalk = require('chalk');

const express = require('express');

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const parse = require('body-parser');

const session = require('express-session');

const mustache = require('mustache-express');

const server = express();

const schema = require('./schema');

const Snippit = schema.Snip;

const User = schema.Bip;

//    ---   |||   ---   |||   ---   \\

server.use(express.static('./public'));

server.use(parse.urlencoded( { extended: false } ));

server.engine('mustache', mustache() );
server.set('views', './templates');
server.set('view engine', 'mustache');

//    ---   |||   ---   |||   ---   \\

mongoose.connect('mongodb://localhost:27017/items', {
  useMongoClient: true,
});



server.get('/Snipple', function(request, response) {
  response.render('html', {})
});


// Submitting a Snippet   ---   \\
server.post('/submitSnip', function(request, response) {
  const snip = new Snippit({
    title: request.body.title,
    language: request.body.language,
    body: request.body.body,
    description: request.body.description,
    tags: request.body.tags,
  });
  snip.save()
  .then(function() {
    response.redirect('/Snipple');
    console.log(snip.toObject() )
  })
});


// Searching for a Snippit  ---   \\
server.post('/findSnip', function(request, response) {

let search = {};
search[request.body.searchParam] = request.body.searchFor;

  Snippit.find(search)
  .then(function(snip) {
    response.render('html', {
      searchresults: snip,
    })
  })
});


// Displaying the Body of Code for a Snippit  ---   \\
server.get('/display/:id', function(request, response) {
  Snippit.findById(request.params.id)
  .then(function(snip) {
    response.render('html', {
      displayCode: snip
    })
  })
});


// Registering a New User  ---    \\
server.post('/login%3E', function(request, response) {
  const user = new User ({
    name: request.body.userName,
    password: request.body.userPass,
  })
  user.save()
  .then(function() {
    response.redirect('/Snipple');
    console.log(user.toObject() )
  })
});


// Creating a session
server.post('/login', function(request, response) {
  response.send('works so far...');
});



server.listen(3000);
