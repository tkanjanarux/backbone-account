/* global Backbone app */
(function (window) {
    var Transactions = Backbone.Collection.extend({
       model: app.Transaction,
       
       localStorage: new Backbone.LocalStorage('transactions-bakcbone')
    });
    
    window.app = window.app || {};
    window.app.Transactions = Transactions;
})(window)