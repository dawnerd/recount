var events = require('events'),
    redis = require("redis"),
    client = redis.createClient();

function Jeb(app) {
  var self = this;

  this.vote = function vote(poll_id, project_id, cb) {
    client.incr('recount:vote:'+poll_id+':'+project_id);
    client.incr('recount:votetotal:'+poll_id);

    if(typeof cb === 'function') cb.apply(this);
    self.getVotes(poll_id, project_id, function(result) {
      self.emit('voted', [{poll_id: poll_id, project_id: project_id, count: result}]);
    });
  }

  this.getVotes = function getVotes(poll_id, project_id, cb) {
    client.get('recount:vote:'+poll_id+':'+project_id, function(err, result) {
      cb(result);
    });
  }
}

Jeb.prototype = new events.EventEmitter;
module.exports = Jeb;