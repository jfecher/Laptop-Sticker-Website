
const valueToNameDict = {"likelihood_to_buy_more" : "Likelihood to Buy More Stickers",
"likelihood_to_put_more" : "Likelihood to Put on More Stickers",
"laptop" : "Laptop Brand",
"hometown_location": "Hometown",
"major": "Major",
"numStickers": "Average Number of Stickers",
"laptop_purchased_dt": "Purchase Date of Laptop",
"gender": "Gender"};


var myChart;

function createChart(sqlResults)
{
    if (myChart)
    {
        myChart.destroy();
    }

    var chart = <HTMLCanvasElement> document.getElementById("myChart");
    var chartContext = chart.getContext('2d');
    var xAxis = <HTMLInputElement> document.getElementById("xaxis");
    var xAxisValue = xAxis.value;

    if (xAxis.value != "laptop_purchased_dt") {
        const barChartOptions : any = {
            scaleShowVerticalLines:true,
            responsive:true,
            scales:
            {
                yAxes:
                [{
                    ticks:
                    {
                        beginAtZero: true
                    }
                }]
            }};


    myChart = new Chart(chartContext, {
        type: 'bar',
        data: {
            labels: sqlResults.xValues,
            datasets: [{
                label: valueToNameDict[xAxisValue],
                data: sqlResults.yValues,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: barChartOptions
        });
    } else {
        const scatterPlotOptions : any = {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            month: 'MMM YYYY'
                        }
                    },
                    position: 'bottom'
                }],
                yAxes: [{
                    type: 'linear',
                    ticks:
                    {
                        beginAtZero: true
                    }
                }]
            }};
        myChart = new Chart(chartContext, {
            type:  'scatter',
            data: {
               datasets: [{
                   label: valueToNameDict[xAxisValue],
                   data: sqlResults,
                   backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                   borderColor: ['rgba(255,99,132,1)']
               }]
           },
           options: scatterPlotOptions
       });
    }
}
function refreshGraph()
{
    var xAxis = <HTMLInputElement> document.getElementById("xaxis");
    var xAxisValue = xAxis.value;
    var yAxis = <HTMLInputElement> document.getElementById("yaxis");
    var yAxisValue = yAxis.value;
    var sort = <HTMLInputElement> document.getElementById("sort");
    var sortValue = sort.value;
    simpleHttpRequest("/api/" + xAxisValue + "/" + yAxisValue + "/" + sortValue, createChart, console.log);
}

//simpleHttpRequest("/api/major/likelihood_to_put_more", createChart, console.log);
