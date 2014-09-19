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
            // create movies collection object
            app.collection = new app.Movies();

            // if data isn't present in local storage, make request to get data
            if(app.collection.localStorage.get('uber-sf-movies'))
            {
                this.render();
            }
            else
            {
                // set page object to render app within success
                var page = this;

                // request data from server and wait for collection data before rendering app
                app.collection.ajax().success(function(data){

                    // if local storage is available, store data
                    if(typeof(Storage) !== 'undefined')
                    {
                        // handler for private browsing fix (no local storage usage in private)
                        try 
                        {
                            app.collection.localStorage.clear();
                            app.collection.localStorage.set('uber-sf-movies', JSON.stringify(data));
                        }
                        catch (e) 
                        {
                            console.log('private browsing');
                        }
                    }

                    // add models to collection
                    app.collection.addModels(data);

                    // render page after a successful submission
                    page.render();
                });
            }

        },


        /*
         * Render app
         */
        render: function()
        {

            // fadeout loading overlay
            $('.loading').fadeOut();

            // header
            new app.headerView();

            // map page
            new app.mapView();

            // list page
            new app.listView();

            // single page info view
            new app.infoView();

        },


    });

})(jQuery);
