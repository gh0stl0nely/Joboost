$(document).ready(function () {
    $('select').formSelect();

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    $("#createPostForm").on("submit", function (event) {
        event.preventDefault();

        let newPost = {
            title: $("#title").val().trim(),
            description: $("#editor").val().trim(),
            contactEmail: $("#contactEmail").val().trim(),
            contactNumber: $("#phone").val().trim(),
            city: $("#city").val().trim(),
            province: $("#province").val().trim(),
            industry: $("#industry").val().trim(),
        };

        $.ajax("/api/newpost", {
            type: "POST",
            data: newPost
        }).then(
            function () {
                console.log("Successful");
                M.toast({html: 'Successful posted!'});
                // Reload the page to get the updated list
                location.reload();
            }
        );
    })

});
