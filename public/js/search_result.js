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

    
});