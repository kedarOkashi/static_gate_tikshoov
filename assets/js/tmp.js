String.prototype.b64encode = function () {
    return btoa(unescape(encodeURIComponent(this)));
};
String.prototype.b64decode = function () {
    return decodeURIComponent(escape(atob(this)));
};

$(window).bind('beforeunload', function () {
    var iframe = $('iframe');
    var searchbox = $('input[type="search"]', iframe.contents());
    var pagename = (document.location.href).b64encode();
    if ((localStorage[pagename]) !== 'undefined') {

        localStorage[pagename] = searchbox.val(); // only strings

    }
    else {
        localStorage.setItem(pagename, searchbox.val())
    }


});
$(document).ready(function () {

    var iframe = $('iframe');
    var searchbox = $('input[type="search"]', iframe.contents());

});

$(window).bind('load', function () {
    var pagename = (document.location.href).b64encode();
    var iframe = $('iframe');
    var searchbox = $('input[type="search"]', iframe.contents());
    if ((localStorage[pagename]) !== 'undefined') {
        searchbox.val(localStorage[pagename]);

    }
    else {
        searchbox.val('');

    }

});
