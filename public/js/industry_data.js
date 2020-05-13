/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
$(document).ready(function () {

  // Configure and setup Chart
  google.charts.load("current", {
    "packages": ["corechart"]
  });
  google.charts.setOnLoadCallback(drawJobOpportunityGraphWithData);
  google.charts.setOnLoadCallback(drawEmploymentGrowthRateGraphWithData);

  $(window).resize(function () {
    drawJobOpportunityGraphWithData(JSON.parse(sessionStorage.getItem("opportunityData")));
    drawEmploymentGrowthRateGraphWithData(JSON.parse(sessionStorage.getItem("growthData")));
  });

  $("#industryOption").on("change", function () {
    const selectedOption = $(this).find(":selected").text(); // Get the selected option
    const dataSection = $("#dataSection");
    const selectionBar = $("#industryOption");
    selectionBar.attr("disabled", true);
    $("#loader").css("visibility", "visible");

    $.post("/api/data", {
      selectedOption
    }).then(response => {
      const job_growth = response.job_growth_data;
      const job_predictions = response.job_prediction_data;
      dataSection.css("display", "block");
      $("#selectedIndustry").text(selectedOption);
      animateValue("growthData", 0, job_growth.Average, 1000);
      animateValue("opportunityData", 0, job_predictions.Mean, 1000);

      drawEmploymentGrowthRateGraphWithData(job_growth);
      drawJobOpportunityGraphWithData(job_predictions);

      $("#loader").css("display", "none");
      selectionBar.attr("disabled", false);

      // Save to sessionStorage for window resizing...
      sessionStorage.setItem("growthData", JSON.stringify(job_growth));
      sessionStorage.setItem("opportunityData", JSON.stringify(job_predictions));
    });
  });

  //Initialize selection
  $("select").formSelect();
  //Initialize side nav
  $(".sidenav").sidenav();

});

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
  };

  timer = setInterval(run, stepTime);
  run();
}

function drawJobOpportunityGraphWithData(data) {
  var chartElement = document.getElementById("jobPredictionGraph");
  var data = google.visualization.arrayToDataTable([
    ["Year", data.Industry, ],
    ["2020", data["2020"]],
    ["2021", data["2021"]],
    ["2022", data["2022"]],
    ["2023", data["2023"]],
    ["2024", data["2024"]],
  ]);

  var options = {
    title: "Estimated number of job available per annum ",
    width: "100%",
    height: $(window).height() * 0.75,
    legend: "bottom",
    vAxis: {
      title: "Number of jobs",
      minValue: 0
    },
    hAxis: {
      title: "Year"
    },
    seriesType: "bars",
    series: {
      1: {
        type: "line"
      }
    },
    colors: ["#8C04A8"],
    animation: {
      startup: true,
      duration: 500,
      easing: "linear"
    }
  };

  var chart = new google.visualization.ComboChart(chartElement);
  chart.draw(data, options);
}

function drawEmploymentGrowthRateGraphWithData(data) {
  var chartElement = document.getElementById("employmentGrowthGraph");
  var data = google.visualization.arrayToDataTable([
    ["Year", data.Industry, ],
    ["2020", data["2020"]],
    ["2021", data["2021"]],
    ["2022", data["2022"]],
    ["2023", data["2023"]],
    ["2024", data["2024"]],
  ]);

  var options = {
    title: "Changes in employment growth per annum",
    legend: "bottom",
    width: "100%",
    height: $(window).height() * 0.75,
    vAxis: {
      minValue: 0,
      title: "Job Growth"
    },
    hAxis: {
      title: "Year"
    },
    seriesType: "bars",
    series: {
      1: {
        type: "line"
      }
    },
    colors: ["#8C04A8"],
    animation: {
      startup: true,
      duration: 500,
      easing: "linear"
    }
  };

  var chart = new google.visualization.ComboChart(chartElement);
  chart.draw(data, options);
}