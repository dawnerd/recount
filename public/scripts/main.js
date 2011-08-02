var project = new ProjectController({ el: $('#Projects') });

if(colors!==undefined) {
	// assume colors already exists
	var target = $('#Results .poll');
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

socket.emit('getAllVotes');

socket.on('getAllVotes', function(data) {
	console.log(data);

	updateResults(data);
});


function updateResults(data) {
	console.log(data)
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
					percent = Math.round(poll.count / project.count * 100);

			if(isNaN(percent) || !isFinite(percent)) {
				percent = '1px';
			} else {
				percent = percent+'%';
			}

			console.log(poll.count, project.count, percent)

			poll_container.find('dd[data-id="'+project.project_id+'"] .bar').animate({
				'width': percent
			});
		}
	}
}