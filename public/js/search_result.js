$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();
    
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

    // 
});