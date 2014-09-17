/* global Backbone, google */
var app = app || {};

(function () {
    'use strict';


    /*
     * Map View
     */
    app.mapView = Backbone.View.extend({

        /*
         * Map container
         */
        el: '#map',


        /*
         * Initialize map view 
         */
        initialize: function()
        {
            if(app.collection)
            {
                this.map(app.collection.models);
            }
        },


        /*
         * Create new map 
         */
        map: function(collection)
        {
            // map default options
            var options = 
            {
                center: {lat: 37.76, lng: -122.43 },
                zoom: 12
            };

            // google map object
            var map = new google.maps.Map(document.getElementById('map'), options);

            // if collection is passed, loop through locations and make a map marker for each one
            if(collection)
            {
                for(var i = 0; i < collection.length; i++)
                {
                    var link = collection[i].attributes.link;
                    var locations = collection[i].attributes.locations;

                    for(var ii = 0; ii < locations.length; ii++)
                    {
                        this.mapMarker(map, link, locations[ii].lat, locations[ii].lng);
                    }
                }
            }
        },


        /*
         * Add map marker to map 
         */
        mapMarker: function(map, link, lat, lng)
        {
            // position for marker
            var latLng = new google.maps.LatLng(lat,lng);

            // create marker for map
            var marker = new google.maps.Marker({
                icon: 'images/marker.png',
                link: link,
                position: latLng,
                map: map,
            });

            // marker click event
            google.maps.event.addListener(marker, 'click', function() {
                location.href = '#info/'+link;
            });
        }

    });

})();
