$(document).ready(function () {
    $(".deleteBtn").on('click', function(e){
        e.preventDefault();
        const applicationID = $(this).attr("data-appid");
        
        const data = {
            applicationID
        };

        $.ajax('/api/deleteApplication/', {
            type: 'DELETE',
            data 
        }).then(() => {
            window.location.reload();
        });
    })

})