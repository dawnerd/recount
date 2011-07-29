var ProjectController = $.Fidel.extend({
  init: function() {
    var self = this;

    this.el.find('.voteButton').bind('click', function(e){
      self.showVoteBox(e);
    });

    this.el.find('.doneButton').bind('click', function(e){
      self.hideVoteBox(e);
    });

  },
  showVoteBox: function(e) {
    if(e) e.preventDefault();

    var parent = $(e.target).closest('.projectContainer'),
        slider = parent.find('.slider');

    console.log(parent, slider)

    slider.animate({marginLeft: '-308px', duration: 250});
  },
  hideVoteBox: function(e) {
    if(e) e.preventDefault();

    var parent = $(e.target).closest('.projectContainer'),
        slider = parent.find('.slider');

    console.log(parent, slider)

    slider.animate({marginLeft: '0', duration: 250});
  }
});