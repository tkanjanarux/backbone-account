/* global Backbone app */
(function (window) {
    var PaymentVoucher = Backbone.Model.extend({});
    
    window.app.PaymentVoucher = PaymentVoucher;
    
    var PaymentVouchers = Backbone.Collection.extend({
       model: app.PaymentVoucher,
       
       localStorage: new Backbone.LocalStorage('PaymentVouchers-bakcbone')
    });
    
    window.app = window.app || {};
    window.app.PaymentVouchers = PaymentVouchers;
})(window)