$(document).ready(function() {
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

$('.year-ul li').click(function() {

	$('#day-text').text('')

	//select button inside list element
	var button = $(this).children()
	$('button').removeClass()

	var liYear = this.textContent
	if($('circle').length === 0) {
		appendMap(liYear)	
	} else {
		updateProjection(liYear)
	}

	if(liYear === "1979"){
		button.addClass('bright')
	} else if(liYear == "1995") {
		button.addClass('brighter')
	} else {
		button.addClass('brightest')
	}

})

$(window).on('resize', function() {
	var chart = $('svg')
	var container = chart.parent()
	var targetWidth = container.width();
	chart.attr('width', targetWidth);
	chart.attr('height', Math.round(targetWidth / aspect));
}).trigger('resize')


$('circle').click(function() {
	alert('test')
})
