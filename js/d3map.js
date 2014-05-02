var width = 800
var height = 600
var aspect = width/height
var backgroundColor = "white"

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

// calculated in maxHelper.rb
var meltMax = 160


var meltX = d3.scale.linear() 
	.domain([0, meltMax/2, meltMax])
	.range(["#e4eaf5", "yellow", "red"])

var x = d3.scale.linear()
	.domain([lngMin, lngMax])
	.range([0, width])

var y = d3.scale.linear()
	.domain([latMin, latMax])
	.range([height, 0])

var arrowX = d3.scale.linear()
	.domain([0, 100])
	.range([10, 90])

var tickScale = d3.scale.linear()
	.domain([meltMax, 0])
	.range([8, 568])


var appendMap = function(year) {


	var meltProjection = d3.select('svg')
		.selectAll('circle')
		.data(greenland)

	//append melt circles to svg
	meltProjection.enter()
		.append('circle')
		.attr('cx', function(d){
			return x(d.longitude)
		})
		.attr('cy', function(d){
			return y(d.latitude)
		})
		.attr('r', 3)
		.attr('class', 'data')
		.on('mouseover', function(d) {
			var days = (d["year " + year])
			var text;
			if(days === 1){
				text = "1 Day"
			} else {
				text = days + " Days"
			}

			var position = arrowX((days / 160) * 100)
			$('#arrow').animate({
				left: position + '%'}, 10)
			$('#new-day-text').text(text)
			// $('#new-day-text').animate({left: position + '%'}, 10)
			console.log(position)

			d3.select('#key-tick').attr('y', function(){
				return tickScale(days)
			})
		})
		.style('fill', function(d) {
			if(d["year " + year] === 0){
				return backgroundColor
			} else {
				return meltX(d["year " + year])			
			}
		})

	//append number of melt days to svg
	d3.select('svg')
		.append('text')
		.text('')
		.attr('width', 100)
		.attr('height', 150)
		.attr('x', 600)
		.attr('y', 350)
		.attr('id', 'day-text')
		.style('font-size', '3em')
		.style('fill', 'white')

	//appends key div to svg
	d3.select('svg')
		.append('foreignObject')
		.attr('width', 200)
		.attr('height', 1000)
		.attr('x', 25)
		.attr('y', 60)
		.append('xhtml:div')
		.attr('class', 'key-proj')

	//appends key min text to svg
	d3.select('svg')
		.append('foreignObject')
			.attr('width', 100)
			.attr('height', 100)
			.attr('x', 0)
			.attr('y', 600)
			.append('xhtml:p')
			.attr('id', 'key-min')
			.attr('class', 'key-text')
			.text('0')
			.style('font-size', '2em')

	//appends key max text to svg
	d3.select('svg')
		.append('foreignObject')
			.attr('width', 100)
			.attr('height', 100)
			.attr('x', -35)
			.attr('y', 50)
			.append('xhtml:p')
			.attr('id', 'key-max')
			.attr('class', 'key-text')
			.text('160')
			.style('font-size', '2em')

	//appends tick to key scale
	d3.select('svg')
		.append('foreignObject')
		.attr('width', 300)
		.attr('height', 100)
		.attr('x', 2)
		.attr('y', 568)
		.attr('id', 'key-tick')
		.append('xhtml:p')
		.text('—')
		.style('font-size', '5em')
}

var updateProjection = function(year) {

	d3.selectAll('.data')
		.on('click', function(d) {
			var days = (d["year " + year])
			var text;
			if(days === 1){
				text = "1 Day"
			} else {
				text = days + " Days"
			}

			var position = (days / 160) * 100
			$('#arrow').animate({
				left: position + '%'})
			$('#new-day-text').text(text)
			console.log(position)
		})
		.style('fill', function(d) {
			if(d["year " + year] === 0){
				return backgroundColor
			} else {
				return meltX(d["year " + year])			
			}
		})
}


