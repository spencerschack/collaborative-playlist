Template.rooms.events({
  'click button': function(event, view) {
    var name = view.$('input').val();
    if(name) {
      var id = Rooms.insert({
        name: name,
        currentSong: null,
        playing: false
      });
      Router.go('room', {_id: id});
    }
  }
});
