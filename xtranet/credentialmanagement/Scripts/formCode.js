
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

function checkRegRadio() {
    $('#signup').prop('checked', true);
}

$(".next").click(function () {
    /// Move the section to left to reveal next panel
    $(".section-out").css('margin-left', '-200%');
});

$(".previous").click(function () {
    /// Move the section to right to go back a panel
    $(".section-out").css('margin-left', '-100%');
});

$(".hide").click(function () {
    var id = this.id;
    /// Wipe inline styles return control to radio buttons
    $(".section-out").css('margin-left', '');
    if (id === 'signup') {
        $('#activeLink').text('Registration');
    }
    else {
        $('#activeLink').text('Login');
    }
});