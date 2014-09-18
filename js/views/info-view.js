/* global Backbone, _ */
var app = app || {};

(function () {
    'use strict';


    /*
     * Single item info view 
     */
    app.infoView = Backbone.View.extend({


        // info page container
        el: '#info',


        // init
        initialize: function(){

            // Get hash and load data if single info page is set on load 
            this.checkInitLoad();

        },


        /*
         * Get passed model info and add to template
         */
        render: function (title) 
        {
            // get title model info, create template and then add to info page html
            if(app.collection)
            {
                var info = app.collection.where({'link': title});
                var infoData = _.template($('#info-template').html(), info[0].attributes);
                this.$el.html(infoData);
            }
        },

        checkInitLoad: function()
        {
            // location hash
            var hash = String(window.location.hash);

            // current page
            var page = hash.substr(1,4);

            // info page
            if(page === 'info')
            {
                var title = hash.substr(hash.indexOf('/')+1, hash.length);
                this.render(title);
            }
            
        }

    });

})();

