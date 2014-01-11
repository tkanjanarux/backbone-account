/* global Backbone _ $ app */
(function (window) {
    var TransactionList = Backbone.View.extend({
        className: 'col-md-12',
        //el: '#transaction-list',
        template: _.template($('#transaction-manager-template').html()),
        
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.addAll);
        },
        
        addOne: function (transaction) {
            var view = new app.TransactionItem({model: transaction});
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
            this.$list = this.$('#transaction-list');
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
    window.app.TransactionList = TransactionList;
})(window);