/* global Backbone _ $ app mideoAccount */
(function (window) {
    var PaymentVoucherItem = Backbone.View.extend({
        tagName: 'tr',
        
        template: _.template($('#payment-voucher-template').html()),
        
        render: function () {
            var model = this.model.toJSON();
            model.amount = mideoAccount.getPaymentVoucherAmount(model.voucherId);
            this.$el.html(this.template(model));
            return this;
        }
    });
    
    window.app = window.app || {};
    window.app.PaymentVoucherItem = PaymentVoucherItem;
})(window);