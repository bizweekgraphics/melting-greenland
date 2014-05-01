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
		})
		.style('fill', 'black')
		.transition()
		.duration(500)
		.delay(100)
		.style('fill', function(d) {
			if(d["year " + year] === 0){
				return backgroundColor
			} else {
				return meltX(d["year " + year])			
			}
		})


	var textProjection = d3.select('svg')
		.selectAll('text')
		.data([1])

	//append year text to svg
	// textProjection.enter()
	// 	.append('text')
	// 	.text(year)
	// 	.attr('width', 400)
	// 	.attr('height', 200)
	// 	.attr('x', 180)
	// 	.attr('y', 50)
	// 	.attr('id', 'text-year')
	// 	.style('fill', 'white')
	// 	.style('font-size', 55)

	//append sun to svg
	// d3.select('svg')
	// 	.append('circle')
	// 	.attr('cx', 700)
	// 	.attr('cy', 90)
	// 	.attr('r', 80)
	// 	.attr('id', 'sun')
	// 	.attr('class', 'bright-fill')
	// 	.style('fill', 'yellow')

	// d3.select('svg')
	// 	.append('text')
	// 	.text('test')
	// 	.attr('width', 100)
	// 	.attr('height', 150)
	// 	.attr('x', 685)
	// 	.attr('y', 100)
	// 	.attr('id', 'day-text')
	// 	.style('font-size', '2em')

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

	var years = [1979, 1995, 2012]

	var buttonProjection = d3.select('svg')
		.selectAll('.year-button')
		.data(years)

	//append year click buttons to svg
	// buttonProjection.enter()
	// 	.append('foreignObject')
	// 	.attr('width', 200)
	// 	.attr('height', 200)
	// 	.attr('x', 10)
	// 	.attr('y', function(d){
	// 		var y = years.indexOf(d)
	// 		return 200 + (100 * y)
	// 	})
	// 	.append('xhtml:body')
	// 	.append('xhtml:ul')
	// 	.attr('class', 'year-ul')
	// 	.append('xhtml:li')
	// 	.on('click', function() {
	// 		$('#day-text').text('')
	// 		$('#arrow').animate({left: "0%"}, 1000)

	// 		//select button inside list element
	// 		var button = $(this).children()
	// 		$('button').removeClass()

	// 		var liYear = this.textContent
	// 		if($('circle').length === 0) {
	// 			appendMap(liYear)	
	// 		} else {
	// 			updateProjection(liYear)
	// 		}

	// 		if(liYear === "1979"){
	// 			button.addClass('bright')
	// 		} else if(liYear == "1995") {
	// 			button.addClass('brighter')
	// 		} else {
	// 			button.addClass('brightest')
	// 		}
	// 	})
	// 	.append('xhtml:button')
	// 	.attr('width', '200px')
	// 	.attr('class', function(d){
	// 		if(d === 1979){
	// 			return 'bright'
	// 		}
	// 	})
	// 	.style('color', 'black')
	// 	.text(function(d){
	// 		return d
	// 	})

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

	d3.selectAll('#text-year')
		.text(year)

	// d3.select('#sun')
	// 	.transition()
	// 	.duration(1000)
	// 	.delay(100)
	// 	.style('fill', function() {
	// 		var text = d3.select('#text-year').text()
	// 		$('#sun').attr('class', '')
	// 		if(text === "1979"){
	// 			$('#sun').attr('class', 'bright-fill')
	// 			return 'yellow'
	// 		} else if(text==="1995") {
	// 			$('#sun').attr('class', 'brighter-fill')
	// 			return 'orange'
	// 		} else {
	// 			$('#sun').attr('class', 'brightest-fill')
	// 			return 'red'
	// 		}
	// 	})

	// var text = d3.select('#text-year').text()
	// 	if(text === "1979"){
	// 		$('#sun').attr('class', 'bright-fill')
	// 		return 'yellow'
	// 	} else if(text==="1995") {
	// 		$('#sun').attr('class', 'brighter-fill')
	// 		return 'orange'
	// 	} else {
	// 		$('#sun').attr('class', 'brightest-fill')
	// 		return 'red'
	// 	}
}


