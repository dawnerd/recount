var events = require('events');

function Jeb() {
  var self = this;

  var fakeStorage = {};

  this.vote = function vote(poll_id, project_id, cb) {
    console.log('Voting - HAH!')
    self.emit('voted', [{poll_id: poll_id, project_id: project_id}]);
  }
}

Jeb.prototype = new events.EventEmitter;
module.exports = Jeb;