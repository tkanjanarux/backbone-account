/* global app Backbone*/
$(function() {
    function MideoAccount () {
        var router = new app.Router();
        var transactions= this.transactions = new app.Transactions();
        var categories= this._categories = new app.Categories();
        var transactionList = new app.TransactionList({collection: transactions});
        
        var paymentVouchers = this.paymentVouchers = new app.PaymentVouchers();
        var paymentVoucherList = new app.PaymentVoucherList({collection: paymentVouchers});
        
        var addPaymentVoucher = new app.AddPaymentVoucher();
        
        var $container = $('#container');
        var $nav = $('nav');
        
        var currentView;
        
        this.categories =  categories.map(function (cat) {
            return cat.get('name');
        });
        
        this.start = function () {
            Backbone.history.start();
            this.updateActiveNav();
            router.on('all', this.updateActiveNav);
        };
        
        this.updateActiveNav = function () {
            $nav.find('li').removeClass('active');
            var $li = $nav.find('a[href*="' + Backbone.history.fragment + '"]').parent();
            $li.addClass('active');
            $li.parents('li').addClass('active');
        };
        
        this.showTransactionView = function () {
            transactions.fetch({silent:true});
            
            this.showView(transactionList);
        };
        
        this.showVoucherView = function () {
            this.showView(addPaymentVoucher);
        };
        
        this.showPaymentVoucherView = function () {
            transactions.fetch({silent:true});
            paymentVouchers.fetch({silent:true});
            
            this.showView(paymentVoucherList);
        };
        
        this.showView = function (view) {
            if (currentView && typeof currentView.close === 'function') {
                currentView.close();
            }
            
            currentView = view;
            
            currentView.render();
            
            $container.children().remove();
            $container.html(currentView.el);
        };
        
        this.addTransactions = function (paymentTransactions) {
            paymentTransactions.forEach(function (transaction) {
                transactions.create(transaction);
            });
        };
        
        this.addPaymentVoucher = function (data) {
            this.addTransactions(data.transactions);
            paymentVouchers.create({
                pay: data.pay,
                voucherId: data.voucherId
            });
        };
        
        this.getPaymentVoucherAmount = function (voucherId) {
            return transactions.getByVoucher(voucherId).reduce(function (sum, transaction) {
                return sum + +transaction.get('amount');
            }, 0);
        };
    }
    
    window.mideoAccount = new MideoAccount();
    window.mideoAccount.start();
});