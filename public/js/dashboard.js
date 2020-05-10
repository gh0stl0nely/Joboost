$(document).ready(function () {
    $('select').formSelect();
    $('.modal').modal();

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

    $(".deleteBtn").on("click",  function() {
        $("button").prop("disabled", true)

        const postID = $(this).attr('data-postid'); 

        const body = {
            postID
        }

        $.ajax({
            type: "DELETE",
            url: "/api/deletePost",
            data: JSON.stringify(body),
            contentType: "application/json",
        }).then(() => {
            location.reload();
        });
    });

    $(".editBtn").on("click",  function() {
        $("button").prop("disabled", true)

        const postID = $(this).attr('data-postid'); 

        const body = {
            postID
        };

        $.ajax({
            type: "POST",
            url: "/api/editPost",
            data: JSON.stringify(body),
            contentType: "application/json",
        }).then((data) => {
            console.log(data);
            $("#title").val(data.title);
            $('#publishedDate').text(data.createdAt);

            // Industry  

            $("#industry").find('option[value="' + data.industry + '"]').prop('selected', true)
            $("#industry").formSelect();

            // City

            $("#city").find('option[value="' + data.city + '"]').prop('selected', true)
            $("#city").formSelect();

            // Province
            $("#province").find('option[value="' + data.province + '"]').prop('selected', true)
            $("#province").formSelect();

            // Description $("#editor")
            const descriptionArray = data.description.split('|');
            console.log(descriptionArray);
            $(".ql-editor").text('');

            for(let i = 0; i < descriptionArray.length; i++){
                const p = $("<p></p>");
                p.append(descriptionArray[i]);
                $(".ql-editor").append(p);
                
            }

            // Email
            $("#email").val(data.contactEmail);
            // Phone
            $("#phone").val(data.contactNumber);

            // Resume number
            $("#resume").text(data.resumes);
            $("button").prop("disabled", false);

            // Set saveID to be data.id so when clicked on Save, will do its job
            $("#saveBtn").attr("data-saveID", data.id);
        });
    });

    $("#saveBtn").on('click', function(){
        const postID = $(this).attr('data-saveID'); 

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
        const contactEmail =  $("#email").val().trim();
        const contactNumber = $("#phone").val().trim();
        const resume = $("#resume").text();

        // Get texts from each paragraph tag in editor
        for(var i = 0; i < editorContent.length; i++){
            textList.push(editorContent[i].innerHTML);
        };

        // Disable button just in case double click
        $("#saveBtn").prop('disabled', true)
        
        // Validation
        if(!title || !textList || !contactEmail|| !contactNumber|| !city || !province || !industry){
            // Failed validation
            M.toast({html: 'Save failed! Make sure no fields are empty'});
            $("#saveBtn").prop('disabled', false);
        } else {
 
            let updatePost = {
                postID,
                title,
                description: textList, //List of description content in HTML tag
                contactEmail,
                contactNumber,
                city,
                province,
                industry,
                resume
            };
    
            $.ajax("/api/updatePost", {
                type: "POST",
                data: updatePost
            }).then((response) => {
                    M.toast({html: 'Saved successfully!'});
                    
                    $('li[id="' + response.postID + '"]').children('p')[0].innerHTML = "Title: " + response.newTitle; // Select the first P , title
                }
            );
        }

    });

    $(".viewAllApp").on('click', function(){
       const postID = $(this).attr("data-postID");
       const url = "/view_resume?postID=" + postID;
       window.location = url;

    });

});