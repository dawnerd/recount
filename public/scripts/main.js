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

function colorChoices(target) {
  target = $(target);
  var numP = colors.length;
  target.each(function(){
    var p = 0;
    $('a.checkbar', this).each(function() {
      $(this).css({ 'color' : '#'+colors[p%numP]['colors'][0] });
      p++;  // next poll
    });
  });
}

if(colors!==undefined) {
  colorPolls('#Results .poll');
  colorChoices('#Projects .box');
}

socket.emit('getAllVotes');

socket.on('getAllVotes', function(data) {
	console.log(data);

	updateResults(data);
});


function updateResults(data) {
	for(var i = polls.length; i--;) {
		polls[i].count = 0;
	}


	for(var i = data.length; i--;) {
		for(var ii = polls.length; ii--;) {
			if(polls[ii].id == parseInt(data[i].poll_id)) {
				polls[ii].count += parseInt(data[i].count);
				//break;
			}
		}
		// for(var ii = projects.length; ii--;) {
		// 	if(projects[ii].id == parseInt(data[i].project_id)) {
		// 		projects[ii].count += parseInt(data[i].count);
		// 		//break;
		// 	}
		// }
	}

	for(var i = polls.length; i--;) {
		var poll = polls[i],
				poll_container = $('div[data-poll="'+poll.id+'"]');

		for(var ii = data.length; ii--;) {
			if(data[ii].poll_id != poll.id) continue;

			var project = data[ii],
					percent = Math.round(project.count / poll.count * 100);

			if(isNaN(percent) || !isFinite(percent)) {
				percent = '1px';
			} else {
				percent = percent+'%';
			}

			poll_container.find('dd[data-id="'+project.project_id+'"] .bar').animate({
				'width': percent
			});
		}
	}
}