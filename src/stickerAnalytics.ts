
const valueToNameDict = {"likelihood_to_buy_more" : "Likelihood to Buy More Stickers",
"likelihood_to_put_more" : "Likelihood to Put on More Stickers",
"laptop" : "Laptop Brand",
"hometown_location": "Hometown",
"major": "Major",
"brand.name": "Sticker Brand"};

function makeHttpObject()
{
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

function simpleHttpRequest(url, success, failure)
{
    var request = makeHttpObject();
    request.open("GET", url, true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200)
                success(JSON.parse(request.responseText));
            else if (failure)
                failure(request.status, request.statusText);
        }
    };
}
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

    var barChartOptions : any = {
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
        },
        options: barChartOptions
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
