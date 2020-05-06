$(document).ready(function () {
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
    })
});

