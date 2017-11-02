/* global define */
define([ "test-app", "layout/page", "layout/panel", "QUnit"
], function( testApp, Page, Panel, QUnit ){
    "use strict";
    QUnit.module( "Page test", {
        beforeEach: function() {
            testApp.create();
            $( 'body' ).append( this.$container = $( '<div/>' ).css( 'display', 'none' ) );
        },
        afterEach: function() {
            testApp.destroy();
        }
    } );

    function _check( assert, page, sidePanels ) {
        assert.ok( page.$( '#center' ).length == 1, 'Center panel found.' );
        _.each( sidePanels, function( panelVisible, panelId ) {
            assert.ok( page.$( '#' + panelId ).css( 'display' ) == panelVisible, ( panelVisible ? '' : 'No' ) + ' ' + panelId + ' panel found.' );
        });
    }

    QUnit.test( "test center/right", function(assert) {
        this.$container.empty();
        var page = new Page.default.View({
            Right   : Backbone.View.extend({
                initialize: function() {
                    this.setElement( $('<div/>') );
                    this.model = new Backbone.Model({});
                }
            })
        }).render();
        _check( assert, page, { left: 'none', right: 'block' } );
    });
    QUnit.test( "test center", function(assert) {
        this.$container.empty();
        var page = new Page.default.View({}).render();
        _check( assert, page, { left: 'none', right: 'none' } );
    });
    QUnit.test( "test left/center", function(assert) {
        this.$container.empty();
        var page = new Page.default.View({
            Left   : Backbone.View.extend({
                initialize: function() {
                    this.setElement( $('<div/>') );
                    this.model = new Backbone.Model({});
                }
            })
        }).render();
        _check( assert, page, { left: 'block', right: 'none' } );
    });
});