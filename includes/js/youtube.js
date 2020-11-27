var count = 0;
var displayAmt = 10;
var showNextNum = 10;
var totalVideos = 0;
$(document).ready((function () {

    $(".videoThumbnail").click(function () {
        setCurrent($(this).parent());
    });

    $(".videoName").click(function () {
        setCurrent($(this).parent());
    });
    $('#channelDetails .channelItem').hide();
    $('#channelDetails .main').show();
    $("#videoListItems li").hide();
    $('#ddlCategory').change(function () {
        $("#videoListItems li").hide();
        count = 0;
        if($('#ddlCategory').val() != -1){
            
            filterPlayList($('#ddlCategory').val());
            if (count > 1){
                $("#videoHeader").text($('#ddlCategory option:selected').text() + ' - ' + count + ' videos');
            } else if (count == 1) {
                $("#videoHeader").text($('#ddlCategory option:selected').text() + ' - ' + count + ' video');
            } else if (count == 0) {
                $("#videoHeader").text("No videos found in PlayList");
                $("#videoName").text("No videos found in PlayList");
                $("#numberOfViews").text("0");
                $("#videoDate,#videoSummary").text("");
                
            }
            displayAmt = 10;
            showMoreVideos();
            loadFirstItem();
        } else {
            displayAmt = 10;
            count = $("#videoListItems li").length;
            showMoreVideos();
            loadFirstItem();
            if (count > 1) {
                $("#videoHeader").text('EnterpriseIrelandTV' + ' - ' + count + ' videos');
            } else if (count == 1) {
                $("#videoHeader").text("EnterpriseIrelandTV" + ' - ' + count + ' video');
            } else if (count == 0) {
                $("#videoHeader").text("EnterpriseIrelandTV No videos found");
            }
        }

    });
    count = $("#videoListItems li").length
    var pl = getUrlVars()["playlist"];

    var p = getUrlVars()["p"];

    if (p != null) {
        p = decodeURIComponent(p);
        var found = false;
        var ddlFound = "";
        //var opt = $("#ddlCategory option[text='" + pl + "']").val();
        $("#ddlCategory option").filter(function () {
            if (this.text.toLowerCase() == p.toLowerCase()) {
                ddlFound = this.text;
                found = true;
            }
            return this.text.toLowerCase() == p.toLowerCase();
        }).prop("selected", true);

        if (found) {

            $("#ddlCategory").trigger("change");
            $("a.chosen-single span").text(ddlFound);
        } else {
            showMoreVideos();
            loadFirstItem();

        }
    }
    else if ( pl != null) {
        pl = decodeURIComponent(pl);
        var found = false;
        var ddlFound = "";
        //var opt = $("#ddlCategory option[text='" + pl + "']").val();
        $("#ddlCategory option").filter(function () {
            if (this.text.toLowerCase() == pl.toLowerCase()) {
                ddlFound = this.text;
                found = true;
            }
            return this.text.toLowerCase() == pl.toLowerCase();
        }).prop("selected", true);
        
        if (found) {    
        
            $("#ddlCategory").trigger("change");
            $("a.chosen-single span").text(ddlFound);
        } else {
            showMoreVideos();
            loadFirstItem();

        }
    } else {
        showMoreVideos();
        loadFirstItem();
    }
    

    resetSticky();
    
    return false;
}));

function getVideoImg() {
    $("#videoListItems li.noVideoImg:visible").each(function (id, ele) {
        $(ele).removeClass("noVideoImg");
        var imgEle = $(ele).find("img");
        $(imgEle).attr("src", $(imgEle).data("imagesrc"));
    });

}
function showMoreVideos() {
    if ($('#ddlCategory').val() != null && $('#ddlCategory').val() != -1) {
        filterPlayList($('#ddlCategory').val());
        $("#videoListItems li[data-playlistid='" + $('#ddlCategory').val() + "']").slice(displayAmt).hide();
        
    } else {
        $("#videoListItems li").show();
        $("#videoListItems li").slice(displayAmt).hide();
    }
    moreFeatureSticky();
    displayAmt += showNextNum;
    if (displayAmt-10 >= count) {
        $("#showMoreVideos").hide();
    } else {
        $("#showMoreVideos").show();
    }
    resetSticky();
    getVideoImg();
    
}
function filterPlayList(playListId) {
    count = 0;
    $(".videoList li").each(function (i, ele) {
        if ($(ele).data('playlistid') == playListId) {
            $(ele).show();
            count++;
        } else {
            $(ele).hide();
        }
    });
    resetSticky();
    return count;

}
function setCurrent(videoListItem) {
    //https changed paul mcg
    var srcUrl = "https://youtube.com/embed/" + videoListItem.find("div.videoID").html() + "?rel=0"; 

    var plId = videoListItem.find("span.channelName").data("channelid");
    $('#channelDetails .channelItem').hide();
    $('#' + plId).show();

    $("#VideoFrame").attr("src", srcUrl);
    $("#videoName").html(videoListItem.find("span.videoName").html());
    $("#videoDate").html(videoListItem.find("div.videoDate").html());
    $("#videoSummary").html(videoListItem.find("div.videoSummary").html());
    $('#numberOfViews').html(videoListItem.find("span.videoViewsNo").html());
}


function loadFirstItem() {
    //getAll info of first video
    var loadFirstItem = $("ul.videoList > li.videoItem:visible:first");
    setCurrent(loadFirstItem);
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.toLocaleLowerCase().slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}