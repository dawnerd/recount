var project = new ProjectController({ el: $('#Projects') });

function colorPolls(target) {
  target = $(target);
  var numP = colors.length;
  var numC = colors[0]['colors'].length;
  var p = 0;
  target.each(function(){
    var b = 0;
    $('.bar', this).each(function() {
      $(this).css({ 'background-color' : '#'+colors[p%numP]['colors'][b%numC] });
      b++;
    });
    p++;  // next poll
  });
}

if(colors!==undefined && $('#Results').length>0) {
  colorPolls('#Results .poll');
}