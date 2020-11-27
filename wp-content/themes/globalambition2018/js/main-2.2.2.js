jQuery(document).ready(function ($) {

    $("#webinars-filters").submit(function (e) {
        e.preventDefault();
        var form = $(this);
        form.find("[name=page]").val('1');

        if (form.find("[name=tag]").val() == "" && form.find("[name=post_date]").val() == "") {
            document.location.reload();
        } else {
            getWebinars(form);
        }
    });

    function initPagination(count, currentPage) {
        // var currentPage = $("#webinars-filters").find("[name=page]").val();
        var showItems = 8;
        var countPages = Math.ceil(count / showItems);
        if (count > 0) {

            if (countPages == 1) {
                return $(".wp-pagenavi").hide();
            }

            var outHtml = '';
            outHtml = '<div class="wp-pagenavi wp-js-pagenavi" role="navigation">' +
                '  <span class="pages">Page ' + currentPage + ' of ' + countPages + '</span>';

            if (currentPage > 2) {
                outHtml += '  <span class="page larger webinar-link" data-link="1"><<</span>';
            }

            for (let i = 1; i <= countPages; i++) {
                if (i == currentPage) {
                    outHtml += '  <span class="page larger current webinar-link" data-link="' + i + '">' + i + '</span>';
                } else if (currentPage - i <= 2 && currentPage - i >= -2) {
                    outHtml += '  <span class="page larger webinar-link" data-link="' + i + '">' + i + '</span>';
                }
            }

            if (currentPage < countPages) {
                outHtml += '  <span class="page larger webinar-link" data-link="' + countPages + '">>></span>';
            }
            outHtml += '</div>';

            $(".wp-pagenavi").replaceWith(outHtml);
        } else {
            return $(".wp-pagenavi").hide();
        }
    }

    $(document).on("click", ".webinar-link", function () {
        var newPage = $(this).attr("data-link"),
            form = $("#webinars-filters"),
            currentPage = form.find("[name=page]");

        if (newPage != currentPage.val()) {
            currentPage.val(newPage);
            getWebinars(form)
        }
    });

    function getWebinars(form) {
        var currentPage = form.find("[name=page]").val();
        $.ajax({
            url: form.attr("action"),
            method: "POST",
            data: form.serialize(),
            dataType: 'json',
            success: function (response) {
                initPagination(response.count, currentPage);
                $("#webinars").remove();
                $("#webinars-loop-ajax").html(response.html);
            },
        });
    }

    if ($('div.countrySelectContainer').length > 0) {
        let countrySelect = {},
            hasCountries = false

        // parse out the countries and their links - #av_section_4 on staging
        $('div#av_section_2 div.av_one_fifth').each(function () {
            let link = $('div.avia-image-container a.avia_image', this).attr('href'),
                country = $('section.av_textblock_section h3', this).text()

            // if either link or country is missing skip this one
            if (!link || !country) {
                return
            }

            countrySelect[country] = link
            hasCountries = true
        })

        // if the page has the country list, add the select element
        if (true === hasCountries) {
            // order countries alphabetically
            let orderedCountrySelect = {}
            Object.keys(countrySelect).sort().forEach(function (country) {
                orderedCountrySelect[country] = countrySelect[country]
            })

            // build up and add a select element made up of the countries
            let selectString = '<select class="countrySelect" style="color:black;">'
            selectString += '<option value="">Select a Market</option>'
            for (var country in orderedCountrySelect) {
                let link = orderedCountrySelect[country]
                selectString += '<option value="' + link + '">' + country + '</option>'
            }
            selectString += '</select>'
            $('div.countrySelectContainer').append(selectString)

            // attach onchange event listener to trigger page redirect when a country is selected
            $('div.countrySelectContainer').on('change', 'select.countrySelect', function () {

                if(!this.value){
                    return false;
                }

                if (true === this.value.endsWith('.pdf')) {
                    window.open(this.value, '_blank')
                } else {
                    window.location.href = this.value
                }
            })
        }
    }
});
