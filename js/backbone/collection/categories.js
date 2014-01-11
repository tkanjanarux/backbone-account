/* global Backbone app */
(function (window) {
    var Category = Backbone.Model.extend({});
    
    window.app.Category = Category;
    
    var Categories = Backbone.Collection.extend({
       model: app.Category,
       
       localStorage: new Backbone.LocalStorage('categories-bakcbone'),
       
       initialize: function () {
           this.fetch();
       }
    });
    
    window.app = window.app || {};
    window.app.Categories = Categories;
})(window)