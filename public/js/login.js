$(document).ready(function () {
  $('.sidenav').sidenav();

  $("#loginBtn").on("click", function (e) {
    e.preventDefault();

    const data = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    $.post("/api/login", data).then(() => {
      window.location = "/dashboard";
    });

  });
});