var ProjectController = $.Fidel.extend({
  init: function() {
    var self = this;

    this.el.find('.voteButton').bind('click', function(e){
      self.showVoteBox(e);
    });

    this.el.find('.doneButton').bind('click', function(e){
      self.hideVoteBox(e);
      self.submitVotes(e);
    });

    this.el.find('.checkbar').bind('click', function(e){
      self.toggleCheckbar(this, e);
    });

  },
  showVoteBox: function(e) {
    if(e) e.preventDefault();

    var parent = $(e.target).closest('.projectContainer'),
        slider = parent.find('.slider');

    slider.animate({marginLeft: '-308px', duration: 250});
  },
  hideVoteBox: function(e) {
    if(e) e.preventDefault();

    var parent = $(e.target).closest('.projectContainer'),
        slider = parent.find('.slider');

    slider.animate({marginLeft: '0', duration: 250});
  },
  submitVotes: function(e) {
    var parent = $(e.target).closest('.projectContainer'),
        project_id = parent.find('.project').attr('data-project'),
        votes = parent.find('a[data-status="selected"]');

    for(var i = votes.length; i--;) {
      socket.emit("vote", {
        project_id: project_id,
        poll_id: $(votes[i]).attr('data-id')
      });
    }
  },
  toggleCheckbar: function(element, e) {
    if(e) e.preventDefault();

    var vote = $(element),
        status = vote.attr('data-status');

    if(status === 'selected') {
      vote.removeClass('selected');
      vote.attr('data-status', '');
    } else {
      vote.addClass('selected');
      vote.attr('data-status', 'selected');
    }
  }
});