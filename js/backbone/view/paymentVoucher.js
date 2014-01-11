/* global Backbone _ mideoAccount */
(function (window) {
    var AddPaymentVoucher = Backbone.View.extend({
        className: 'col-md-12',
        
        events: {
            'click #add-transaction': 'addTransactionView',
            'click #add-transaction-done': 'addTransactionDone',
            'click': function (a,b,c) {
                console.log();
            }
        },
        
        template: _.template($('#add-payment-voucher-template').html()),
        
        transactionTemplate: _.template($('#payment-transaction-template').html()),
        
        render: function () {
            this.$el.html(this.template());
            this.delegateEvents();
            this.$transactionInput = this.$('#transaction-input');
            this.$paymentVoucherForm = this.$('#payment-voucher-form');
        },
        
        addTransactionView: function () {
            this.$transactionInput.append(this.transactionTemplate());
        },
        
        addTransactionDone: function () {
            var data = this._buildPaymentVoucherData();
            mideoAccount.addPaymentVoucher(data);
            this.$transactionInput.html('');
        },
        
        _getInputArray: function (name) {
            var array = [];
            this.$paymentVoucherForm.find('[name*=' + name + ']').each(function (i, el) {
                array.push($(el).val());
            });
            return array;
        },
        
        _buildPaymentVoucherData: function () {
            var data = {};
            
            var transactions = data.transactions = [];
            data.pay = this.$paymentVoucherForm.find('#pay').val();
            data.voucherId = this.$paymentVoucherForm.find('#voucher-id').val();
            
            var descriptions = this._getInputArray('description');
            var categorys = this._getInputArray('category');
            var amounts = this._getInputArray('amount');
            
            var i, transaction, l = descriptions.length;
            
            for (i = 0; i < l; i++) {
                transaction = {};
                transaction.description = descriptions[i];
                transaction.category = categorys[i];
                transaction.amount = amounts[i];
                transaction.paymentVoucher = data.voucherId;
                
                transactions.push(transaction);
            }
            
            return data;
        }
    });
    
    window.app = window.app || {};
    window.app.AddPaymentVoucher = AddPaymentVoucher;
})(window);