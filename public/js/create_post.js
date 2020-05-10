$(document).ready(function () {
    $('select').formSelect();
    $('.sidenav').sidenav();

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
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

        // Validation criteria:
            // Title, industry, city, province, description, cannot be empty 
            // Email and phone number needs to be validated
        
        // When click submit, goes through validation process, 
        // If validation 

        const editor = $("#editor");
        const editorContent = editor.children()[0].children; // this is a list of <p>
  
        const textList = [];
        const title = $("#title").val() ? $("#title").val().trim() : null;
        const city = $("#city").val() ? $("#city").val().trim() : null;
        const province = $("#province").val() ? $("#province").val().trim() : null;
        const industry = $("#industry").val() ? $("#industry").val().trim() : null;
        const contactEmail =  $("#contactEmail").val().trim();
        const contactNumber = $("#phone").val().trim();

        // Get texts from each paragraph tag in editor
        for(var i = 0; i < editorContent.length; i++){
            textList.push(editorContent[i].innerHTML);
        };

        // Disable button just in case double click
        $("#submitBtn").prop('disabled', true)
        
        // Validation
        if(!title || !textList || !contactEmail|| !contactNumber|| !city || !province || !industry){
            // Failed validation
            M.toast({html: 'Please verify all fields are filled'});
            $("#submitBtn").prop('disabled', false);
        } else {
            // Successful validation
            let newPost = {
                title,
                description: textList, //List of description content in HTML tag
                contactEmail,
                contactNumber,
                city,
                province,
                industry,
            };
    
            $.ajax("/api/newpost", {
                type: "POST",
                data: newPost
            }).then(() => {
                    console.log("Successful");
                    M.toast({html: 'Successful posted!'});
                    // Reload the page to get the updated list
                    window.location = '/dashboard';
                }
            );
        }

    })

});
