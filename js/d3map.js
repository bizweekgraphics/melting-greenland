var width = 800
var height = 600
var aspect = width/height

var svg = d3.select('.chart-wrapper').append('svg')
	.attr('width', '100%')
	.attr('height', '100%')
	.attr('id', 'chart')
	.attr('viewBox', '0 0 800 800')
	.attr('preserverAspectRatio', 'xMinYMin')

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
	.domain([0, meltMax/2, meltMax])
	.range(["white", "yellow", "red"])

var x = d3.scale.linear()
	.domain([lngMin, lngMax])
	.range([0, width])

var y = d3.scale.linear()
	.domain([latMin, latMax])
	.range([height, 0])

var appendMap = function(year) {

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
		.style('fill', 'white')
		.transition()
		.duration(500)
		.delay(100)
		.style('fill', function(d) {
			return meltX(d["year " + year])
		})

	var textProjection = d3.select('svg')
		.selectAll('text')
		.data([1])

	textProjection.enter()
		.append('text')
		.text(year)
		.attr('width', 400)
		.attr('height', 200)
		.attr('x', 180)
		.attr('y', 50)
		.style('fill', 'black')
		.style('font-size', 55)

	// d3.select('svg')
	// 	.append('circle')
	// 	.attr('cx', 700)
	// 	.attr('cy', 90)
	// 	.attr('r', 80)
	// 	.attr('id', 'sun')
	// 	.style('fill', 'yellow')
}

var updateProjection = function(year) {

	d3.selectAll('circle')
		.transition()
		.duration(1000)
		.delay(100)
		.style('fill', function(d) {
			return meltX(d["year " + year])
		})

	d3.selectAll('text')
		.text(year)
}