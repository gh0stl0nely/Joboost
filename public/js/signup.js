

$(document).ready(function () {
    $('.sidenav').sidenav();
    
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


    let isOpen = false;
    function responsiveMenu() {
        if (!isOpen) {
            $("#close").addClass("hidden");
            $("#mobileMenu").addClass("hidden");
            $("#menu").removeClass("hidden");
        } else {
            $("#menu").addClass("hidden");
            $("#close").removeClass("hidden");
            $("#mobileMenu").removeClass("hidden");
        }
    };

    chooseLogo();
    responsiveMenu();
    $("#menu").click(function () {
        console.log("open menu");
        isOpen = true;
        responsiveMenu();
    });
    $("#close").click(function () {
        console.log("close menu");
        isOpen = false;
        responsiveMenu();
    });

    // $("#dataForm").on("submit", (e) => {
   
    //     // e.preventDefault();
    //     // console.log("Submitted")
    //     // const data = {
    //     //     name: $('#name').val(),
    //     //     email: $('#email').val(),
    //     //     password: $('#password').val(),
    //     //     // Missing logo but will figure out later
    //     // };

    //     // $.post("/api/register", data).then(() => {
    //     //     window.location = "/login";
    //     // })
    // });

});

