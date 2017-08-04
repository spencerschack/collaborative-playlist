Template.result.events({
  click: function() {
    var last = Songs.findOne({}, {sort: {position: -1}});
    var nextPosition = last ? last.position + 1 : 0;
    Songs.insert({
      title: this.title,
      trackId: this.id,
      room: Session.get('currentRoom')._id,
      position: nextPosition
    });
    Session.set('query', '');
  }
});
