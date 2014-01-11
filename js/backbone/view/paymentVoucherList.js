/* global Backbone _ $ app */
(function (window) {
    var PaymentVoucherList = Backbone.View.extend({
        className: 'col-md-12',
        
        template: _.template($('#payment-voucher-manager-template').html()),
        
        addOne: function (paymentVoucher) {
            var view = new app.PaymentVoucherItem({model: paymentVoucher});
            this.childrenView.push(view);
            this.$list.append(view.render().el);
        },
        
        addAll: function () {
            this.childrenView.length = 0;
            this.$list.html('');
            this.collection.each(this.addOne, this);
        },
        
        render: function () {
            this.$el.html(this.template());
            this.$list = this.$('#payment-voucher-list');
            this.addAll();
            return this;
        },
        
        close: function () {
            _.each(this.childrenView, function (view) {
                view.remove();
            });
        },
        
        childrenView: []
        
    });
    
    window.app = window.app || {};
    window.app.PaymentVoucherList = PaymentVoucherList;
})(window);