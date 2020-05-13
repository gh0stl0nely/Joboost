$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();
    
    function chooseLogo() {
        const $input = $("#logoFile");
        const $label = $input.next('label');
        const labelVal = $label.html();

        $input.on('change', function (e) {
            var fileName = '';

            if (this.files && this.files.length > 1) {
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            } else if (e.target.value) {
                fileName = e.target.value.split('\\').pop();
            }

            if (fileName) {
                $label.find('span').html(fileName);
            } else {
                $label.html(labelVal);
            }
        });
    }

    $("#searchBtn").on('click', function(e){
        e.preventDefault();

        // Use this in localStorage to store the keyword for later use
        const localStorageKeyWord = $("#keywordSearch").val().trim() != "" ? $("#keywordSearch").val().trim() : null;
        localStorage.setItem("keyword", JSON.stringify(localStorageKeyWord));

        // Main Keyword
        const keyWord = $("#keywordSearch").val().trim() != "" ? "keyWord=" + $("#keywordSearch").val().trim() + "&" : null;
        if(!keyWord){
            M.toast({html: 'Please fill in the keyword'});
            return;
        }
    
        const companyName = $("#companySearch").val() ? "companyName=" + $("#companySearch").val().trim() + "&": "companyName=null&";
        const city = $("#citySearch").val() ? "city=" + $("#citySearch").val().trim() + "&": "city=null&";
        // const province = $("#provinceSearch").val() ? "province=" + $("#provinceSearch").val().trim() + "&": "province=null&";
        const industry = $("#industrySearch").val() ? "industry=" + $("#industrySearch").val().trim(): "industry=null";

        const url = '/result?' + keyWord + companyName + city  + industry;
        
        // "/result?title=Khoi&"companyName=something

        $.get(url).then(() => window.location = url);

    }); 

    $("#applyBtn").on('click', function(e){
        e.preventDefault();

        $("#currentPost").css("display", "none");
        $("#details").css("display", "none");
        $("#thankyouDiv").css("display", "block");
    })

    $(".nextPost").on('click', function(e){
        e.preventDefault();
        $(".nextPost").prop("disabled", true);
        const postID = $(this).attr("data-postid");// This is the post ID of the post the user clicks on
        const industry = $(this).attr("data-industry");
        const city = $(this).attr("data-city");
        const company = $(this).attr("data-company");
        
        const url = "/nextPost?postID=" + postID + "&keyWord=" + JSON.parse(localStorage.getItem("keyword")) + "&companyName=" + company + "&city=" + city + "&industry=" + industry;
        
        $.get(url).then(() => window.location = url);
    })
});