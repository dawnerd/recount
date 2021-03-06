
/**
 * Module dependencies.
 */

var express = require('express'),
    io = require('socket.io'),
    projects = require('./config/projects'),
    polls = require('./config/polls'),
    colors = require('./config/colors'),
    app = module.exports = express.createServer(),
    io = io.listen(app),
    jeb = require('./lib/jeb');


jeb = new jeb(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Recount',
    projects: projects,
    polls: polls,
    colors: colors
  });
});

app.get('/results', function(req, res){
  res.render('results', {
    title: 'Results',
    projects: projects,
    polls: polls,
    colors: colors
  });
});

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
  socket.on("vote", function(data){
    jeb.vote(data.poll_id, data.project_id)
  });

  socket.on('getAllVotes', function(data) {
    jeb.getAllVotes();
  });

  jeb.on('voted', function(data) {
    socket.emit('votes', data);
    jeb.getAllVotes();
  });

  jeb.on('getAllVotes', function(data) {
    socket.emit('getAllVotes', data);
  });
});