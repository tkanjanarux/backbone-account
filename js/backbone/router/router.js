/* global Backbone mideoAccount */
(function (window) {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'transaction': 'listTransaction',
            'paymentvoucher/add': 'addVoucher',
            'paymentvoucher/list': 'listVoucher'
        },
        
        index: function () {
        },
        
        listTransaction: function () {
            mideoAccount.showTransactionView();
        },
        
        addVoucher: function () {
            mideoAccount.showVoucherView();
        },
        
        listVoucher: function () {
            mideoAccount.showPaymentVoucherView();
        }
    });
    
    window.app = window.app || {};
    window.app.Router = Router;
})(window);