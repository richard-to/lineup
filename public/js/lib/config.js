/**
 * Asset paths
 */
define([], function(){
    requirejs.config({
        baseUrl: '/js/',
        shim: {
            'jquery': {
                exports: '$'
            },
            'underscore':{
                exports: '_'    
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'jquery.iframe-transport': {
                deps: ['jquery']
            },
            'jquery.ui.widget': {
                deps: ['jquery']
            },            
            'jquery.fileupload': {
                deps: ['jquery.iframe-transport', 'jquery.ui.widget', 'jquery']                
            }          
        },             
        paths: {
            'jquery':[
                '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
                'vendor/jquery'
            ],         
            'underscore': 'vendor/underscore',             
            'backbone': 'vendor/backbone',
            'jquery.fileupload': 'vendor/jquery.fileupload',
            'jquery.iframe-transport': 'vendor/jquery.iframe-transport',
            'jquery.ui.widget': 'vendor/jquery.ui.widget'
        }         
    });
});