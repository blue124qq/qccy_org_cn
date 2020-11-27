$(document).ready(function () {

    $(function () {
        var today = new Date().toJSON().slice(0, 10);
        getCalendarItemsForMonth(today);
    });
    $(".event-calendar").datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: "PREVIOUS",
        nextText: "NEXT",
        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
        onChangeMonthYear: function (year, month, widget) {
            getCalendarItemsForMonth(year + "-" + month + "-1");
        },
        onSelect: function (dateText, inst) {
            inst.inline = false;
            
            inst.preventDefault();
            //            debugger
            //            if ($(inst.dpDiv).find('.ui-state-hover').attr("href") != "#") {
            //                document.location.href = $(inst.dpDiv).find('.ui-state-hover').attr("href");
            //                // $(inst.dpDiv).find('.ui-state-hover').click();
            //            }
        }
    });

    function getCalendarItemsForMonth(date) {
        date = date.replace(/['"]+/g, '')
        $.ajax({
            type: "POST",
            url: "/Webservices/EventsSearch.asmx/GetCalendar",
            contentType: "application/json; charset=utf-8",
            data: "{'date':'" + date + "'}",
            dataType: "json",
            success: function (data) {
                $(".ui-datepicker-calendar td").each(function () {
                    if ($(this).text() != "") {

                        $(this).attr("data-index", $(this).index());
                        $(this).attr("data-day", $(this).text());
                        $(this).find("a").addClass("event-trigger").attr("href", "javascript:void(0)");
                    }
                });;

                var events = JSON.parse(data.d);
                var eventDate = "";
                var listItem = "";
                $.each(events, function (i, v) {

                    eventDate = $('.ui-datepicker-calendar td[data-day="' + v.Day + '"] .event-trigger');
                    eventDate.addClass("has-event");
                    eventDate.attr("href", v.Url);


                });
            },
            error: function () { },
            complete: function () {


            }
        });
    }
});

function goToThisLink(obj) {
    window.location.href = $(obj).attr("href");
}