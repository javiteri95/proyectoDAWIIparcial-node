$(document).ready(function(){
	console.log("usando para chart.js")
});
function graficoPorcurso(paralelo){
	var chartHelper = {
	createChart: function (canvasId, chartType, data, options) {
	var ctx = $("#" + canvasId).get(0).getContext("2d");
	return new Chart(ctx)[chartType](data, options);
	},
	}
	var ctx = document.getElementById("myChart");
	var options = {
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
}
}