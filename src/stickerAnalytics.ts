
const valueToNameDict = {"likelihood_to_buy_more" : "Likelihood to Buy More Stickers",
"likelihood_to_put_more" : "Likelihood to Put on More Stickers",
"laptop" : "Laptop Brand",
"hometown_location": "Hometown",
"major": "Major",
"brand.name": "Sticker Brand"};

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
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}
function refreshGraph()
{
    var xAxis = <HTMLInputElement> document.getElementById("xaxis");
    var xAxisValue = xAxis.value;
    var yAxis = <HTMLInputElement> document.getElementById("yaxis");
    var yAxisValue = yAxis.value;
    simpleHttpRequest("/api/" + xAxisValue + "/" + yAxisValue, createChart, console.log);
}

//simpleHttpRequest("/api/major/likelihood_to_put_more", createChart, console.log);
