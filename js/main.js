$(document).ready(function() {

	$('.year-slide').on('input', function(event) {
		var year = this.value,
				range = 2013 - 1979,
				difference = year - 1979,
				position = (difference * 100 / range) - 1.5,
				yearText = $('#slide-text')
		yearText.text(year)
		yearText.css('left', position + '%')

		updateProjection(year)
	})

	var interval;

	$('#animation').click(function() {
		$('#animation').css('display', 'none')
		$('#stop-animation').css('display', 'block')
		var year = $('#slide-text').text()
		interval = setInterval(function() {
			if(year === 2014){
				year = 1979
			}
			updateProjection(year)

			var range = 2013 - 1979,
					difference = year - 1979,
					position = (difference * 100 / range) - 1.5,
					yearText = $('#slide-text')
			yearText.text(year)
			yearText.css('left', position + '%')
			document.querySelector('input[type=range]').value = year;
			$('#slide-text').text(year++)
		}, 250)
	})

	$('#stop-animation').click(function() {
		clearInterval(interval)
		$('#stop-animation').css('display', 'none')
		$('#animation').css('display', 'block')
	})


	appendMap(1979)
})

// $('#year-submit').click(function() {
// 	var submitYear = $('#year').val()
// 	if($('circle').length === 0) {
// 		appendMap(submitYear)	
// 	} else {
// 		updateProjection(submitYear)
// 	}
// 	return false;
// })



$(window).on('resize', function() {
	var chart = $('svg')
	var container = chart.parent()
	var targetWidth = container.width();
	if(Math.round(targetWidth / aspect) < window.innerHeight){
		chart.attr('width', targetWidth);
		chart.attr('height', Math.round(targetWidth / aspect));
	}
}).trigger('resize')


