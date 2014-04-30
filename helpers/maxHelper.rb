require 'csv'
require 'pry'

max_array = []

CSV.foreach('../greenlandmeltmaps.csv') do |row|
	max_array << row.max.to_i
end
binding.pry

max = max_array.max


puts max

#max = 99