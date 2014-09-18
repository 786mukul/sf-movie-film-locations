/* global Backbone */
var app = app || {};

(function () {
    'use strict';


    /*
     * Header view  
     */
    app.headerView = Backbone.View.extend({


        // header container
        el: '.header',


        /*
         * Header events 
         */
        events: {
            'click #searchBtn': 'searchShow',
            'click #cancelBtn': 'searchCancel',
            'keypress #search_input': 'searchActive'
        },


        /*
         * Initialize header 
         */
        initialize: function () {
            // header objects
            this.$search = $('#searchForm');
            this.$searchInput = $('#search_input');
            this.$cancelBtn = $('#cancelBtn');
            this.$overlay = $('.overlay');
            this.$results = $('.results');

            this.titles = app.collection.pluck('title');
        },


        /*
         * Show search form 
         */
        searchShow: function () {

            // reset search value and blur input
            this.$searchInput.val('');
            this.$searchInput.blur();

            // show overlay, search form and focus into search input
            this.$overlay.removeClass('hide');
            this.$search.removeClass('hide');
            this.$searchInput.focus();
        },


        /*
         * Autocomplete search 
         */
        searchActive: function() {

            // movie titles to search through
            var titles = this.titles;

            // auto complete search
            this.$searchInput.autocomplete({
                source: titles,
                select: function(event, ui)
                {
                    // link user to movie info page
                    var link = ui.item.label.replace(/\s+/g, '-').toLowerCase();
                    location.href = './#info/'+link;
                }
            });

        },


        /*
         * Cancel search form 
         */
        searchCancel: function () {
            // hide form and overlay
            this.$search.addClass('hide');
            this.$overlay.addClass('hide');
        }

    });

})();
