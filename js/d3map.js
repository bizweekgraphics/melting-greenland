var margin = {top: 0, right: 0, bottom: 0, left: 0}
var padding = {top: 0, right: 0, bottom: 0, left: 0}
var outerWidth = 500
var outerHeight = 600
var innerWidth = outerWidth - margin.left - margin.right
var innerHeight = outerHeight - margin.top - margin.bottom
var width = innerWidth - padding.left - padding.right
var height = innerHeight - padding.top - padding.bottom
var aspect = width/height
var backgroundColor = "rgba(255, 255, 255, 0)"

var svg = d3.select('.chart-wrapper').append('svg')
	.attr('width', '100%')
	.attr('height', '100%')
	.attr('id', 'chart')
	.attr('viewBox', '0 0 ' + width + ' ' + height)
	.attr('preserverAspectRatio', 'xMinYMin')

// calculated in maxHelper.rb
var meltMax = 160

//gradient scale for melt circles
var meltX = d3.scale.linear() 
	.domain([0, meltMax/2, meltMax])
	.range(["#e4eaf5", "yellow", "red"])

//scale to calculate position of key tick marker
var tickScale = d3.scale.linear()
	.domain([meltMax, 0])
	.range([221, 23])

//scale to calculate position of day text underneath tick marker
var keyTextScale = d3.scale.linear()
	.domain([meltMax, 0])
	.range([218, 23])


var appendMap = function(year) {

	var projection = d3.geo.transverseMercator()
		.center([-20, 78])
		.scale(1200)
		.rotate([35, 6, 23])

	var path = d3.geo.path()
		.projection(projection)

	svg.append('g')
		.attr('id', 'greenland')
		.selectAll('path')
		.data(greenlandMap.features)
		.enter().append('path')
		.attr('d', path)
		.style('fill', backgroundColor)

	var meltProjection = d3.select('.chart-wrapper svg')
		.selectAll('circle')
		.data(greenland)

	//append melt circles to svg
	meltProjection.enter()
		.append('circle')
		.attr('cx', function(d) {
			return projection([d.longitude, d.latitude])[0]
		})
		.attr('cy', function(d) {
			return projection([d.longitude, d.latitude])[1]
		})
		.attr('r', 2.5)
		.attr('class', 'data')
		.on('mouseover', function(d) {
			var days = (d["year " + year])

			d3.select('#key-tick').attr('x', function(){
				return tickScale(days)
			})

			d3.select('#key-text').attr('x', function() {
				return keyTextScale(days)
			})
			d3.select('#key-text').text(days)
		})
		.style('fill', function(d) {
			if(d["year " + year] === 0){
				return backgroundColor
			} else {
				return meltX(d["year " + year])			
			}
		})

	//appends gradient key/div
	d3.select('.chart-wrapper svg')
		.append('foreignObject')
		.attr('width', 200)
		.attr('height', 50)
		.attr('x', 23)
		.attr('y', 400)
		.append('xhtml:div')
		.attr('class', 'key-proj')

	//appends key tick marker and number of days text element
	d3.select('.chart-wrapper svg')
		.append('text')
		.attr('width', 300)
		.attr('height', 300)
		.attr('x', 23)
		.attr('y', 460)
		.attr('id', 'key-tick')
		.text('▲')
		.style('font-size', '2em')
		.style('text-anchor', 'middle')
		.append('tspan')
		.attr('width', 300)
		.attr('height', 100)
		.attr('x', 23)
		.attr('y', 500)
		.attr('id', 'key-text')
		.attr('class', 'key')
		.text('0')
		.style('font-size', '1.2em')
		.style('font-family', 'BWHaasRegular')
		.style('text-anchor', 'middle')



	//appends key explanation text
	// d3.select('svg')
	// 	.append('text')
	// 	.text('Days Where Melting')
	// 	.attr('width', 200)
	// 	.attr('height', 150)
	// 	.attr('x', 135)
	// 	.attr('y', 360)
	// 	.attr('class', 'key-text')
	// 	.style('text-anchor', 'middle')
	// 	.append('tspan')
	// 	.attr('x', 135)
	// 	.attr('y', 385)
	// 	.text('Was Observed')
	// 	.style('text-anchor', 'middle')


	//appending dek to svg
	var dekIncrement = 30
	var dekBase = 90

	d3.select('.chart-wrapper svg')
		.append('text')
		.text('But')
		.attr('width', 200)
		.attr('height', 150)
		.attr('x', 123)
		.attr('y', dekBase)
		.attr('class', 'dek-text')
		.style('text-anchor', 'middle')
		.append('tspan')
		.attr('x', 123)
		.attr('y', dekBase + dekIncrement)
		.text("a melting icesheet")
		.append('tspan')
		.attr('x', 123)
		.attr('y', dekBase + dekIncrement*2)
		.text("means big business")
		.append('tspan')
		.attr('x', 123)
		.attr('y', dekBase + dekIncrement*3)
		.text("for Greenland's")
		.append('tspan')
		.attr('x', 123)
		.attr('y', dekBase + dekIncrement*4)
		.text("mineral industry")
		.append('tspan')
		.text('Days Where Melting')
		.attr('width', 200)
		.attr('height', 150)
		.attr('x', 123)
		.attr('y', 360)
		.attr('class', 'key-text')
		.style('text-anchor', 'middle')
		.append('tspan')
		.attr('x', 123)
		.attr('y', 390)
		.text('Was Observed')
		.style('text-anchor', 'middle')
		.append('tspan')
		.attr('x', 10)
		.attr('y', 425)
		.text('0')
		.append('tspan')
		.attr('x', 245)
		.attr('y', 425)
		.text('160')


	d3.select('.chart-wrapper svg')
		.append('foreignObject')
		.attr('width', 200)
		.attr('height', 50)
		.attr('x', 58)
		.attr('y', 220)
		.append('xhtml:button')
		.text('Learn More')
		.attr('class', 'button')
		.on('click', function() {
			window.location.href='http://www.businessweek.com/articles/2014-05-01/dig-while-the-sun-shines';
		})

	// d3.select('.chart-wrapper svg')
	// 	.append('text')
	// 	.text('1979')
	// 	.attr('width', 100)
	// 	.attr('height', 30)
	// 	.attr('x', -50)
	// 	.attr('y', 20)
	// 	.attr('id', 'first-year')
	// 	.attr('class', 'year')

	// d3.select('.chart-wrapper svg')
	// 	.append('text')
	// 	.text('2013')
	// 	.attr('width', 100)
	// 	.attr('height', 30)
	// 	.attr('x', 505)
	// 	.attr('y', 20)
	// 	.attr('id', 'last-year')
	// 	.attr('class', 'year')



}


//updates circle colors when viewing a different year
var updateProjection = function(year) {

	d3.selectAll('.data')
		.on('mouseover', function(d) {
			var days = (d["year " + year])

			d3.select('#key-tick').attr('x', function(){
				return tickScale(days)
			})

			d3.select('#key-text').attr('x', function() {
				return keyTextScale(days)
			})
			d3.select('#key-text').text(days)
		})
		.style('fill', function(d) {
			if(d["year " + year] === 0){
				return backgroundColor
			} else {
				return meltX(d["year " + year])			
			}
		})
}


