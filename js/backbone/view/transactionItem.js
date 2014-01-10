/* global Backbone _ $ app */
(function (window) {
    var TransactionItem = Backbone.View.extend({
        tagName: 'tr',
        
        template: _.template($('#transaction-template').html()),
        
        editTemplate: _.template($('#transaction-edit-template').html()),
        
        events: {
            'click .js-delete': 'deleteItem',
            'click .js-edit': 'editItem',
            'click .js-save': 'saveItem',
            'click .js-cancel': 'render'
        },
        
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'sync change', this.render);
        },
        
        editItem: function () {
            this.$el.html(this.editTemplate(this.model.toJSON()));
        },
        
        deleteItem: function () {
            var del = confirm('Are you sure to delete transaction ' + this.model.toJSON().id + '?');
            if (del) {
                this.model.destroy();
            }
        },
        
        _getAttributes: function () {
            var data = {};
            this.$('[name]').each(function (i, el) {
                var $el = $(el);
                data[$el.attr('name')] = $(el).val();
            });
            return data;
        },
        
        saveItem: function () {
            this.model.save(this._getAttributes());
        },
        
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    window.app = window.app || {};
    window.app.TransactionItem = TransactionItem;
})(window);