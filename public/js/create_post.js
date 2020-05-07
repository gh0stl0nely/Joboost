$(document).ready(function () {
    $('select').formSelect();
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    $('.collapsible').collapsible();

    var quill = new Quill('#editor', {
        theme: 'snow'
    });
});
