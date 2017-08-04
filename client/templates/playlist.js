Template.playlist.helpers({
  songs: function() {
    var room = Session.get('currentRoom');
    return room ? Songs.find({room: room._id}, {sort: {position: 1}}) : [];
  }
});

Template.playlist.events({
  'click button': function() {
    if(player) {
      player.play();
    }
  }
});
