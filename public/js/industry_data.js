$(document).ready(function () {

    // Configure and setup Chart
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawJobOpportunityGraph);
    google.charts.setOnLoadCallback(drawEmploymentGrowthRateGraph);

    $(window).resize(function () {
        drawJobOpportunityGraph();
        drawEmploymentGrowthRateGraph();
    })

    //Initialize selection bar
    $('select').formSelect(); 

})

// Draw Job Opportunity Graph
function drawJobOpportunityGraph() {
    var chartElement = document.getElementById('jobPredictionGraph')
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Medicine', ],
        ['2019', 165, ],
        ['2020', 135, ],
        ['2021', 157, ],
        ['2022', 139, ],
        ['2023', 136, ],
    ]);

    var options = {
        title: 'Annual Employment Growth Within Industry',
        width: "100%",
        height: $(window).height() * 0.75,
        legend: 'bottom',
        vAxis: {
            title: 'Cups',
            minValue: 0
        },
        hAxis: {
            title: 'Year'
        },
        seriesType: 'bars',
        series: {
            1: {
                type: 'line'
            }
        },
        colors: ["#8C04A8"],
        animation: {
            startup: true,
            duration: 500,
            easing: 'linear'
        }
    };

    var chart = new google.visualization.ComboChart(chartElement);
    chart.draw(data, options);
}

// Draw Employment Growth Graph
function drawEmploymentGrowthRateGraph() {
    var chartElement = document.getElementById('employmentGrowthGraph')
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Medicine'],
        ['2019', 165, ],
        ['2020', 135, ],
        ['2021', 157, ],
        ['2022', 139, ],
        ['2023', 136, ],
    ]);

    var options = {
        title: 'Annual Employment Growth Within Industry',
        legend: 'bottom',
        width: "100%",
        height: $(window).height() * 0.75,
        vAxis: {
            minValue: 0,
            title: 'Cups'
        },
        hAxis: {
            title: 'Year'
        },
        seriesType: 'bars',
        series: {
            1: {
                type: 'line'
            }
        },
        colors: ["#8C04A8"],
        animation: {
            startup: true,
            duration: 500,
            easing: 'linear'
        }
    };

    var chart = new google.visualization.ComboChart(chartElement);
    chart.draw(data, options);
}