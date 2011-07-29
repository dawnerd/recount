
/**
 * Module dependencies.
 */

var express = require('express'),
    io = require('socket.io'),
    projects = require('./config/projects'),
    polls = require('./config/polls'),
    app = module.exports = express.createServer(),
    io = io.listen(app),
    RedisStore = require('connect-redis')(express),
    jeb = require('./lib/jeb');


jeb = new jeb(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({ secret: "8497r8h3fkshjfhgo843y", store: new RedisStore }));
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
    polls: polls
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
  
});
