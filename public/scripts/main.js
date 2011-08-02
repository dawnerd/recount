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