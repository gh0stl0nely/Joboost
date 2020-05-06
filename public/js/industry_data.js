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

    $("#industryOption").on("change", function(){
        const selectedOption = $(this).find(":selected").text(); // Get the selected option
        const dataSection = $("#dataSection"); 
        const selectionBar = $("#industryOption");
        // selectionBar.attr("disabled", true);
        $("#loader").css("visibility", "visible");

        
    
        // Send Get Request Here
        // Spin, and disbale the button (while waiting to receive it from backend)

        // Once receive .then() => Take the code below inside, 

        // Dont't really need the none tbh ...

        dataSection.css("display", "block");
        $("#selectedIndustry").text(selectedOption);
        animateValue("growthData",39,320040,1000);
        animateValue("opportunityData",39,320040,1000);
        drawJobOpportunityGraph();
        drawEmploymentGrowthRateGraph();
        // $("#loader").css("display", "none");
        // selectionBar.attr("disabled", false);

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
        title: 'Estimated number of job available per annum ',
        width: "100%",
        height: $(window).height() * 0.75,
        legend: 'bottom',
        vAxis: {
            title: 'Number of jobs',
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
        ['2019', -39, ],
        ['2020', 135, ],
        ['2021', 157, ],
        ['2022', 139, ],
        ['2023', 136, ],
    ]);

    var options = {
        title: 'Changes in employment growth per annum',
        legend: 'bottom',
        width: "100%",
        height: $(window).height() * 0.75,
        vAxis: {
            minValue: 0,
            title: 'Job Growth'
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

function animateValue(id, start, end, duration) {
    // assumes integer values for start and end
    
    var obj = document.getElementById(id);
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    const run = () => {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}