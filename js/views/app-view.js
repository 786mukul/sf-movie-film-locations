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

            // if data isn't present in local storage, make request to get data
            if(app.collection.localStorage.get('uber-sf-movies'))
            {
                this.render();
            }
            else
            {
                app.collection.ajax().success(function(data){
                    // if local storage is available, store data
                    if(typeof(Storage) !== 'undefined')
                    {
                        app.collection.localStorage.clear();
                        app.collection.localStorage.set('uber-sf-movies', JSON.stringify(data));
                    }

                    // add models to collection
                    app.collection.addModels(data);
                });

                // render page
                this.render();
            }

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
