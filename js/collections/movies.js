/* global Backbone, _ */
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
            // if data in local storage, add movies to collection
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
            // get item
            get: function(title)
            {
                return localStorage.getItem(title);
            },

            // set item
            set: function(title, data)
            {
                localStorage.setItem(title, data);
            },

            // delete item
            del: function(title)
            {
                localStorage.removeItem(title);
            },

            // clear local storage
            clear: function()
            {
                localStorage.clear();
            }
        },


        /*
         * Add multiple models to collection
         */
        addModels: function(data)
        {
            // ensure json data type
            if(typeof data === 'string')
            {
                data = JSON.parse(data);
            }

            // get keys of object
            var keys = Object.keys(data);

            // add movie to collection
            for(var i = 0; i < keys.length; i++)
            {
                this.add(new app.Movie(data[keys[i]]));
            }
        },

	});

})();
