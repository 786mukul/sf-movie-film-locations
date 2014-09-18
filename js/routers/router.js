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

    var $searchForm = $('#searchForm');

    // page overlay
    var $overlay = $('.overlay');


    // Routes
	var Routes = Backbone.Router.extend({

        /*
         * Route mapping 
         */
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
            $searchForm.addClass('hide');
            $overlay.addClass('hide');

            $mapBtn.addClass('hide');
            $backBtn.addClass('hide');
            $listBtn.removeClass('hide');
            $searchBtn.removeClass('hide');

            $info.addClass('hide').css('display', 'none');
            $list.addClass('hide').css('display', 'none');
            $map.removeClass('hide').css('display', 'block');

            // refresh map view
            new app.mapView();
        },


        /*
         * List page 
         */
        list: function () 
        {
            $searchForm.addClass('hide');
            $overlay.addClass('hide');

            $listBtn.addClass('hide');
            $backBtn.addClass('hide');
            $mapBtn.removeClass('hide');
            $searchBtn.removeClass('hide');

            $info.addClass('hide').css('display', 'none');
            $map.addClass('hide').css('display', 'none');
            $list.removeClass('hide').css('display', 'block');
        },


        /*
         * Info page 
         */
        info: function (id) 
        {
            $searchForm.addClass('hide');
            $overlay.addClass('hide');

            $listBtn.addClass('hide');
            $mapBtn.addClass('hide');
            $searchBtn.addClass('hide');
            $backBtn.removeClass('hide');

            $map.addClass('hide').css('display', 'none');
            $list.addClass('hide').css('display', 'none');
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
