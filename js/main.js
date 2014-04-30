$('#year-submit').click(function() {
	$('circle').remove()
	var year = $('#year').val()
	appendMap(year)
	return false;
})


var width = 1500
var height = 900

var svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height)
	.attr('id', 'chart')

var appendMap = function(year) {
	var latMin = d3.min(greenland, function(point) {
		return point.latitude
	})

	var lngMin = d3.min(greenland, function(point) {
		return point.longitude
	})

	var latMax = d3.max(greenland, function(point) {
		return point.latitude
	})

	var lngMax = d3.max(greenland, function(point) {
		return point.longitude
	})

	//calculated in maxHelper.rb
	var meltMax = 99

	var meltX = d3.scale.linear() 
		.domain([0, meltMax])
		.range(["white", "red"])

	var x = d3.scale.linear()
		.domain([lngMin, lngMax])
		.range([0, width])

	var y = d3.scale.linear()
		.domain([latMin, latMax])
		.range([height, 0])

	var meltProjection = d3.select('svg')
		.selectAll('circle')
		.data(greenland)

	meltProjection.enter()
		.append('circle')
		.attr('cx', function(d){
			return x(d.longitude)
		})
		.attr('cy', function(d){
			return y(d.latitude)
		})
		.attr('r', 3)
		.style('fill', function(d) {
			return meltX(d["year " + year])
		})
}













// var projection = d3.geo.mercator()
// 	.center([-72.00, 40.00])
// 	.scale(70000)
// 	.translate([(width)/2, (height)/2])

// var path = d3.geo.path()
// 	.projection(projection)

// var g = svg.append('g')

// g.append('g')
	

