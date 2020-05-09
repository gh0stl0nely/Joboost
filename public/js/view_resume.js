$(document).ready(function () {

    $("#DownloadBtn").on('click', function(e){
        e.preventDefault();
        console.log("heelo")
        window.location = '/api/download'
    })





})