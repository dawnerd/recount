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

    this.el.find('.cancel').bind('click', function(e){
      self.hideVoteBox(e);
    });

    this.el.find('.checkbar').bind('click', function(e){
      self.toggleCheckbar(this, e);
    });

    var storage = localStorage.getItem('vote-data') || '{}';
    this.userData = JSON.parse(storage);

    this.disablePolls();
  },
  showVoteBox: function(e) {
    if(e.preventDefault) e.preventDefault();

    var parent = $(e.target).closest('.projectContainer'),
        slider = parent.find('.slider'),
        siblings = parent.siblings()
        self = this;
      
    siblings.each(function(el){
      var _e = {target:el};
      self.hideVoteBox(_e);
    });

    slider.animate({marginLeft: '-308px', duration: 250});
  },
  hideVoteBox: function(e) {
    if(e.preventDefault) e.preventDefault();


    var target = $(e.target);
    if(!target.hasClass('projectContainer')) {
      var parent = $(e.target).closest('.projectContainer');
    } else {
      var parent = $(target);
    }
    
    var slider = parent.find('.slider');

    slider.animate({marginLeft: '0', duration: 250});
  },
  submitVotes: function(e) {
    var parent = $(e.target).closest('.projectContainer'),
        project_id = parent.attr('data-project'),
        votes = parent.find('a[data-status="selected"]');

    if(!this.userData.votes) this.userData.votes = [];

    for(var i = votes.length; i--;) {
      var vote = votes[i],
          poll_id = $(vote).attr('data-id');

      this.userData.votes.push(poll_id+':'+project_id);

      socket.emit("vote", {
        project_id: project_id,
        poll_id: poll_id
      });
    }

    localStorage.setItem('vote-data', JSON.stringify(this.userData));

    this.disablePolls();
  },
  toggleCheckbar: function(element, e) {
    if(e) e.preventDefault();

    var vote = $(element),
        status = vote.attr('data-status'),
        poll_id = vote.attr('data-id');

    $('.checkbar[data-id="'+poll_id+'"]').attr('data-status', '').removeClass('selected');

    if(!status || status === '') {
      vote.addClass('selected');
      vote.attr('data-status', 'selected');
    }
  },
  disablePolls: function() {
    if(this.userData.votes) {
      var votes = this.userData.votes;
      for(var i = votes.length; i--;) {
        var vote = votes[i],
            parts = vote.split(':'),
            poll_id = parts[0],
            project_id = parts[1];

        $('.projectContainer .checkbar[data-id="'+poll_id+'"]')
          .addClass('unavailable')
          .attr('data-status', 'unavailable');
        $('.projectContainer[data-project="'+project_id+'"] .checkbar[data-id="'+poll_id+'"]')
          .removeClass('unavailable')
          .addClass('voted')
          .attr('data-status', 'voted');
      }
    }
  }
});