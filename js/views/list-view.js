/* global Backbone, _ */
var app = app || {};

(function () {
    'use strict';


    /*
     * List view 
     */
    app.listView = Backbone.View.extend({


        // list container
        el: '.list',


        /*
         * Create list of 
         */
        initialize: function () {

            // clear previously stored data
            this.$el.html('');

            // loop collection and add items to list
            for(var i = 0; i < app.collection.length; i++)
            {
                // get model data
                var item = app.collection.models[i].attributes;

                // create template from model data
                var li = _.template( $('#list-item-template').html(), item);

                // append template to list
                this.$el.append(li);
            }
        },

    });

})();
