var urlParams;
var isFirstLoad = true;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(function () {

    $("#searchDetails").on('keypress', function (e) {
        var tag = e.target.tagName.toLowerCase();
        if (e.which === 13) {
            e.preventDefault();
            searchEvents();
        }
    });

    $(".datePicker").datepicker({
        dateFormat: "dd/mm/yy", showOn: "button",
        //buttonImage: "images/calendar.gif",
        buttonImageOnly: false,
        buttonText: ""
    });
    $("#DateFrom").datepicker("setDate", new Date());
    $(".ui-datepicker-trigger").addClass("fa fa-calendar");
    $(".datePicker").focus(function () {
        $(this).datepicker("show");
    });
    $(".datePicker").click(function () {
        $(this).datepicker("show");
    });

    $("#DateTo").keyup(function (e) {
        preventBackspace(e);
    });
    $("#DateTo").keydown(function (e) {
        preventBackspace(e);
    });
    $("#DateTo").keypress(function (e) {
        preventBackspace(e);
    });
    $("#DateFrom").keypress(function (e) {
        preventFromBackspace(e)
    });
    $("#DateFrom").keyup(function (e) {
        preventFromBackspace(e)
    });

    $("#DateFrom").keydown(function (e) {
        preventFromBackspace(e)
    });



    $("#submitSearch").click(function () {
        searchEvents();


    });
    scrollToTheTop = false;

    if ("date" in urlParams)
    {
        $("#DateTo").val(urlParams["date"]);
        $("#DateFrom").val(urlParams["date"]);
        isFirstLoad = false;
    }

    if ("featured" in urlParams)
    {
        if (urlParams["featured"] == "true")
        {
            $("#Featured").prop("checked", "checked");
            isFirstLoad = false;
        }
    }

    if ("name" in urlParams) {
        $("#Keyword").val(urlParams["name"]);
    }



    $("#submitSearch").trigger("click");
    
});
var pagerNo = 0;
var noOfPages = 0;
var pagerSize = 5;
var pagesShowing = 5;
var scrollToTheTop = true;

function searchEvents()
{
    var searchDetails = new SearchDetails();

    searchDetails.Keyword = $("#Keyword").val();
    searchDetails.DateFrom = $("#DateFrom").val();
    searchDetails.DateTo = $("#DateTo").val();
    searchDetails.EventType = $("#ddlEventType option:selected").val();
    searchDetails.FeaturedOnly = $("#Featured").is(":checked");
    var details = JSON.stringify(searchDetails);

    $("ul#pager-js").html("");
    $("#searchLoading").show();
    $("#results").hide();
    $.ajax({
        type: "POST",
        url: "/webservices/EventsSearch.asmx/SearchEvents",
        data: "{ 'searchDetails':" + details + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {

            var returnString = data.d;
            var returnObject = $.parseJSON(returnString);
            $("#Featured").removeAttr("checked");
            if (returnObject.IsSuccess) {
                $("#results").html(returnObject.ResultJson);

                $("#results").show();
                $("#searchLoading").hide();
                BuildPager();
                if ($("#results li").length > 5) {
                    PageNumber(1);
                }

                if (!isFirstLoad) {
                    setTimeout(moveToDiv($("#searchResults")), 1000);
                  
                }
                isFirstLoad = false;
            } else {

                $("#results").html("<li class='content'><h3 class='center'>No Results Found</h3></li>");
                $("#searchLoading").hide();
                $("#results").show();
                // alert(returnObject.Message);
            }


        },
        failure: function () {
            alert('There was an error, please try again.');
            $("#searchLoading").hide();
        }
    });

}

function preventBackspace(e) { 
        if(e.keyCode == 8 || e.keyCode == 46){
            $("#DateTo").val("");
            e.preventDefault();  // backspace

        }
        else { e.preventDefault(); }
 
    
}
function preventFromBackspace(e) {
    if (e.keyCode == 8) {

        e.preventDefault();  // backspace

    }


}


function BuildPager() {
   
    noOfPages = $("#results li").length;
    pagerNo = Math.floor(noOfPages / pagesShowing);

    if ((noOfPages % pagesShowing) > 0) {
        pagerNo++;
    }


    if (noOfPages > pagesShowing) {
        if (pagerNo > pagerSize) {
            $("ul#pager-js").append("<li class='go-first' style='display:none;'><a id='go-first' href='JavaScript:PageNumber(1);'><span aria-hidden='true' class='fa fa-angle-double-left'></span></a></li>");
        }
        $("ul#pager-js").append("<li class='go-prev' style='display:none;'><a id='go-previous' href='JavaScript:PageNumber(1);'><span aria-hidden='true' class='fa fa-angle-left'></span></a></li>");
        for (i = 1; i <= pagerNo; i++) {
            $("ul#pager-js").append("<li class='no-item'><a id='page_" + i + "' href='JavaScript:PageNumber(" + i + ");'>" + i + "</a></li>");
        }
        if(pagerNo > 1){
            $("ul#pager-js").append("<li class='go-next'><a id='page_next' href='JavaScript:PageNumber(2);'><span aria-hidden='true' class='fa fa-angle-right'></span></a></li>");
        }
        if (pagerNo > pagerSize) {
            $("ul#pager-js").append("<li class='go-last'><a id='page_last' href='JavaScript:PageNumber(" + (pagerNo) + ");'><span aria-hidden='true' class='fa fa-angle-double-right'></span></a></li>")
        }

        $("ul#pager-js li").hide();
        $("ul#pager-js li").slice(1, pagerSize).show();
    }

   
}

function PageNumber(p) {
    if(!$("#page_" + p).hasClass("active")){
        $("#results li").hide();
        $("#pager-js li").removeClass("active");
        $("#pager-js li a").removeClass("active");
        
        
        $("#page_" + p).addClass("active");
        $("#page_" + p).parent().addClass("active");
        $("#results li").slice(((p * pagesShowing) - pagesShowing), (p * pagesShowing)).show();
  
        $("ul#pager-js li.no-item").hide();

        if ((pagerNo - p < pagerSize)) {
            
            if (pagerNo - pagerSize <= 0) {
                $("ul#pager-js li.no-item").slice(0, pagerNo).show();
            } else {
                $("ul#pager-js li.no-item").slice(pagerNo - pagerSize, pagerNo).show();
            }
        }
        else {
            $("ul#pager-js li.no-item").slice(p - 1, (p - 1) + pagerSize).show();
        }
       
        if (p > 1) {
            $("#go-previous").attr("href", "JavaScript:PageNumber(" + (p - 1) + ");");
            $("li.go-prev").show()
            $("li.go-first").show()
        } else {
            $("li.go-first").hide()
            $("li.go-prev").hide()
        }
        if (p < pagerNo) {
            $("#page_next").attr("href", "JavaScript:PageNumber(" + (p + 1) + ");");
            $("li.go-next").show();
            $("li.go-last").show();

        } else {
            $("li.go-next").hide();
            $("li.go-last").hide();
        }

        resetSticky();
        if (scrollToTheTop) {
            $('html, body').animate({ scrollTop: $('#results').offset().top }, 'slow');
        } else {
            scrollToTheTop = true;
        }
    }

}
function SearchDetails() {
    this.Keyword = "";
    this.DateFrom = "";
    this.DateTo = "";
    this.EventType = "";
    this.FeaturedOnly = false;
    this.IsHomepage = false;
    
}