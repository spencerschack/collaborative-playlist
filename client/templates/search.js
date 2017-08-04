Template.search.helpers({
  query: function() {
    return Session.get('query');
  }
});

Template.search.events({
  'input input': _.debounce(function(event) {
    var query = event.target.value;
    Session.set('query', query);
  }, 300)
});
