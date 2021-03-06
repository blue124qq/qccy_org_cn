(function ($, window) {

    window.initTlpTeam = function () {
        $(".tlp-team").each(function () {
            var container = $(this),
                isotope_wrap = container.find('.tlp-team-isotope'),
                carouselWrap = container.find('.layout-carousel, .tlp-team-carousel');
            if (isotope_wrap.length && $.fn.isotope) {
                var isotope = isotope_wrap.imagesLoaded(function () {
                    isotope.isotope({
                        getSortData: {
                            name: '.name',
                            designation: '.designation',
                        },
                        sortAscending: true,
                        itemSelector: '.team-member',
                    });
                });
                var isotopeButtonGroup = $(this).find('.button-group.sort-by-button-group');
                isotopeButtonGroup.on('click', 'button', function (e) {
                    e.preventDefault();
                    var sortByValue = $(this).attr('data-sort-by');
                    isotope.isotope({sortBy: sortByValue});
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                });
            }
            if (carouselWrap.length && $.fn.owlCarousel) {
                carouselWrap.imagesLoaded(function () {
                    var dItem = parseInt(container.data('desktop-col'), 10) || 3,
                        tItem = parseInt(container.data('tab-col'), 10) || 2,
                        mItem = parseInt(container.data('mobile-col'), 10) || 1,
                        options = carouselWrap.data('owl-options');
                    carouselWrap.addClass('owl-carousel owl-theme').owlCarousel({
                        nav: !!options.nav,
                        dots: !!options.dots,
                        autoplay: !!options.autoplay,
                        autoplayHoverPause: !!options.autoplayHoverPause,
                        loop: !!options.loop,
                        autoHeight: !!options.autoHeight,
                        lazyLoad: !!options.lazyLoad,
                        rtl: !!options.rtl,
                        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: mItem
                            },
                            767: {
                                items: tItem
                            },
                            991: {
                                items: dItem
                            }
                        }
                    });
                });
            }
        });
    };
    initTlpTeam();
})(jQuery, window);