$(function () {
 



});

$(window).load(function () {
    $(".landing-template").each(function () {
        setSameHeight($(this).find(".location-name"));
        setSameHeight($(this).find(".inner"));
    });     
});

$(window).resize(function () {
    $(".landing .first").removeAttr("style");
    $(".landing .inner").removeAttr("style");

    $(".landing-template").each(function () {
        setSameHeight($(this).find(".location-name"));
        setSameHeight($(this).find(".inner"));
    });
});
