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
         * Fill collection with data
         */
        initialize: function() 
        {

            // localStorage request
            if(this.localStorage.get('uber-sf-movies'))
            {
                // get data from localStorage, add it to collection and return collection
                var data = this.localStorage.get('uber-sf-movies');
                this.addModels(data);
                return this;
            }

            // server request
            else
            {
                // set collection object to access in ajax requests
                var collection = this;

                // localStorage functionality is available
                if(typeof(Storage) !== 'undefined')
                {
                    // request json data from server then store data in collection and local storage and return collection
                    this.ajax().success(function(data){
                        collection.localStorage.clear();
                        collection.localStorage.set('uber-sf-movies', JSON.stringify(data));
                        collection.addModels(data);
                        return collection;
                    });
                }
                // no localStorage available for user
                else
                {
                    // load data from server into collection and return collection
                    this.ajax().success(function(data){
                        collection.addModels(data);
                        return collection;
                    });
                }
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
                url: '/data/',
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
