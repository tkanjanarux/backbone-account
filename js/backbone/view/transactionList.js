/* global Backbone _ $ app */
(function (window) {
    var TransactionList = Backbone.View.extend({
        el: '#transaction-list',
        
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.addAll);
            this.listenTo(this.collection, 'add', this.addOne);
        },
        
        addOne: function (transaction) {
           var view = new app.TransactionItem({model: transaction});
           this.$el.append(view.render().el);
        },
        
        addAll: function () {
            this.$el.html('');
            this.collection.each(this.addOne, this);
        }
    });
    
    window.app = window.app || {};
    window.app.TransactionList = TransactionList;
})(window);