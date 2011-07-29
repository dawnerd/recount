var events = require('events'),
    redis = require("redis"),
    client = redis.createClient();

function Jeb() {
  var self = this;

  this.vote = function vote(poll_id, project_id, cb) {
    console.log('Voting - HAH!');
    client.incr(poll_id+':'+project_id);

    if(typeof cb === 'function') cb.apply(this);
    self.emit('voted', [{poll_id: poll_id, project_id: project_id}]);
  }
}

Jeb.prototype = new events.EventEmitter;
module.exports = Jeb;