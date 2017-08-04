Session.setDefault('results', []);

Meteor.startup(function() {
  Tracker.autorun(function() {
    var query = Session.get('query');
    if(query) {
      SC.get('/tracks', {q: query}).then(function(tracks) {
        Session.set('results', tracks);
      });
    } else {
      Session.set('results', []);
    }
  });
}); 

Template.results.helpers({
  results: function() {
    return Session.get('results');
  },
  query: function() {
    return Session.get('query');
  }
});
