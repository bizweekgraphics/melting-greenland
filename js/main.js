var width = 1000
var height = 1000

var svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height)

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

var x = d3.scale.linear()
	.domain([lngMin, lngMax])
	.range([0, width])

var y = d3.scale.linear()
	.domain([latMin, latMax])
	.range([0, height])

var meltProjection = d3.select('svg')
	.selectAll('square')
	.data(greenland)

meltProjection.enter()
	.append('rect')
	.attr('x', 10)
	.attr('y', 10)
	.attr('width', 10)
	.attr('height', 10)

















// var projection = d3.geo.mercator()
// 	.center([-72.00, 40.00])
// 	.scale(70000)
// 	.translate([(width)/2, (height)/2])

// var path = d3.geo.path()
// 	.projection(projection)

// var g = svg.append('g')

// g.append('g')
	

