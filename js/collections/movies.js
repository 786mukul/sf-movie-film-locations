/* global Backbone */
/* global _ */
var app = app || {};

(function () {

	'use strict';

    /*
     * Movies Collection
     */
	app.Movies = Backbone.Collection.extend({


        /*
         * Movie model
         */
		model: app.Movie,


        /*
         * Initialize collection
         */
        initialize: function() {
            // if data in local storage, add to collection
            if(this.localStorage.get('uber-sf-movies'))
            {
                var data = this.localStorage.get('uber-sf-movies');
                this.addModels(data);
            } 
        },


        /*
         * Ajax request handler
         */
        ajax: function(method, model, options) 
        {
            var params = _.extend({
                type: 'GET',
                dataType: 'json',
                url: 'data/',
                processData: false
            }, options);

            return $.ajax(params);
        },


        /*
         * Local storage handler
         */
        localStorage: 
        {
            get: function(title)
            {
                return localStorage.getItem(title);
            },

            set: function(title, data)
            {
                localStorage.setItem(title, data);
            },

            del: function(title)
            {
                localStorage.removeItem(title);
            },

            clear: function()
            {
                localStorage.clear();
            }
        },


        /*
         * Add complete full array dataset to collection
         */
        addModels: function(data)
        {
            if(typeof data === 'string')
            {
                data = JSON.parse(data);
            }

            var keys = Object.keys(data);

            for(var i = 0; i < keys.length; i++)
            {
                this.add(new app.Movie(data[keys[i]]));
            }
        },

	});

})();
