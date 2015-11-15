var map;
var infowindow;
var marker;

function initmap() {
    map = new google.maps.Map(document.getElementById('map'), {

        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(42.953736, -78.825893),
        zoom: 15
    });
    infowindow = new google.maps.InfoWindow();
    loadMarkers();
}





function getMarkerContent(house){
    var markerhtml = '';
    markerhtml += house.address + '</br> Rating: '+ house.rating + '</br></br>';
    return markerhtml;

}

function loadMarkers() {

    $.ajax({
        url: "json/housemarkers.json",
        context: document.body
    }).done(function (houses) {

        var i;
        for (i = 0; i < houses.length; i++) {


            marker = new google.maps.Marker({
                position: new google.maps.LatLng(houses[i].location.lat, houses[i].location.lng),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(getMarkerContent(houses[i]));
                    infowindow.open(map, marker);
                    $('#address').html(houses[i].address);
                    $('#overallrating').html(houses[i].overallrating);
                    $('#bedbugrating').html(houses[i].bedbugrating);
                    $('#landlordrating').html(houses[i].landlordrating);
                    $('#rentrating').html(houses[i].rentrating);
                    $('span.stars').stars();
                }
            })(marker, i));

        }
    });
}


$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

$(function() {
    $('span.stars').stars();
});
