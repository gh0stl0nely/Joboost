/* eslint-disable eqeqeq */
$(document).ready(function () {
  $(".sidenav").sidenav();
  $("select").formSelect();


  $("#searchBtn").on("click", function(e){
    e.preventDefault();

    // Use this in localStorage to store the keyword for later use
    const localStorageKeyWord = $("#keywordSearch").val().trim() != "" ? $("#keywordSearch").val().trim() : null;
    localStorage.setItem("keyword", JSON.stringify(localStorageKeyWord));

    // Main Keyword
    const keyWord = $("#keywordSearch").val().trim() != "" ? "keyWord=" + $("#keywordSearch").val().trim() + "&" : null;
    if(!keyWord){
      M.toast({html: "Please fill in the keyword"});
      return;
    }

    const companyName = $("#companySearch").val() ? "companyName=" + $("#companySearch").val().trim() + "&": "companyName=null&";
    const city = $("#citySearch").val() ? "city=" + $("#citySearch").val().trim() + "&": "city=null&";
    // const province = $("#provinceSearch").val() ? "province=" + $("#provinceSearch").val().trim() + "&": "province=null&";
    const industry = $("#industrySearch").val() ? "industry=" + $("#industrySearch").val().trim(): "industry=null";

    const url = "/result?" + keyWord + companyName + city + industry;

    // "/result?title=Khoi&"companyName=something

    $.get(url).then(() => window.location = url);

  });

  $("#applyBtn").on("click", function(e){
    e.preventDefault();
    // FOr Demi
    // Display none the main
    // THANK YOU FOR SUBMITTING. CHECK OUT OR SEARCH FOR MORE MORE POST (MAKE IT SOUNDS GOOD LOL)

  });

  $(".nextPost").on("click", function(e){
    e.preventDefault();
    $(".nextPost").prop("disabled", true);
    const postID = $(this).attr("data-postid");// This is the post ID of the post the user clicks on
    const industry = $(this).attr("data-industry");
    const city = $(this).attr("data-city");
    const company = $(this).attr("data-company");

    const url = "/nextPost?postID=" + postID + "&keyWord=" + JSON.parse(localStorage.getItem("keyword")) + "&companyName=" + company + "&city=" + city + "&industry=" + industry;

    $.get(url).then(() => window.location = url);
  });
});