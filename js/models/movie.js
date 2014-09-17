/* global Backbone */
var app = app || {};

(function () {

	'use strict';

    /*
     * Movie Model 
     */
	app.Movie = Backbone.Model.extend({

        // defaults
		defaults: {
            'title' : '',
            'director' : '',
            'release_year' : '',
            'actor_1' : '',
            'actor_2' : '',
            'actor_3' : '',
            'locations' : [{
                'title': '',
                'href': '',
                'lat': '',
                'lng': '',
            }],
            'fun_facts' : '',
            'writer' : '',
            'production_company' : '',
            'distributor' : '',
		},

	});

})();
