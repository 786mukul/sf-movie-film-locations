/* global Backbone */
var app = app || {};

(function () {

	'use strict';


    /*
     * Objects 
     */

    // pages
    var $list = $('#list');
    var $map = $('#map');
    var $info = $('#info');

    // buttons
    var $listBtn = $('#listBtn');
    var $mapBtn = $('#mapBtn');
    var $backBtn = $('#backBtn');
    var $searchBtn = $('#searchBtn');

    // search form
    var $searchForm = $('#searchForm');

    // page overlay
    var $overlay = $('.overlay');


    /*
     * Routes
     */
	var Routes = Backbone.Router.extend({


        // Route mapping 
		routes: 
        {
            '': 'map',
            'map': 'map',
            'info': 'map',
            'list': 'list',
            'info/:id': 'info',
		},


        /*
         * Map page 
         */
        map: function () 
        {
            // hide overlay
            $overlay.addClass('hide');

            // hide search form, map button and back button
            $searchForm.addClass('hide');
            $mapBtn.addClass('hide');
            $backBtn.addClass('hide');

            // hide list and info pages
            $info.addClass('hide').css('display', 'none');
            $list.addClass('hide').css('display', 'none');

            // show map, list button and search button
            $map.removeClass('hide').css('display', 'block');
            $listBtn.removeClass('hide');
            $searchBtn.removeClass('hide');

            // refresh map view
            new app.mapView();
        },


        /*
         * List page 
         */
        list: function () 
        {
            // hide overlay
            $overlay.addClass('hide');

            // hide search form, list button and back button
            $searchForm.addClass('hide');
            $listBtn.addClass('hide');
            $backBtn.addClass('hide');

            // show map and search button
            $mapBtn.removeClass('hide');
            $searchBtn.removeClass('hide');

            // hide info and map pages
            $info.addClass('hide').css('display', 'none');
            $map.addClass('hide').css('display', 'none');

            // show list page
            $list.removeClass('hide').css('display', 'block');
        },


        /*
         * Info page 
         */
        info: function (id) 
        {
            // hide overlay
            $overlay.addClass('hide');

            // hide search form, search button, list button, map button
            $searchForm.addClass('hide');
            $listBtn.addClass('hide');
            $mapBtn.addClass('hide');
            $searchBtn.addClass('hide');

            // show back button
            $backBtn.removeClass('hide');

            // hide map and list pages
            $map.addClass('hide').css('display', 'none');
            $list.addClass('hide').css('display', 'none');

            // show info page
            $info.removeClass('hide').css('display', 'block');

            // render info view with id info
            new app.infoView().render(id);
        },

	});


    // Init app routes
	app.Routes = new Routes();


    // History controller
	Backbone.history.start();

})();
