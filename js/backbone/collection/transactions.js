/* global Backbone app */
(function (window) {
    var Transactions = Backbone.Collection.extend({
       model: app.Transaction,
       
       localStorage: new Backbone.LocalStorage('transactions-bakcbone'),
       
       getByVoucher: function (voucherId) {
           return this.filter(function (transaction) {
               return transaction.get('paymentVoucher') === voucherId;
           });
       }
    });
    
    window.app = window.app || {};
    window.app.Transactions = Transactions;
})(window)