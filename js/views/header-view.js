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
            'click input[type="submit"]': 'searchSubmit',
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
            this.$submitBtn = $('input[type="submit"]');
            this.$overlay = $('.overlay');
            this.$results = $('.results');

            this.titles = app.collection.pluck('title');
        },


        /*
         * Show search form 
         */
        searchShow: function () {
            // show overlay, search form and focus into search input
            this.$overlay.removeClass('hide');
            this.$search.removeClass('hide');
            this.$searchInput.focus();
        },


        /*
         * Autocomplete search 
         */
        searchActive: function() {

            var titles = this.titles;

            this.$searchInput.autocomplete({
                source: titles,
                select: function(event, ui)
                {
                    var link = ui.item.label.replace(/\s+/g, '-').toLowerCase();
                    location.href = './#info/'+link;
                }
            });

        },


        /*
         * Submit search form 
         */
        searchSubmit: function () {
            console.log('searchSubmit');
        },


        /*
         * Cancel search form 
         */
        searchCancel: function () {
            // hide form and overlay
            this.$search.addClass('hide');
            this.$overlay.addClass('hide');

            // reset search value and blur input
            this.$searchInput.val('');
            this.$searchInput.blur();

            // clear search results
            this.$results.html('');
        }

    });

})();
