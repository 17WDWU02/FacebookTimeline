//create a request to your config file
//ENTER YOUR ACCESS TOKEN BELLOW
var accessToken = "";

var Months = [
	{
		month: "January",
		count: 0
	},
	{
		month: "February",
		count: 0
	},
	{
		month: "March",
		count: 0
	},
	{
		month: "April",
		count: 0
	},
	{
		month: "May",
		count: 0
	},
	{
		month: "June",
		count: 0
	},
	{
		month: "July",
		count: 0
	},
	{
		month: "August",
		count: 0
	},
	{
		month: "September",
		count: 0
	},
	{
		month: "October",
		count: 0
	},
	{
		month: "November",
		count: 0
	},
	{
		month: "December",
		count: 0
	}
]

$.ajax({
	url: "https://graph.facebook.com/v2.10/me/feed?limit=100&access_token="+accessToken,
	dataType: "jsonp",
	success:function(DataFromFacebook){
		var posts = DataFromFacebook.data;
		for (var i = 0; i < posts.length; i++) {
			var date = new Date(posts[i].created_time);
			var month = date.getMonth();
			Months[month].count += 1;
		};
		console.log(Months);
		createGraph();
	},
	error:function(){
		console.log("something went wrong");
	}
})

function createGraph(){
	google.charts.load('current', {packages: ['corechart', 'line']});
	google.charts.setOnLoadCallback(drawBasic);

	function drawBasic(){
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Month');
		data.addColumn('number', 'Number of Posts');
		for (var i = 0; i < Months.length; i++) {
			data.addRow([Months[i].month, Months[i].count]);
		};

		var options = {
			hAxis:{
				title: 'Months of the Year'
			},
			vAxis:{
				title: 'Amount of Posts'
			}
		}

		var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}

}










