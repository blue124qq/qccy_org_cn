setShareLinks();

function socialWindow(url) {
    var left = (screen.width - 570) / 2;
    var top = (screen.height - 570) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
    // Setting 'params' to an empty string will launch
    // content in a new tab or window rather than a pop-up.
    // params = "";
    window.open(url, "NewWindow", params);
}

function setShareLinks() {
    var pageUrl = encodeURIComponent(document.URL);
    var tweet = encodeURIComponent($("meta[property='og:description']").attr("content"));

    $(document).on("click", ".social-share.facebook", function () {
        url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
        socialWindow(url);
    });

    $(document).on("click", ".social-share.twitter", function () {
        var text = document.getElementById('SocialComment');
        text = text.value;
        if (text !== 'Write your comment here...') {
            url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + text;
        }
        else {
            url = "https://twitter.com/intent/tweet?url=" + pageUrl;
        }
        socialWindow(url);
    });

    $(document).on("click", ".social-share.linkedin", function () {
        var text = document.getElementById('SocialComment');
        text = text.value;
        if (text !== 'Write your comment here...') {
            url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl + "&summary=" + text;
        }
        else {
            url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
        }
        socialWindow(url);
    });
    $(document).on("click", ".social-share.mail", function () {
        var text = document.getElementById('SocialComment');
        text = text.value;
        if (text !== 'Write your comment here...') {
            url = "mailto:?to=&subject=i\'d like to share a link with you&body=" + text + " " + pageUrl;
        }
        else {
            url = "mailto:?to=&subject=i\'d like to share a link with you&body=" + pageUrl;
        }
        socialWindow(url);
    });
    $(document).on("click", ".social-share.whatsapp", function () {
        var ScreenWidth = screen.width;
        var text = document.getElementById('SocialComment');
        if (ScreenWidth < 768) {
            text = text.value;
            if (text !== 'Write your comment here...') {
                url = "whatsapp://send/?text=" + text + " " + pageUrl;
            }
            else {
                url = "whatsapp://send/?text=" + pageUrl;
            }
            socialWindow(url);
        }
        else {
            text = text.value;
            if (text !== 'Write your comment here...') {
                url = "https://web.whatsapp.com/send?text=" + text + " " + pageUrl;
            }
            else {
                url = "https://web.whatsapp.com/send?text=" + pageUrl;
            }
            socialWindow(url);
        }
    });
}


$('.st_sharethis_custom, .st_email_custom').click(function () {
    $('body').addClass('overlay-on');
    var link = window.location;
    var popup = '<div class="popup-container"><button id="Close" class="close-button"><i class="fa fa-close"></i></button><textarea id="SocialComment" aria-label="social comment box">Write your comment here...</textarea><a class="link">' + link + '</a><div class="button-container"><button class="social-share facebook"><i class="fa fa-facebook"></i></button><button class="social-share twitter"><i class="fa fa-twitter"></i></button><button class="social-share linkedin"><i class="fa fa-linkedin"></i></button><button class="social-share whatsapp"><i class="fa fa-whatsapp"></i></button></button><button class="social-share mail"><i class="fa fa-envelope"></i></button></div></div><div class="overlay"></div>';
    $('body').append(popup);
});

$(document).on('click', '.overlay, #Close', function () {
    $('body').removeClass('overlay-on');
    $('.popup-container').remove();
    $('.overlay').remove();
});