// JavaScript Document
$(document).ready(function () {
    //toggle the component with class accordion_body
    $(".accordion_head").click(function () {
        if ($('.accordion_body').is(':visible')) {
            $(".accordion_body").slideUp(300);
            $(".plusminus").html('<i class="fa fa-plus-circle"></i>');
        }
        if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).children(".plusminus").html('<i class="fa fa-plus-circle"></i>');
        } else {
            $(this).next(".accordion_body").slideDown(300);
            $(this).children(".plusminus").html('<i class="fa fa-minus-circle"></i>');
        }
    });
});
