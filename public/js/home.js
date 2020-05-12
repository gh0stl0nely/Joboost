$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $("#searchBtn").on('click', function(e){
        e.preventDefault();
        const keyWord = $("#keywordSearch").val() ? "keyWord=" + $("#keywordSearch").val().trim() + "&" : "keyWord=null&";
        const companyName = $("#companySearch").val() ? "companyName=" + $("#companySearch").val().trim() + "&": "companyName=null&";
        const city = $("#citySearch").val() ? "city=" + $("#citySearch").val().trim() + "&": "city=null&";
        // const province = $("#provinceSearch").val() ? "province=" + $("#provinceSearch").val().trim() + "&": "province=null&";
        const industry = $("#industrySearch").val() ? "industry=" + $("#industrySearch").val().trim(): "industry=null";

        const url = '/result?' + keyWord + companyName + city  + industry;
        // "/result?title=Khoi&"companyName=something

        $.get(url).then(() => window.location = url);

    });
});