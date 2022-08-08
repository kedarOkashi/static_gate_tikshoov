$(window).load(function() {
     
     $("a[rel^='prettyPhoto']").prettyPhoto();

    $('.homeSlider').bxSlider({
      auto: true,
      adaptiveHeight: true,
    }); 

     $('.gallery-video').bxSlider({
      mode: 'fade',
      adaptiveHeight: true,
      auto: true,
      video:true
    });

    if($('#formContantUs').length > 0){
      $('#formContantUs').validate({
        rules: {
                contact_name: "required",
                contact_email: {
                    required: true,
                    email: true
                },
                contact_phone: {
                    required: true,
                    minlength: 9,
                    maxlength: 10,
                    number: true
                }
            },
            messages: {
                contact_name: siteInfo["langStrings"]["contact_no_name"],
                contact_email: {
                    required: siteInfo["langStrings"]["reg_e_email"],
                    email: siteInfo["langStrings"]["contact_invalid_email"]
                },
                contact_phone: {
                    required: siteInfo["langStrings"]["reg_e_phone"],
                    minlength: siteInfo["langStrings"]["contact_invalid_phone"],
                    maxlength: siteInfo["langStrings"]["contact_invalid_phone"]
                }
            },
            errorClass: "bs311-has-error",
            errorElement: "span",
            highlight: function(element, errorClass, validClass) {
                $(element).parents('#formContantUs').addClass('bs311-has-error');
                $(element).parents('#formContantUs').removeClass('bs311-has-success');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('#formContantUs').removeClass('bs311-has-error');
                $(element).parents('#formContantUs').addClass('bs311-has-success');
            },
            submitHandler: function(form) {
              $(form).find("button[type=submit]").hide();

              $.post('contactDoneAjax.php',$(form).serialize(),function(data){
                if(data == "ok"){
                  $(form).slideUp().parent().append('<div class="bs311-text-success">'+siteInfo["langStrings"]["contact_thanks"]+'</div>');
                }else{
                  $(form).find("button[type=submit]").show();
                  $(form).slideDown().parent().append('<div class="bs311-text-danger">'+siteInfo["langStrings"]["reg_e_save"]+'</div>');
                }
              });
              return false;
            }
      });
    }
    
    if($("#contactForm").length > 0){
        $("#contactForm").validate({
            rules: {
                contact_name: "required",
                contact_email: {
                    required: true,
                    email: true
                },
                contact_phone: {
                    required: true,
                    minlength: 9,
                    maxlength: 10,
                    number: true
                }
            },
            messages: {
                contact_name: siteInfo["langStrings"]["contact_no_name"],
                contact_email: {
                    required: siteInfo["langStrings"]["reg_e_email"],
                    email: siteInfo["langStrings"]["contact_invalid_email"]
                },
                contact_phone: {
                    required: siteInfo["langStrings"]["reg_e_phone"],
                    minlength: siteInfo["langStrings"]["contact_invalid_phone"],
                    maxlength: siteInfo["langStrings"]["contact_invalid_phone"]
                }
            },
            errorClass: "bs232-has-error",
            errorElement: "span",
            highlight: function(element, errorClass, validClass) {
                $(element).parents('div[class^="span"]').addClass('bs232-has-error');
                $(element).parents('div[class^="span"]').removeClass('bs232-has-success');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('div[class^="span"]').removeClass('bs232-has-error');
                $(element).parents('div[class^="span"]').addClass('bs232-has-success');
            },
            submitHandler: function(form) {

              $(form).find("button[type=submit]").hide();
              $.post($(form).attr("action"),$(form).serialize(),function(data){
                if(data == "ok"){
                  $(form).slideUp().parent().append('<div class="bs232-text-success">'+siteInfo["langStrings"]["contact_thanks"]+'</div>');
                }else{
                  $(form).find("button[type=submit]").show();
                  $(form).slideDown().parent().append('<div class="bs232-text-danger">'+siteInfo["langStrings"]["reg_e_save"]+'</div>');
                }
              });
              return false;
            }
    	});
   	}

});
$(document).ready(function() {   


    $('#clients-flexslider').flexslider({
        animation: "slide",
        easing: "swing",
        animationLoop: true,
        itemWidth: 1,
        itemMargin: 1,
        minItems: 2,
        maxItems: 9,
        controlNav: false,
        directionNav: false,
        move: 2
    });
});
