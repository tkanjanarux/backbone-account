/* global app */
$(function() {
   var transactions = new app.Transactions();
   var transactionList = new app.TransactionList({collection: transactions});
   transactions.fetch({reset: true});
   window.transactions = transactions;
});