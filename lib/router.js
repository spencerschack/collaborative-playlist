Router.route('rooms', {
  path: '/',
  data: function() {
    return Rooms.find();
  }
});

Router.route('room', {
  path: '/:_id',
  data: function() {
    var room = Rooms.findOne(this.params._id);
    if(room) {
      Session.set('currentRoom', room);
    }
    return room;
  }
})
