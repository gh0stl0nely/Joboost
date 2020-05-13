/* eslint-disable eqeqeq */
/* eslint-disable no-trailing-spaces */
$(document).ready(function () {
  $(".sidenav").sidenav();
  $("select").formSelect();
  $(".carousel.carousel-slider").carousel({
    fullWidth: true,
    indicators: true
  });

  $("#searchBtn").on("click", function (e) {
    e.preventDefault();
    // Use this in localStorage to store the keyword for later use
    const localStorageKeyWord = $("#keywordSearch").val().trim() != "" ? $("#keywordSearch").val().trim() : null;
    localStorage.setItem("keyword", JSON.stringify(localStorageKeyWord));
        
    const keyWord = $("#keywordSearch").val().trim() != "" ? "keyWord=" + $("#keywordSearch").val().trim() + "&" : null;
    if (!keyWord) {
      M.toast({
        html: "Please fill in the keyword"
      });
      return;
    }

    const companyName = $("#companySearch").val() ? "companyName=" + $("#companySearch").val().trim() + "&" : "companyName=null&";
    const city = $("#citySearch").val() ? "city=" + $("#citySearch").val().trim() + "&" : "city=null&";
    // const province = $("#provinceSearch").val() ? "province=" + $("#provinceSearch").val().trim() + "&": "province=null&";
    const industry = $("#industrySearch").val() ? "industry=" + $("#industrySearch").val().trim() : "industry=null";

    const url = "/result?" + keyWord + companyName + city + industry;
    // "/result?title=Khoi&"companyName=something

    $.get(url).then(() => window.location = url);

  });
});