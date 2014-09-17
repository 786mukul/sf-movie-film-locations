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
            'click #cancelBtn': 'searchCancel'
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
        }

    });

})();
