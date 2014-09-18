/* global Backbone */
var app = app || {};

(function () {
    'use strict';


    /*
     * General app view 
     */
    app.appView = Backbone.View.extend({


        // app container
        el: '#app',


        /*
         * Initialize app 
         */
        initialize: function()
        {
            // loading overlay
            this.$loading = this.$('.loading');

            // create global collection object
            app.collection = new app.Movies();

            // timeout before rendering app to ensure collection is set
            var page = this;
            setTimeout(function(){ page.render(); },1);
        },


        /*
         * Render app
         */
        render: function()
        {
            // hide loading
            this.$loading.fadeOut();

            // header
            new app.headerView();

            // map page
            new app.mapView();

            // list page
            new app.listView();


            // get current page info
            var hash = String(window.location.hash);
            var page = hash.substr(1,4);

            // info page
            if(page === 'info')
            {
                var title = hash.substr(hash.indexOf('/')+1, hash.length);
                new app.infoView().render(title);
            }
        },


    });

})(jQuery);
