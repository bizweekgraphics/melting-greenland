$(document).ready(function() {
	appendMap(1979)
})

$('#year-submit').click(function() {
	var submitYear = $('#year').val()
	if($('circle').length === 0) {
		appendMap(submitYear)	
	} else {
		updateProjection(submitYear)
	}
	return false;
})

$('li').click(function() {
	var liYear = this.textContent
	if($('circle').length === 0) {
		appendMap(liYear)	
	} else {
		updateProjection(liYear)
	}
})

$(window).on('resize', function() {
	var chart = $('svg')
	var container = chart.parent()
	var targetWidth = container.width();
	chart.attr('width', targetWidth);
	chart.attr('height', Math.round(targetWidth / aspect));
}).trigger('resize')



