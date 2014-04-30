
// var maxMeltArray = []

// var calcMax = function() {
// 	for (var i=1973;i<2014;i++) {
// 		var dfd = new jQuery.Deferred();
// 		var max = d3.max(greenland, function(point) {
// 			return point["year" + year]
// 		})
// 		dfd.resolve(max)
// 	}
// 	return dfd.promise()
// }

// $.when(calcMax() ).then(
// 	function(status) {
// 		maxMeltArray
// 	})


var meltMaxInt;

var calcMax = function(year) { 
	var max = d3.max(greenland, function(point) {
		return point["year" + year]
	})
}

setMax = calcMax(2000).then(function(data) {
	console.log(data)
})

