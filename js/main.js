var width = 1000
var height = 1000

var svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height)

var projection = d3.geo.mercator()
	.center([-72.00, 40.00])
	.scale(70000)
	.translate([(width)/2, (height)/2])

var path = d3.geo.path()
	.projection(projection)

var g = svg.append('g')