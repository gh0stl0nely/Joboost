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

    $(".downloadBtn").on('click', function(e){
        e.preventDefault();
        const resumePath = $(this).attr("data-resumepath");
        window.open('/download?filePath=' + resumePath);
    });
})