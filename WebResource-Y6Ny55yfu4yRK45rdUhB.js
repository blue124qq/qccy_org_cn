function pToolsMarker() {
    this.GeoLatitude
    this.GeoLongitude
    this.Title
    this.Html
}

var pToolsMapMarkers = new Array();
var map;

function initializeMap() {
    if (document.getElementById("map")) {
        if (pToolsMapMarkers.length > 0) {
            document.getElementById("map").style.display = 'block';
            initializeGoogleMap()
        }
        else {
            document.getElementById("map").style.display = 'none';
        }
    }
}

function initializeGoogleMap() {

     // set to Dublin by default
    var center = new google.maps.LatLng(53.34594, -6.2663269);

    var myOptions = {
        zoom: 8,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        overviewMapControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    map.setCenter(center);
    map.setZoom(12);

        var markers = new Array();

        // Set up the markers
        for (var i = 0; i < pToolsMapMarkers.length; i++) {
            var pToolsMarker = pToolsMapMarkers[i];
            var html = '<div class="googleMapInfoWindow">' + pToolsMarker.Html + '</div>';
            var point = new google.maps.LatLng(pToolsMarker.GeoLatitude, pToolsMarker.GeoLongitude);
            var marker = createMarker(map, point, html, pToolsMarker.Title)

            markers[markers.length] = marker
        }

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

       
        if (markers.length > 1) {
            map.fitBounds(bounds);
        }
        else if(markers.length == 1)
        {
            map.setCenter(markers[0].getPosition());
        }

        //map.setCenter(bounds.getCenter());

        if (typeof window.googleMapCustomOnInit == 'function') {
            // function exists, so we can now call it
            googleMapCustomOnInit();
        }

   
}

function createMarker(map, latlng, html, title) {

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: false,
        title: title
    });

    var infowindow = new google.maps.InfoWindow({
        content: html
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
    
    return marker;
}


   