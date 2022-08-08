$('#formContactus').on('submit', function () {
    $("#cover").css("display", "block");
    return true;
});

$(document).ready(function () {
    $("#cover").css("display", "none");
});

$(function () {
    $('.date-picker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'mm-yy',
        defaultDate:'-1m',
        onClose: function (dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    });
});
$(function () {
    $('#sendMail').click(function () {
        var checked_status = this.checked;
        if (checked_status == true) {
            $('#mail').show();
            $("#mail").attr('required', 'required');
        }
        else {
            $('#mail').hide();
            $("#mail").removeAttr('required');
        }
    });
});


$( document ).on( "pagecreate", function() {
    $( ".photopopup" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
        }
    });
});